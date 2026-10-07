// A carabiner: thick colored loop with ink outline and a gate on the right side.
export default function Carabiner({ color = "var(--color-hold-blue)", size = 60, rotate = 0, className, style }) {
  const loop = "M30 6 C46 6 54 16 54 30 L54 70 C54 86 44 94 30 94 C16 94 6 86 6 70 L6 30 C6 16 14 6 30 6 Z";

  return (
    <svg
      className={className}
      width={size}
      height={(size * 100) / 60}
      viewBox="0 0 60 100"
      aria-hidden="true"
      style={{ transform: `rotate(${rotate}deg)`, overflow: "visible", ...style }}
    >
      {/* Ink outline, then color on top: gives the sticker-style outline */}
      <path d={loop} fill="none" stroke="var(--color-ink)" strokeWidth="13" />
      <path d={loop} fill="none" stroke={color} strokeWidth="7" />
      {/* Gate: cut a gap on the right side, then draw the gate bar */}
      <line x1="54" y1="38" x2="54" y2="62" stroke="var(--color-background)" strokeWidth="15" />
      <line x1="58" y1="36" x2="50" y2="64" stroke="var(--color-ink)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
