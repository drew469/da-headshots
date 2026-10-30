#!/usr/bin/env python3
"""Voiceover -> no-dead-air WAV + word timings + caption cues (timing.js).

Usage:
  python3 vo_pipeline.py vo_raw.mp3 script_spoken.txt [--fmt fmt.json] [--gap 0.2]

  script_spoken.txt : the exact words the voice reads (numbers spelled the way they're spoken).
  fmt.json          : optional {"one hundred thousand": "100,000", "six percent": "6%"} display swaps for captions.

Writes (in cwd): vo.wav (every pause cut to <= --gap s), sil.txt, words.json, cues.json, timing.js
  window.CUES = [{a,b,text}]  one cue per spoken phrase (speech segment)
  window.WORDS = [{w,a,b}]    per-word estimated times (use WT('word', after) in the scene)
"""
import argparse, json, re, subprocess, wave
import numpy as np

ap = argparse.ArgumentParser()
ap.add_argument('vo'); ap.add_argument('script')
ap.add_argument('--fmt'); ap.add_argument('--gap', type=float, default=0.2)
ap.add_argument('--db', default='-35dB'); ap.add_argument('--min', type=float, default=0.12)
a = ap.parse_args()
SR = 48000

def silences(path):
    out = subprocess.run(['ffmpeg', '-i', path, '-af', f'silencedetect=n={a.db}:d={a.min}', '-f', 'null', '-'],
                         capture_output=True, text=True).stderr
    st = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', out)]
    en = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', out)]
    return list(zip(st, en))

raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', a.vo, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'],
                     capture_output=True, check=True).stdout
x = np.frombuffer(raw, np.float32)
# 1) cut every pause down to a.gap (lead-in/out trimmed to 0.05)
keep, cur = [], 0.0
sil = silences(a.vo)
for s, e in sil:
    if s <= 0.01: cur = max(0, e - 0.05); continue
    keep.append((cur, s + a.gap / 2)); cur = max(s + a.gap / 2, e - a.gap / 2)
end_t = len(x) / SR
if sil and sil[-1][1] >= end_t - 0.05: keep.append((cur, min(end_t, sil[-1][0] + 0.05)))
else: keep.append((cur, end_t))
y = np.concatenate([x[int(p * SR):int(q * SR)] for p, q in keep if q > p])
with wave.open('vo.wav', 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((np.clip(y, -1, 1) * 32767).astype(np.int16).tobytes())
DUR = len(y) / SR
# 2) speech segments in the trimmed file
sil2 = silences('vo.wav')
open('sil.txt', 'w').write(' '.join(f'{s:.4f} {e:.4f}' for s, e in sil2))
segs, cur = [], 0.0
for s, e in sil2:
    if s - cur > 0.05: segs.append((cur, s))
    cur = e
if DUR - cur > 0.05: segs.append((cur, DUR))
maxgap = max([e - s for s, e in sil2] + [0])
# 3) DP-align punctuation-bounded word blocks to segments
W = open(a.script).read().split()
cost = [len(re.sub(r'[^A-Za-z0-9]', '', w)) + 1.2 for w in W]
pref = [0]
for c in cost: pref.append(pref[-1] + c)
rate = pref[-1] / sum(q - p for p, q in segs)
brk = [i + 1 for i, w in enumerate(W) if re.search(r'[,.?!:;]$', w)]
if len(W) not in brk: brk.append(len(W))
idx = [0] + brk; INF = float('inf'); m = len(segs)
dp = [[INF] * len(idx) for _ in range(m + 1)]; bk = [[-1] * len(idx) for _ in range(m + 1)]; dp[0][0] = 0
for j in range(1, m + 1):
    d = segs[j - 1][1] - segs[j - 1][0]
    for k in range(1, len(idx)):
        for q in range(k - 1, max(-1, k - 14), -1):
            if dp[j - 1][q] == INF: continue
            est = (pref[idx[k]] - pref[idx[q]]) / rate
            c = dp[j - 1][q] + (d - est) ** 2 / max(d, .3)
            if c < dp[j][k]: dp[j][k], bk[j][k] = c, q
k = len(idx) - 1; blocks = []
for j in range(m, 0, -1):
    q = bk[j][k]; blocks.append((idx[q], idx[k])); k = q
blocks.reverse()
words, cues = [], []
fmt = json.load(open(a.fmt)) if a.fmt else {}
for (p, q), (wa, wb) in zip(segs, blocks):
    tot = pref[wb] - pref[wa]; t = p
    for i in range(wa, wb):
        dt = (q - p) * cost[i] / tot
        words.append(dict(w=W[i], a=round(t, 3), b=round(t + dt, 3))); t += dt
    text = ' '.join(W[wa:wb])
    for k2, v in sorted(fmt.items(), key=lambda kv: -len(kv[0])):
        text = re.sub(re.escape(k2), v, text, flags=re.I)
    cues.append(dict(a=round(p, 3), b=round(q, 3), text=text))
json.dump(words, open('words.json', 'w')); json.dump(cues, open('cues.json', 'w'))
open('timing.js', 'w').write('window.CUES=' + json.dumps(cues) + ';\nwindow.WORDS=' + json.dumps(words) + ';\n')
for c in cues: print(f"{c['a']:7.2f}-{c['b']:7.2f}  {c['text']}")
print(f'\nvo.wav {DUR:.2f}s (raw {end_t:.2f}s)  cues {len(cues)}  longest pause {maxgap:.2f}s')
