// A flat climbing hold: colored blob, ink outline, white bolt hole.
// shape: 0–5 picks one of six hold silhouettes (same ones as the Paper swatches).

export const HOLD_SHAPES = [
  { d: "M28 64 C20 30 60 10 98 14 C140 18 168 40 158 74 C150 102 108 112 72 106 C44 100 32 86 28 64 Z", bolt: [94, 60] }, // jug
  { d: "M40 30 C70 8 130 12 150 40 C166 64 148 100 110 104 C84 106 72 92 52 90 C24 88 16 50 40 30 Z", bolt: [96, 56] }, // pinch
  { d: "M22 78 C30 40 70 22 118 24 C150 26 166 44 160 62 C154 80 120 76 96 90 C70 104 16 108 22 78 Z", bolt: [100, 54] }, // sloper
  { d: "M90 10 C122 10 146 34 142 64 C138 96 112 112 86 110 C56 108 36 88 38 60 C40 30 60 10 90 10 Z", bolt: [90, 60] }, // round
  { d: "M30 50 C34 24 64 18 84 30 C100 16 140 14 154 40 C168 66 140 98 104 100 C70 102 26 86 30 50 Z", bolt: [94, 62] }, // heart
  { d: "M20 60 C20 40 60 30 90 30 C126 30 162 38 162 60 C162 82 126 92 90 92 C56 92 20 80 20 60 Z", bolt: [90, 60] }, // edge
];

export default function Hold({ shape = 0, color = "var(--color-primary)", size = 80, rotate = 0, className, style }) {
  const { d, bolt } = HOLD_SHAPES[shape % HOLD_SHAPES.length];

  return (
    <svg
      className={className}
      width={size}
      height={(size * 120) / 180}
      viewBox="0 0 180 120"
      aria-hidden="true"
      style={{ transform: `rotate(${rotate}deg)`, overflow: "visible", ...style }}
    >
      <path d={d} fill={color} stroke="var(--color-ink)" strokeWidth="3" vectorEffect="non-scaling-stroke" />
      <circle
        cx={bolt[0]}
        cy={bolt[1]}
        r="9"
        fill="var(--color-background)"
        stroke="var(--color-ink)"
        strokeWidth="3"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
