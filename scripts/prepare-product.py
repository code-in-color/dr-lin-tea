"""Extract the supplied can with a hand-traced silhouette (requires Pillow)."""
from pathlib import Path
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parent.parent
image = Image.open(root / 'reference.png').convert('RGBA')
mask = Image.new('L', image.size)
points = []

def curve(a, b, c, d):
    for step in range(41):
        t = step / 40
        points.append(tuple((1-t)**3*a[i] + 3*(1-t)**2*t*b[i]
                            + 3*(1-t)*t*t*c[i] + t**3*d[i] for i in (0, 1)))

curve((235, 147), (235, 110), (791, 108), (791, 147))
curve((791, 147), (798, 191), (837, 243), (838, 296))
curve((838, 296), (838, 650), (838, 1100), (837, 1310))
curve((837, 1310), (832, 1351), (791, 1362), (779, 1385))
curve((779, 1385), (692, 1417), (320, 1417), (244, 1385))
curve((244, 1385), (228, 1361), (187, 1345), (186, 1310))
curve((186, 1310), (186, 1000), (186, 500), (186, 296))
curve((186, 296), (188, 248), (230, 202), (235, 167))
ImageDraw.Draw(mask).polygon(points, fill=255)
image.putalpha(mask)
image = image.crop((180, 110, 845, 1420))
image.save(root / 'assets/ruby-fizz.png', optimize=True)
