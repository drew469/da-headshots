#!/usr/bin/env python3
"""Voiceover -> no-dead-air WAV + word timings + caption cues (timing.js).

Usage:
  python3 vo_pipeline.py vo_raw.mp3 script_spoken.txt [--fmt fmt.json] [--gap 0.2]

  script_spoken.txt : the exact words the voice reads (numbers spelled the way they're spoken).
  subs.json         : optional {"fairleigh": "fairly"} sound-alikes for words the aligner does not know
  fmt.json          : optional {"one hundred thousand": "100,000", "six percent": "6%"} display swaps for captions.

Writes (in cwd): vo.wav (every pause cut to <= --gap s), sil.txt, words.json, cues.json, timing.js
  window.CUES = [{a,b,text}]  one cue per spoken phrase (speech segment)
  window.WORDS = [{w,a,b}]    per-word estimated times (use WT('word', after) in the scene)
"""
import argparse, json, re, subprocess, wave
import numpy as np

ap = argparse.ArgumentParser()
ap.add_argument('vo'); ap.add_argument('script')
ap.add_argument('--fmt'); ap.add_argument('--subs'); ap.add_argument('--gap', type=float, default=0.2); ap.add_argument('--tempo', type=float, default=1.0)
ap.add_argument('--db', default='-35dB'); ap.add_argument('--min', type=float, default=0.12)
a = ap.parse_args()
SR = 48000

def silences(path):
    out = subprocess.run(['ffmpeg', '-i', path, '-af', f'silencedetect=n={a.db}:d={a.min}', '-f', 'null', '-'],
                         capture_output=True, text=True).stderr
    st = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', out)]
    en = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', out)]
    return list(zip(st, en))

if a.tempo != 1.0:   # speed the read up without changing pitch
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', a.vo, '-af', f'atempo={a.tempo}', '_tempo.wav'], check=True); a.vo = '_tempo.wav'
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
# 3) forced alignment (pocketsphinx, bundled English model: pip install pocketsphinx)
from pocketsphinx import Decoder
W = open(a.script).read().split()
pcm = subprocess.run(['ffmpeg', '-v', 'error', '-i', 'vo.wav', '-ac', '1', '-ar', '16000', '-f', 's16le', '-'],
                     capture_output=True, check=True).stdout
dec = Decoder(samprate=16000, bestpath=False, loglevel='ERROR')
SUBS = json.load(open(a.subs)) if a.subs else {}
SUBS.setdefault('umbc', 'u m b c')
toks, own = [], []
for i, w in enumerate(W):
    for p in re.sub(r"[^a-z' -]", '', w.lower().replace('-', ' ')).split():
        p = p.strip("'")
        if not p: continue
        parts = [p] if dec.lookup_word(p) is not None else [q for q in SUBS.get(p, '').split() if dec.lookup_word(q) is not None]
        if not parts:   # out-of-vocabulary: spell it with letters
            parts = [ch for ch in p if dec.lookup_word(ch) is not None] or ['the']
            print('OOV ->', p, parts)
        for q in parts: toks.append(q); own.append(i)
dec.set_align_text(' '.join(toks))
dec.start_utt(); dec.process_raw(pcm, full_utt=True); dec.end_utt()
dec.set_alignment(); dec.start_utt(); dec.process_raw(pcm, full_utt=True); dec.end_utt()
al = [(x.start / 100, (x.start + x.duration) / 100) for x in dec.get_alignment() if x.name not in ('<sil>', '<s>', '</s>', '(NULL)')]
assert len(al) == len(toks), (len(al), len(toks))
span = {}
for (p, q), i in zip(al, own):
    s0, e0 = span.get(i, (p, q)); span[i] = (min(s0, p), max(e0, q))
words = [dict(w=W[i], a=round(span[i][0], 3), b=round(span[i][1], 3)) for i in range(len(W))]
# 4) caption cues. Display swaps (fmt) are matched on the whole script first so a cue never splits "one hundred | thousand".
fmt = json.load(open(a.fmt)) if a.fmt else {}
starts, pos = [], 0
full = ' '.join(W)
for w in W: starts.append(pos); pos += len(w) + 1
glue = set()          # word i is glued to word i+1
for k2 in sorted(fmt, key=len, reverse=True):
    for mt in re.finditer(r'(?<![\w-])' + re.escape(k2) + r'(?![\w-])', full):
        ws = [i for i, s0 in enumerate(starts) if mt.start() <= s0 < mt.end()]
        glue.update(ws[:-1])
hard = [i for i, w in enumerate(W) if re.search(r'[.?!:]$', w)]
blocks, s0 = [], 0
for h in hard + ([len(W) - 1] if not hard or hard[-1] != len(W) - 1 else []):
    blocks.append(list(range(s0, h + 1))); s0 = h + 1
def split(b):
    if len(b) <= 8: return [b]
    best = None
    for k in range(3, len(b) - 2):          # cut after b[k-1]
        if b[k - 1] in glue: continue
        score = abs(k - len(b) / 2) - (3 if W[b[k - 1]].endswith(',') else 0)
        if best is None or score < best[0]: best = (score, k)
    if best is None: return [b]
    return split(b[:best[1]]) + split(b[best[1]:])
cues = []
for b in blocks:
    for c in split(b):
        text = ' '.join(W[j] for j in c)
        for k2, v in sorted(fmt.items(), key=lambda kv: -len(kv[0])):
            text = re.sub(r'(?<![\w-])' + re.escape(k2) + r'(?![\w-])', v, text)
        cues.append(dict(a=words[c[0]]['a'], b=words[c[-1]]['b'], text=text))
json.dump(words, open('words.json', 'w')); json.dump(cues, open('cues.json', 'w'))
open('timing.js', 'w').write('window.CUES=' + json.dumps(cues) + ';\nwindow.WORDS=' + json.dumps(words) + ';\n')
for c in cues: print(f"{c['a']:7.2f}-{c['b']:7.2f}  {c['text']}")
print(f'\nvo.wav {DUR:.2f}s (raw {end_t:.2f}s)  cues {len(cues)}  longest pause {maxgap:.2f}s')
