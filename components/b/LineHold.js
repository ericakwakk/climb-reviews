// A hold drawn as an ink outline, with its color printed slightly off-register,
// like a two-color risograph print. Same six silhouettes as version A's holds.

const SHAPES = [
  "M28 64 C20 30 60 10 98 14 C140 18 168 40 158 74 C150 102 108 112 72 106 C44 100 32 86 28 64 Z",
  "M40 30 C70 8 130 12 150 40 C166 64 148 100 110 104 C84 106 72 92 52 90 C24 88 16 50 40 30 Z",
  "M22 78 C30 40 70 22 118 24 C150 26 166 44 160 62 C154 80 120 76 96 90 C70 104 16 108 22 78 Z",
  "M90 10 C122 10 146 34 142 64 C138 96 112 112 86 110 C56 108 36 88 38 60 C40 30 60 10 90 10 Z",
  "M30 50 C34 24 64 18 84 30 C100 16 140 14 154 40 C168 66 140 98 104 100 C70 102 26 86 30 50 Z",
  "M20 60 C20 40 60 30 90 30 C126 30 162 38 162 60 C162 82 126 92 90 92 C56 92 20 80 20 60 Z",
];

export default function LineHold({ shape = 0, color = "var(--zine-pink)", size = 120, rotate = 0, className, style }) {
  const d = SHAPES[shape % SHAPES.length];

  return (
    <svg
      className={className}
      width={size}
      height={(size * 120) / 180}
      viewBox="0 0 180 120"
      aria-hidden="true"
      style={{ transform: `rotate(${rotate}deg)`, overflow: "visible", ...style }}
    >
      {/* Color layer, nudged down-right */}
      <path d={d} fill={color} transform="translate(8 7)" style={{ mixBlendMode: "multiply" }} />
      {/* Ink layer: outline, a little texture line, and the bolt hole */}
      <path d={d} fill="none" stroke="var(--zine-ink)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
      <path d="M60 46 C74 36 96 34 112 40" fill="none" stroke="var(--zine-ink)" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <circle cx="94" cy="62" r="8" fill="var(--zine-paper)" stroke="var(--zine-ink)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
