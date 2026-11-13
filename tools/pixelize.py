"""Turn a diffusion 'pixel art' render into real pixel art.
usage: pixelize.py IN OUT_PNG MAX_COLORS
1) key out flat magenta bg  2) find the drawn pixel grid (cell size + phase) from color-edge positions
3) sample each cell by majority color  4) quantize palette  5) crop to content, transparent PNG
"""
import sys, numpy as np
from PIL import Image
src, dst, ncol = sys.argv[1], sys.argv[2], int(sys.argv[3])
rgb = np.asarray(Image.open(src).convert('RGB')).astype(np.int32)
r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
bg = (r > 170) & (b > 170) & (g < 110) & (np.abs(r - b) < 90)          # magenta-ish
fg = ~bg

# palette on foreground pixels (full res), to make edges crisp before grid search
fg_pixels = Image.fromarray(rgb[fg].reshape(-1, 1, 3).astype(np.uint8))
pal_img = fg_pixels.quantize(colors=ncol + 4, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
full = Image.fromarray(rgb.astype(np.uint8)).quantize(palette=pal_img, dither=Image.Dither.NONE)
idx = np.asarray(full).astype(np.int32)
idx[bg] = -1

def phase_score(pos, c):
    ang = 2 * np.pi * pos / c
    z = np.exp(1j * ang).mean()
    return abs(z), (np.angle(z) % (2 * np.pi)) / (2 * np.pi) * c

def grid_axis(a):
    ch = np.nonzero(a[:, 1:] != a[:, :-1])[1].astype(float) + 1.0     # x positions of changes
    best = (0, None, None)
    for c in np.arange(6, 40, 0.125):
        s, ph = phase_score(ch, c)
        s *= c ** 0.15                                                 # mild bias against harmonics (c/2)
        if s > best[0]: best = (s, c, ph)
    return best[1], best[2]

cx, px = grid_axis(idx)
cy, py = grid_axis(idx.T)
c = (cx + cy) / 2
print(f'cell x={cx:.2f} y={cy:.2f} -> {c:.2f}')

H, W = idx.shape
xs = np.arange(px % c, W, c); ys = np.arange(py % c, H, c)
gw, gh = len(xs) - 1, len(ys) - 1
out = np.full((gh, gw), -1, np.int32)
for j in range(gh):
    for i in range(gw):
        x0, x1 = xs[i] + c * 0.25, xs[i] + c * 0.75
        y0, y1 = ys[j] + c * 0.25, ys[j] + c * 0.75
        block = idx[int(y0):int(np.ceil(y1)), int(x0):int(np.ceil(x1))].ravel()
        vals, cnt = np.unique(block, return_counts=True)
        out[j, i] = vals[np.argmax(cnt)]

pal = np.array(full.getpalette()[:3 * 256]).reshape(-1, 3)
small = np.zeros((gh, gw, 4), np.uint8)
m = out >= 0
small[m, :3] = pal[out[m]]; small[m, 3] = 255
im = Image.fromarray(small, 'RGBA')
# final palette squeeze to ncol
q = im.convert('RGB').quantize(colors=ncol, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE).convert('RGB')
fin = np.dstack([np.asarray(q), small[..., 3]])
im = Image.fromarray(fin, 'RGBA')
im = im.crop(im.getbbox())
im.save(dst)
print(dst, im.size, 'colors', len(set(map(tuple, np.asarray(im)[np.asarray(im)[..., 3] > 0][:, :3].tolist()))))
