#!/usr/bin/env python3
"""Render a what-happens reel scene (HTML exposing window.T, window.render(t), window.SFX) to MP4.

Usage:
  python3 render.py scene.html --vo vo.mp3 --out reel.mp4      # full render, 30 fps, VO + SFX baked in
  python3 render.py scene.html --stills 0.5,3,6,9 --out qa.png  # contact sheet of chosen times (fast QA)
  options: --fps 30  --vo voice.mp3  --music bed.mp3 --music-db -20  --no-sfx  --sfx-gain 1.0

The skill's assets/ folder is symlinked next to the scene as ./assets so the scene can
<link href="assets/base.css"> and <script src="assets/lib.js">.
Final audio is loudness-normalized to ~-14 LUFS (Instagram level).
"""
import argparse, json, os, subprocess, sys, tempfile, wave
from pathlib import Path

import numpy as np

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import sfx  # noqa: E402

ASSETS = HERE.parent / "assets"


def ensure_assets(scene: Path):
    link = scene.parent / "assets"
    if not link.exists() and ASSETS.exists():
        link.symlink_to(ASSETS, target_is_directory=True)


def open_page(pw, scene):
    b = pw.chromium.launch()
    p = b.new_page(viewport={"width": 1080, "height": 1920}, device_scale_factor=1)
    errs = []
    p.on("pageerror", lambda e: errs.append(str(e)))
    p.on("console", lambda m: m.type == "error" and errs.append(m.text))
    p.goto(scene.resolve().as_uri())
    p.wait_for_function("window.render && window.T && document.fonts.status === 'loaded'", timeout=20000)
    p.evaluate("document.fonts.ready")
    if errs:
        print("PAGE ERRORS:\n" + "\n".join(errs), file=sys.stderr)
    return b, p, errs


def write_wav(path, x):
    x = np.clip(x, -1, 1)
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sfx.SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())


def read_audio(path, dur):
    """decode any audio file to mono float at SR via ffmpeg"""
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(path), "-ac", "1", "-ar", str(sfx.SR), "-f", "f32le", "-"],
                         capture_output=True, check=True).stdout
    y = np.frombuffer(raw, dtype=np.float32).copy()
    n = int(sfx.SR * dur)
    return np.pad(y, (0, max(0, n - len(y))))[:n]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("scene")
    ap.add_argument("--out", required=True)
    ap.add_argument("--fps", type=int, default=30)
    ap.add_argument("--stills")
    ap.add_argument("--vo")
    ap.add_argument("--music")
    ap.add_argument("--music-db", type=float, default=-20)
    ap.add_argument("--no-sfx", action="store_true")
    ap.add_argument("--sfx-gain", type=float, default=1.0)
    a = ap.parse_args()

    scene = Path(a.scene)
    ensure_assets(scene)
    from playwright.sync_api import sync_playwright

    with sync_playwright() as pw:
        b, p, errs = open_page(pw, scene)
        T = p.evaluate("window.T")
        end = float(T["end"])

        if a.stills:
            times = [float(x) for x in a.stills.split(",")]
            tmp = Path(tempfile.mkdtemp())
            files = []
            for i, t in enumerate(times):
                p.evaluate(f"window.render({t})")
                f = tmp / f"s{i:02d}.png"
                p.locator("#stage").screenshot(path=str(f))
                files.append(f)
            b.close()
            cols = min(len(files), 4)
            inputs = sum([["-i", str(f)] for f in files], [])
            fc = ";".join(f"[{i}:v]scale=360:-1,drawtext=text='{times[i]:.2f}s':x=10:y=10:fontsize=28:fontcolor=white:box=1:boxcolor=black@0.6[v{i}]" for i in range(len(files)))
            pad = "".join(f"[v{i}]" for i in range(len(files)))
            fc += f";{pad}xstack=inputs={len(files)}:layout=" + "|".join(f"{(i % cols) * 360}_{(i // cols) * 640}" for i in range(len(files))) + ":fill=black[o]" if len(files) > 1 else ";[v0]null[o]"
            subprocess.run(["ffmpeg", "-v", "error", "-y", *inputs, "-filter_complex", fc, "-map", "[o]", a.out], check=True)
            print(f"stills -> {a.out}")
            return

        n = int(round(end * a.fps))
        tmp = Path(tempfile.mkdtemp())
        vid = tmp / "v.mp4"
        enc = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "image2pipe", "-framerate", str(a.fps), "-c:v", "mjpeg", "-i", "-",
                                "-c:v", "libx264", "-preset", "veryfast", "-crf", "18", "-pix_fmt", "yuv420p", str(vid)], stdin=subprocess.PIPE)
        stage = p.locator("#stage")
        for i in range(n):
            p.evaluate(f"window.render({i / a.fps})")
            enc.stdin.write(stage.screenshot(type="jpeg", quality=93))
            if i % 300 == 0:
                print(f"frame {i}/{n}", flush=True)
        enc.stdin.close(); enc.wait()
        cues = [] if a.no_sfx else (p.evaluate("window.SFX || []"))
        b.close()

    dur = n / a.fps
    audio = sfx.mix(cues, dur) * a.sfx_gain if cues else np.zeros(int(sfx.SR * dur), np.float32)
    if a.vo:
        vo = read_audio(a.vo, dur)
        audio = vo * 0.95 + audio * 0.35   # duck SFX under the voice
    if a.music:
        audio = audio + read_audio(a.music, dur) * (10 ** (a.music_db / 20))
    pk = np.abs(audio).max()
    if pk > 0.95:
        audio = audio / pk * 0.89
    wav = tmp / "a.wav"
    write_wav(wav, audio)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(vid), "-i", str(wav), "-c:v", "copy", "-af", "loudnorm=I=-14:TP=-1.5:LRA=11", "-ar", "48000", "-c:a", "aac", "-b:a", "192k",
                    "-shortest", "-movflags", "+faststart", a.out], check=True)
    print(f"done -> {a.out}  ({dur:.2f}s, {n} frames, {len(cues)} sfx cues)")


if __name__ == "__main__":
    main()
