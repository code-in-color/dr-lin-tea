"""Build transparent ingredient assets. Requires rembg[cpu] and Pillow.

Run from the project root. Set U2NET_HOME to choose the model cache directory.
Original photographs are retained alongside the generated WebP cutouts.
"""
from pathlib import Path

import numpy as np
from PIL import Image
from rembg import new_session, remove


ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / 'static/assets'


def save_cutout(image, name):
    alpha = image.getchannel('A')
    # Discard near-invisible segmentation noise before trimming.
    alpha = alpha.point(lambda value: 0 if value < 12 else value)
    image.putalpha(alpha)
    bounds = alpha.getbbox()
    if bounds is None:
        raise ValueError(f'Empty cutout: {name}')
    image = image.crop(bounds)
    scale = min(900 / max(image.size), 2)
    image = image.resize((round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS)
    canvas = Image.new('RGBA', (960, 960))
    canvas.paste(image, ((960 - image.width) // 2, (960 - image.height) // 2))
    canvas.save(ASSETS / f'{name}-cutout.webp', lossless=True, method=6)
    print(f'Created {name}-cutout.webp')


session = new_session('u2netp')
for name in ('green-tea', 'blue-lotus'):
    image = Image.open(ASSETS / f'{name}.jpg').convert('RGBA')
    cutout = remove(image, session=session)
    if name == 'green-tea':
        # Remove white paper showing between the fine leaves.
        rgb = np.asarray(image, dtype=np.float32)[:, :, :3]
        paper_mask = np.clip((210 - rgb.min(axis=2)) / 65, 0, 1)
        alpha = np.asarray(cutout.getchannel('A')) * paper_mask
        cutout.putalpha(Image.fromarray(alpha.astype('uint8')))
    if name == 'blue-lotus':
        # Exclude green stems and the bud behind the blue petals.
        rgb = np.asarray(image, dtype=np.float32)[:, :, :3]
        flower_mask = np.clip((np.maximum(rgb[:, :, 0], rgb[:, :, 2]) - rgb[:, :, 1] + 3) / 12, 0, 1)
        alpha = np.asarray(cutout.getchannel('A')) * flower_mask
        cutout.putalpha(Image.fromarray(alpha.astype('uint8')))
    save_cutout(cutout, name)

# Preserve the supplied whole dried hibiscus and bowl, removing the white backdrop.
image = Image.open(ROOT / 'HRB-HIBS.jpg').convert('RGBA')
save_cutout(remove(image, session=session), 'hibiscus-whole')

# A stream is an environmental photograph rather than an isolated object.
# Keep its water and rocks visible; the existing card frame clips the scene.
image = Image.open(ASSETS / 'flowing-stream.jpg').convert('RGB')
# Focus on the flowing water rather than the distant mountains and sky.
image = image.crop((0, round(image.height * 0.50), image.width, image.height))
image.save(ASSETS / 'flowing-stream.webp', quality=90, method=6)

# The golden crystals are distinct from the neutral paper and grey shadows.
# A chroma mask retains individual grains and the gaps between them.
image = Image.open(ASSETS / 'sugar-crystals.jpg').convert('RGBA')
rgb = np.asarray(image, dtype=np.float32)
warmth = np.minimum(rgb[:, :, 0], rgb[:, :, 1]) - rgb[:, :, 2]
alpha = np.clip((warmth - 18) / 22, 0, 1) * 255
image.putalpha(Image.fromarray(alpha.astype('uint8')))
save_cutout(image, 'sugar-crystals')
