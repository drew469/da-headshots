"""Synthesized SFX palette for what-happens reels (the sandbox can't download sample libraries).

mix(cues, duration) -> float32 mono array at SR. cues: [{"t": sec, "type": name, "gain": 0..1, "dur": sec?}]
Types: whoosh, whip, pop, ding, sparkle, zap, type, thump, riser, bubble, squish, click, boing, swell
"""
import numpy as np

SR = 48000
_rng = np.random.default_rng(7)


def _t(d):
    return np.arange(int(SR * d)) / SR


def _env(n, a=0.005, r=0.2, shape=4.0):
    t = np.arange(n) / SR
    att = np.clip(t / max(a, 1e-4), 0, 1)
    dec = np.exp(-shape * np.maximum(t - a, 0) / max(r, 1e-4))
    return att * dec


def _bandnoise(n, lo, hi):
    x = _rng.standard_normal(n)
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(n, 1 / SR)
    X[(f < lo) | (f > hi)] = 0
    y = np.fft.irfft(X, n)
    return y / (np.abs(y).max() + 1e-9)


def _sweepnoise(d, f0, f1, q=0.35):
    """noise through a moving band-pass (done in short STFT blocks)."""
    n = int(SR * d)
    out = np.zeros(n)
    blk = 1024
    x = _rng.standard_normal(n + blk)
    win = np.hanning(blk)
    for s in range(0, n, blk // 2):
        p = s / max(n, 1)
        fc = f0 * (f1 / f0) ** p
        seg = x[s:s + blk] * win
        X = np.fft.rfft(seg)
        f = np.fft.rfftfreq(blk, 1 / SR)
        X *= np.exp(-((np.log(f + 1) - np.log(fc)) ** 2) / (2 * q ** 2))
        y = np.fft.irfft(X, blk)
        e = min(n, s + blk) - s
        out[s:s + e] += y[:e]
    return out / (np.abs(out).max() + 1e-9)


def whoosh(d=0.45):
    y = _sweepnoise(d, 300, 3500)
    t = _t(d)
    env = np.sin(np.pi * np.clip(t / d, 0, 1)) ** 1.6
    return y * env * 0.7


def whip(d=0.28):   # faster, brighter — for zoom cuts
    y = _sweepnoise(d, 900, 7000, 0.3)
    t = _t(d)
    env = (t / d) ** 2 * np.exp(-((t / d - 0.8) ** 2) / 0.02) + (t / d) ** 3
    env = env / env.max()
    return y * env * 0.8


def pop(d=0.12, f=520):
    t = _t(d)
    fr = f * (1 + 1.6 * np.exp(-t * 60))
    return np.sin(2 * np.pi * np.cumsum(fr) / SR) * _env(len(t), 0.002, 0.06) * 0.9


def click(d=0.03):
    t = _t(d)
    return (np.sin(2 * np.pi * 2400 * t) * 0.5 + _bandnoise(len(t), 2000, 8000) * 0.5) * _env(len(t), 0.0005, 0.01)


def type_(d=0.025):
    return click(d) * 0.6


def ding(d=1.2, f=1320):
    t = _t(d)
    y = sum(a * np.sin(2 * np.pi * f * m * t) * np.exp(-t * k) for a, m, k in [(1, 1, 3.5), (.5, 2.76, 6), (.25, 5.4, 9), (.3, 1.5, 4.5)])
    return y * _env(len(t), 0.002, d, 1.0) * 0.45


def sparkle(d=0.9):
    out = np.zeros(int(SR * d))
    for i, f in enumerate([2093, 2637, 3136, 3951, 4186, 5274]):
        s = int(SR * i * 0.06)
        tt = _t(d - i * 0.06)
        g = np.sin(2 * np.pi * f * tt) * np.exp(-tt * 9)
        out[s:s + len(g)] += g * (0.35 - i * 0.03)
    return out


def zap(d=0.6):   # electric crackle (power-up aura)
    n = int(SR * d)
    x = _bandnoise(n, 1500, 9000)
    gate = (_rng.random(n // 240 + 1) > 0.55).repeat(240)[:n]
    t = _t(d)
    hum = np.sin(2 * np.pi * 110 * t) * np.sign(np.sin(2 * np.pi * 55 * t)) * 0.25
    return (x * gate * 0.6 + hum) * np.sin(np.pi * t / d) ** 0.5 * 0.7


def thump(d=0.35):
    t = _t(d)
    fr = 140 * np.exp(-t * 9) + 45
    y = np.sin(2 * np.pi * np.cumsum(fr) / SR) * _env(len(t), 0.002, 0.25, 3)
    return y + _bandnoise(len(t), 80, 1200) * _env(len(t), 0.001, 0.03) * 0.4


def riser(d=1.2):
    t = _t(d)
    fr = 220 * (4 ** (t / d))
    tone = np.sin(2 * np.pi * np.cumsum(fr) / SR) * 0.25
    nz = _sweepnoise(d, 400, 6000) * 0.35
    return (tone + nz) * (t / d) ** 2


def bubble(d=0.14):
    t = _t(d)
    fr = 500 + 1400 * (t / d)
    return np.sin(2 * np.pi * np.cumsum(fr) / SR) * _env(len(t), 0.004, 0.08) * 0.6


def squish(d=0.3):
    t = _t(d)
    fr = 260 - 150 * (t / d) + 30 * np.sin(2 * np.pi * 18 * t)
    y = np.sign(np.sin(2 * np.pi * np.cumsum(fr) / SR)) * 0.25 + _bandnoise(len(t), 200, 1800) * 0.3
    return y * np.sin(np.pi * t / d)


def boing(d=0.5):
    t = _t(d)
    fr = 180 + 120 * np.sin(2 * np.pi * 9 * t) * np.exp(-t * 5) + 200 * (t / d)
    return np.sin(2 * np.pi * np.cumsum(fr) / SR) * _env(len(t), 0.003, 0.4, 2.5) * 0.7


def swell(d=1.0):   # soft pad swell for payoff
    t = _t(d)
    y = sum(np.sin(2 * np.pi * f * t) for f in [261.6, 329.6, 392.0, 523.3]) / 4
    return y * np.sin(np.pi * np.clip(t / d, 0, 1)) ** 1.5 * 0.5


BANK = dict(whoosh=whoosh, whip=whip, pop=pop, click=click, type=type_, ding=ding, sparkle=sparkle, zap=zap,
            thump=thump, riser=riser, bubble=bubble, squish=squish, boing=boing, swell=swell)


def mix(cues, duration):
    out = np.zeros(int(SR * (duration + 2)))
    for c in cues:
        fn = BANK[c["type"]]
        y = fn(c["dur"]) if "dur" in c else fn()
        s = int(SR * c["t"])
        if s < 0:
            y, s = y[-s:], 0
        e = min(len(out), s + len(y))
        out[s:e] += y[: e - s] * c.get("gain", 0.6)
    out = out[: int(SR * duration)]
    pk = np.abs(out).max()
    if pk > 0:
        out = out / pk * 0.89   # ~ -1 dBFS
    return out.astype(np.float32)
