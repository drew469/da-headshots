#!/usr/bin/env python3
"""Photo -> full-body 'sticker' cutout (DA style): background removed, white outline, colored offset shadow.

Usage:
  python3 make_sticker.py photo.jpg out.png [--shadow 0CF5F9] [--model isnet-general-use|u2net_human_seg]
         [--outline 12] [--offset 22,14] [--crop x0,y0,x1,y1]

Model tips: isnet-general-use is the default; if a white/light jersey gets eaten (holes in the body),
re-run with --model u2net_human_seg (holes are filled automatically). Always LOOK at the result.
Shadow colors used so far: cyan 0CF5F9 (default), red C8102E for Bucs/red teams, navy for light cards.
Models download once from the rembg GitHub release into ~/.u2net.
"""
import argparse, os, pathlib, urllib.request
import numpy as np
from PIL import Image, ImageFilter
from scipy.ndimage import binary_fill_holes

ap = argparse.ArgumentParser()
ap.add_argument('src'); ap.add_argument('out')
ap.add_argument('--shadow', default='0CF5F9'); ap.add_argument('--model', default='isnet-general-use')
ap.add_argument('--outline', type=int, default=12); ap.add_argument('--offset', default='22,14')
ap.add_argument('--crop')
a = ap.parse_args()

home = pathlib.Path(os.environ.setdefault('U2NET_HOME', str(pathlib.Path.home() / '.u2net')))
home.mkdir(parents=True, exist_ok=True)
mp = home / f'{a.model}.onnx'
if not mp.exists():
    urllib.request.urlretrieve(f'https://github.com/danielgatis/rembg/releases/download/v0.0.0/{a.model}.onnx', mp)
from rembg import remove, new_session

im = Image.open(a.src).convert('RGB')
if a.crop: im = im.crop(tuple(map(int, a.crop.split(','))))
cut = remove(im, session=new_session(a.model))
al = np.array(cut.split()[-1]) > 128
al = binary_fill_holes(al)
# keep the largest blob only (drops stray bits of crowd)
from scipy.ndimage import label
lab, n = label(al)
if n > 1:
    sizes = np.bincount(lab.ravel()); sizes[0] = 0; al = lab == sizes.argmax()
rgba = np.dstack([np.array(im), (al * 255).astype(np.uint8)])
body = Image.fromarray(rgba, 'RGBA')
ys, xs = np.where(al); body = body.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
ow = a.outline; dx, dy = map(int, a.offset.split(','))
pad = ow + max(abs(dx), abs(dy)) + 4
W, H = body.width + 2 * pad, body.height + 2 * pad
mask = Image.new('L', (W, H)); mask.paste(body.split()[-1], (pad, pad))
outline = mask.filter(ImageFilter.MaxFilter(ow * 2 + 1))
col = tuple(int(a.shadow[i:i + 2], 16) for i in (0, 2, 4))
canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))
sh = Image.new('RGBA', (W, H), col + (255,)); canvas.paste(sh, (dx, dy), outline)
wh = Image.new('RGBA', (W, H), (255, 255, 255, 255)); canvas.paste(wh, (0, 0), outline)
canvas.alpha_composite(body, (pad, pad))
canvas.save(a.out)
print(a.out, canvas.size)
