import { HOLD_SHAPES } from "./Hold";

// A climbing "volume": a big pointed shape bolted to the wall. Setters screw holds onto
// its faces, or use it on its own. Each face is shaded differently so it reads as 3D,
// and has a few bolt holes (t-nuts) for mounting holds.
//
// shape: "tetra" (three-sided pyramid) | "kite" (four-sided diamond) | "fin" (two-sided wedge)
// holds: colors of holds screwed onto the faces, e.g. ["var(--color-primary)"]
// printed: true = version B's two-color print look (color nudged off the ink outline)

const SHAPES = {
  tetra: {
    points: { A: [100, 6], B: [194, 160], C: [6, 160], P: [118, 104] },
    faces: [["A", "P", "C"], ["A", "B", "P"], ["C", "P", "B"]],
  },
  kite: {
    points: { A: [96, 4], B: [194, 74], C: [104, 166], D: [6, 92], P: [120, 84] },
    faces: [["A", "P", "D"], ["A", "B", "P"], ["B", "C", "P"], ["C", "D", "P"]],
  },
  fin: {
    points: { A: [72, 6], B: [196, 160], C: [4, 160], M: [118, 160] },
    faces: [["A", "M", "C"], ["A", "B", "M"]],
  },
};

// How much darker each face is (0 = base color). Light comes from the top-left.
const SHADES = [0, 34, 18, 26];

// Spots inside a triangle, as weights of its three corners: where bolt holes go
const BOLT_SPOTS = [
  [0.5, 0.3, 0.2],
  [0.2, 0.5, 0.3],
  [0.3, 0.2, 0.5],
];

function mix([a, b, c], [w1, w2, w3]) {
  return [a[0] * w1 + b[0] * w2 + c[0] * w3, a[1] * w1 + b[1] * w2 + c[1] * w3];
}

export default function Volume({
  shape = "tetra",
  color = "var(--color-hold-teal)",
  ink = "var(--color-ink)",
  holds = [],
  size = 180,
  rotate = 0,
  printed = false,
  className,
  style,
}) {
  const { points, faces } = SHAPES[shape];
  const tris = faces.map((f) => f.map((name) => points[name]));
  const toPoints = (tri) => tri.map((p) => p.join(",")).join(" ");
  const shade = (i) => (SHADES[i] ? `color-mix(in srgb, ${color} ${100 - SHADES[i]}%, black)` : color);
  const outline = { stroke: ink, strokeWidth: printed ? 2.5 : 6, strokeLinejoin: "round" };

  // Mounted holds sit near the middle of the first faces
  const mounted = holds.map((holdColor, i) => {
    const [x, y] = mix(tris[i % tris.length], [0.34, 0.33, 0.33]);
    return { x, y, color: holdColor, shape: (i * 2 + 1) % HOLD_SHAPES.length, rotate: i % 2 ? 24 : -18 };
  });

  return (
    <svg
      className={className}
      width={size}
      height={(size * 170) / 200}
      viewBox="0 0 200 170"
      aria-hidden="true"
      style={{ transform: `rotate(${rotate}deg)`, overflow: "visible", ...style }}
    >
      {/* Faces */}
      {printed ? (
        <>
          <g transform="translate(8 7)" style={{ mixBlendMode: "multiply" }}>
            {tris.map((tri, i) => (
              <polygon key={i} points={toPoints(tri)} style={{ fill: shade(i) }} />
            ))}
          </g>
          {tris.map((tri, i) => (
            <polygon key={i} points={toPoints(tri)} fill="none" {...outline} />
          ))}
        </>
      ) : (
        tris.map((tri, i) => <polygon key={i} points={toPoints(tri)} style={{ fill: shade(i) }} {...outline} />)
      )}

      {/* Bolt holes (t-nuts) on each face */}
      {tris.map((tri, i) =>
        BOLT_SPOTS.map((w, j) => {
          const [x, y] = mix(tri, w);
          return <circle key={`${i}-${j}`} cx={x} cy={y} r="2.6" fill={ink} opacity="0.55" />;
        })
      )}

      {/* Holds screwed onto the faces (drawn at about 1/3 scale) */}
      {mounted.map((h, i) => {
        const { d, bolt } = HOLD_SHAPES[h.shape];
        return (
          <g key={i} transform={`translate(${h.x - 29} ${h.y - 19}) scale(0.32) rotate(${h.rotate} 90 60)`}>
            {printed && <path d={d} style={{ fill: h.color }} transform="translate(12 10)" />}
            <path d={d} style={{ fill: printed ? "none" : h.color }} stroke={ink} strokeWidth={printed ? 10 : 14} />
            <circle cx={bolt[0]} cy={bolt[1]} r="11" fill="#ffffff" stroke={ink} strokeWidth="10" />
          </g>
        );
      })}
    </svg>
  );
}
