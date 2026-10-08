import { HOLD_TYPES } from "./wallHolds";
import { GRID, WALL } from "./wallLayout";

// A close-up of a set gym wall: the t-nut grid, volumes, routes (one color each) and start tape with
// the grade written on it. Same flat style as Hold.js and Volume.js: solid color, ink outline,
// white bolt holes.
// palette maps the layout's color names to CSS colors, so each version can use its own inks.
// grid: draw the plywood t-nut dots (version A). Holds snap to the grid either way.
// printed: version B's two-color print look (color nudged off the ink outline).

const VOLUME_TONES = { light: "#f2ece2", dark: "#3d3833" };
const FACE_SHADES = [0, 14, 26, 20];

export default function RouteWall({
  palette,
  ink = "var(--color-ink)",
  paper = "#ffffff",
  grid = false,
  printed = false,
  layout = WALL,
  preserveAspectRatio = "xMidYMid meet",
  className,
}) {
  const stroke = printed ? 2.5 : 3;
  const { size: g, offset } = GRID;

  return (
    <svg
      className={className}
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      preserveAspectRatio={preserveAspectRatio}
      aria-hidden="true"
    >
      {grid && (
        <>
          <defs>
            <pattern id="t-nuts" width={g} height={g} patternUnits="userSpaceOnUse" x={offset - g / 2} y={offset - g / 2}>
              <circle cx={g / 2} cy={g / 2} r="1.7" fill="#b98f5f" />
              <circle cx={g / 2} cy={g / 2} r="0.7" fill="#8a6640" />
            </pattern>
          </defs>
          {/* Oversized so the dots also fill any space around the drawing on wide screens */}
          <rect x="-1000" y="-1000" width="3000" height="3000" fill="url(#t-nuts)" />
        </>
      )}

      {layout.volumes.map((v, i) => (
        <Volume key={i} volume={v} ink={ink} stroke={stroke} printed={printed} />
      ))}

      {layout.routes.map((route, i) =>
        route.holds.map((hold, j) => (
          <WallHold
            key={`${i}-${j}`}
            hold={snapToGrid(hold)}
            color={palette[route.color]}
            ink={ink}
            paper={paper}
            stroke={stroke}
            printed={printed}
          />
        ))
      )}

      {layout.routes.map((route, i) =>
        (route.tape ?? []).map((tape, j) => (
          <Tape key={`${i}-${j}`} tape={tape} color={palette[route.color]} />
        ))
      )}
    </svg>
  );
}

// Move a bolt-on hold so its bolt hole lands on the nearest t-nut. Screw-on holds (no bolt) and
// holds bolted to a volume stay where they are.
function snapToGrid(hold) {
  const bolt = HOLD_TYPES[hold.t].bolt;
  if (!bolt || hold.onVolume !== undefined) return hold;
  const a = ((hold.r ?? 0) * Math.PI) / 180;
  const k = hold.s / 100;
  const wx = hold.x + (bolt[0] * Math.cos(a) - bolt[1] * Math.sin(a)) * k;
  const wy = hold.y + (bolt[0] * Math.sin(a) + bolt[1] * Math.cos(a)) * k;
  const { size, offset } = GRID;
  const snap = (v) => Math.round((v - offset) / size) * size + offset;
  return { ...hold, x: hold.x + snap(wx) - wx, y: hold.y + snap(wy) - wy };
}

function Volume({ volume, ink, stroke, printed }) {
  const base = VOLUME_TONES[volume.tone];
  const tris = volume.faces.map((f) => f.map((name) => volume.points[name]));
  const toPoints = (tri) => tri.map((p) => p.join(",")).join(" ");
  const shade = (i) => (FACE_SHADES[i] ? `color-mix(in srgb, ${base} ${100 - FACE_SHADES[i]}%, black)` : base);

  return (
    <g>
      <g transform={printed ? "translate(3 2.5)" : undefined}>
        {tris.map((tri, i) => (
          <polygon key={i} points={toPoints(tri)} style={{ fill: shade(i) }} />
        ))}
      </g>
      {tris.map((tri, i) => (
        <polygon
          key={i}
          points={toPoints(tri)}
          data-part="volume"
          fill="none"
          stroke={ink}
          strokeWidth={stroke}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </g>
  );
}

function WallHold({ hold, color, ink, paper, stroke, printed }) {
  const type = HOLD_TYPES[hold.t];
  const place = `translate(${hold.x} ${hold.y}) rotate(${hold.r ?? 0}) scale(${hold.s / 100})`;
  const line = {
    stroke: ink,
    strokeWidth: hold.s < 20 ? stroke - 1 : stroke,
    strokeLinejoin: "round",
    vectorEffect: "non-scaling-stroke",
  };

  return (
    <g>
      <g transform={printed ? "translate(2.5 2)" : undefined}>
        <path d={type.body} transform={place} style={{ fill: color }} />
      </g>
      <g transform={place}>
        <path d={type.body} fill="none" {...line} data-part="hold" data-on-volume={hold.onVolume} />
        {type.bolt && <circle cx={type.bolt[0]} cy={type.bolt[1]} r="9" style={{ fill: paper }} {...line} />}
      </g>
    </g>
  );
}

// A thin strip of tape in the route's color, with torn ends and no outline (so it doesn't read as a
// hold), and the grade scrawled on it in black marker
function Tape({ tape, color }) {
  const half = tape.w / 2;
  const h = tape.text ? 4.3 : 3.4; // half the tape's height (a bit wider where the grade is written)
  // Torn ends: a few small zigzags instead of a clean cut
  const d = [
    `M${-half} ${-h}`,
    `L${half} ${-h}`,
    `L${half - 1.2} ${-h / 3}`,
    `L${half + 0.6} ${h / 4}`,
    `L${half - 0.8} ${h}`,
    `L${-half} ${h}`,
    `L${-half + 1} ${h / 3}`,
    `L${-half - 0.7} ${-h / 4}`,
    "Z",
  ].join(" ");

  return (
    <g transform={`translate(${tape.x} ${tape.y}) rotate(${tape.r ?? 0})`}>
      <path d={d} style={{ fill: color }} opacity="0.92" data-part="tape" />
      {/* A faint sheen along the top edge, like the gloss on vinyl tape */}
      <path d={`M${-half + 1} ${-h + 0.9} L${half - 1} ${-h + 0.9}`} stroke="#ffffff" strokeOpacity="0.45" strokeWidth="0.8" />
      {tape.text && (
        <text
          x="0"
          y="0.6"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="6.2"
          transform="rotate(-4)"
          style={{ fill: "#1a1714", fontFamily: "var(--font-marker), 'Permanent Marker', cursive" }}
        >
          {tape.text}
        </text>
      )}
    </g>
  );
}
