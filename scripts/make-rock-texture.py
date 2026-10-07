# Generates the rock-wall texture used in version B (public/illustrations/rock-wall.jpg).
# Run: python3 scripts/make-rock-texture.py   (macOS: uses Quick Look + sips to render the SVG)
import os, random, subprocess, tempfile

W, H = 1400, 1400
random.seed(42)

bolts, placed = [], []
while len(bolts) < 70:
    x, y = random.uniform(20, W - 20), random.uniform(20, H - 20)
    if any((x - a) ** 2 + (y - b) ** 2 < 85 ** 2 for a, b in placed):
        continue
    placed.append((x, y))
    r = random.choice([8, 10, 12])
    bolts.append(
        f'<g transform="translate({x:.0f} {y:.0f})"><circle r="{r}" fill="#B3B4B0" stroke="#8C8E8A" stroke-width="1.2"/>'
        f'<circle r="2.2" fill="#3F403E"/></g>'
    )

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
  <defs>
    <!-- Big noise snapped into a few levels (ledges), softened into slopes, plus finer noise, lit from top-left -->
    <filter id="relief" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.0075" numOctaves="3" seed="8" result="big"/>
      <feComponentTransfer in="big" result="stretched"><feFuncA type="linear" slope="2.6" intercept="-0.8"/></feComponentTransfer>
      <feComponentTransfer in="stretched" result="steps"><feFuncA type="discrete" tableValues="0 0.22 0.44 0.66 0.88 1"/></feComponentTransfer>
      <feGaussianBlur in="steps" stdDeviation="3.5" result="ledges"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" seed="2" result="fine"/>
      <feComposite in="ledges" in2="fine" operator="arithmetic" k2="0.85" k3="0.25" k4="-0.05" result="height"/>
      <feDiffuseLighting in="height" surfaceScale="20" diffuseConstant="1.15" lighting-color="#ffffff">
        <feDistantLight azimuth="235" elevation="46"/>
      </feDiffuseLighting>
      <feComponentTransfer><feFuncR type="linear" slope="0.75" intercept="0.25"/><feFuncG type="linear" slope="0.75" intercept="0.25"/><feFuncB type="linear" slope="0.75" intercept="0.25"/></feComponentTransfer>
      <feBlend in2="SourceGraphic" mode="multiply"/>
    </filter>
    <filter id="grit" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="11"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.15  0 0 0 0 0.15  0 0 0 0 0.15  4 0 0 0 -2.5"/>
    </filter>
    <filter id="chalk" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="51"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  3 0 0 0 -1.9"/>
    </filter>
  </defs>
  <rect width="{W}" height="{H}" fill="#C4C5C1" filter="url(#relief)"/>
  <rect width="{W}" height="{H}" filter="url(#grit)"/>
  <rect width="{W}" height="{H}" filter="url(#chalk)" opacity="0.45"/>
</svg>'''

out = os.path.join(os.path.dirname(__file__), "..", "public", "illustrations", "rock-wall.jpg")
with tempfile.TemporaryDirectory() as tmp:
    src = os.path.join(tmp, "rock.svg")
    open(src, "w").write(svg)
    subprocess.run(["qlmanage", "-t", "-s", str(W), "-o", tmp, src], check=True, capture_output=True)
    subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "62", os.path.join(tmp, "rock.svg.png"), "--out", out], check=True, capture_output=True)
print("wrote", os.path.abspath(out))
