// A close-up of a set gym wall around two volumes. Coordinates are in a 300×222 box (about 2m × 1.5m),
// with the floor just below the bottom edge, so every route starts in frame.
//
// How it's set, like a real wall:
// - Four routes, one color each. Every route starts low, marked with tape in its color; the grade
//   (V-scale) is written on the tape in marker.
// - Bolt-on holds sit on the t-nut grid (every 18 units, starting at 9). RouteWall snaps each hold so
//   its bolt hole lands on a grid point. Screw-on footholds (smile, jib, chip) can go anywhere.
// - Holds on a volume (onVolume) bolt into the volume instead, and stay fully inside one face.
//   Big holds rarely go on volumes, so those are small crimps.
// - Hand holds are big, footholds small, and holds face the way they're pulled
//   (r: 0 = pulled down, ±90 = sidepull, 180 = undercling). Nothing overlaps.
//
// Hold fields: t = type (see wallHolds.js), x/y = center, s = size, r = rotation.
// Tape fields: x/y = center, w = length, r = rotation, text = grade written on it. Tape sits right
// under its start hold (about 1 unit below the hold's lowest point), so it's clear which hold it marks.

export const GRID = { size: 18, offset: 9 };

export const WALL = {
  width: 300,
  height: 222,

  volumes: [
    { tone: "light", points: { top: [98, 50], left: [42, 150], right: [154, 150], peak: [108, 122] }, faces: [["top", "peak", "left"], ["top", "right", "peak"], ["left", "peak", "right"]] },
    { tone: "dark", points: { top: [258, -12], right: [298, 30], bottom: [262, 68], left: [222, 26], peak: [266, 28] }, faces: [["top", "peak", "left"], ["top", "right", "peak"], ["right", "bottom", "peak"], ["bottom", "left", "peak"]] },
  ],

  routes: [
    // Yellow: start on two crimps under the volume, small crimps on its faces, then a big crescent above it
    {
      color: "yellow",
      grade: "V3",
      holds: [
        { t: "crimp", x: 78.99, y: 171.73, s: 26, r: -6 },
        { t: "crimp", x: 133.03, y: 171.21, s: 24, r: 8 },
        { t: "crimp", x: 84, y: 116, s: 20, r: -30, onVolume: 0 },
        { t: "crimp", x: 120, y: 104, s: 16, r: 28, onVolume: 0 },
        { t: "crescent", x: 74.32, y: 22.55, s: 50, r: -12 },
        { t: "chip", x: 56, y: 212, s: 13, r: 12 },
        { t: "jib", x: 146, y: 210, s: 14, r: -8 },
        { t: "smile", x: 104, y: 140, s: 13, r: 0, onVolume: 0 },
      ],
      tape: [
        { x: 78.5, y: 181.5, w: 20, r: -2, text: "V3" },
        { x: 133, y: 179.5, w: 14, r: 3 },
      ],
    },
    // Blue: a match start on a jug, then up the left edge and out of frame
    {
      color: "blue",
      grade: "V2",
      holds: [
        { t: "jug", x: 23.6, y: 173.04, s: 34, r: 0 },
        { t: "sloper", x: 9.5, y: 112.65, s: 36, r: 16 },
        { t: "pinch", x: 26.98, y: 42.93, s: 34, r: -10 },
        { t: "chip", x: 14, y: 214, s: 13, r: -20 },
        { t: "smile", x: 30, y: 144, s: 14, r: 10 },
      ],
      tape: [
        { x: 23, y: 190.5, w: 20, r: 2, text: "V2" },
      ],
    },
    // Teal: a single start crimp, then straight up the middle and out of frame
    {
      color: "teal",
      grade: "V4",
      holds: [
        { t: "crimp", x: 186.8, y: 189.71, s: 28, r: -4 },
        { t: "sloper", x: 187.7, y: 131.33, s: 32, r: -10 },
        { t: "mushroom", x: 170.44, y: 68.37, s: 30, r: 6 },
        { t: "crimp", x: 187.19, y: 27.81, s: 24, r: -10 },
        { t: "jib", x: 164, y: 214, s: 14, r: 10 },
        { t: "chip", x: 212, y: 212, s: 13, r: -14 },
        { t: "smile", x: 176, y: 154, s: 13, r: -6 },
      ],
      tape: [
        { x: 186.5, y: 199.5, w: 20, r: -2, text: "V4" },
      ],
    },
    // Pink: two start holds (a horn and a rail), an undercling and a pinch, finishing on the dark volume
    {
      color: "pink",
      grade: "V5",
      holds: [
        { t: "horn", x: 238.29, y: 188.01, s: 28, r: -70 },
        { t: "rail", x: 283.04, y: 171.57, s: 34, r: 8 },
        { t: "jug", x: 228.4, y: 132.96, s: 34, r: 180 },
        { t: "pinch", x: 279.96, y: 114.9, s: 38, r: 15 },
        { t: "crimp", x: 258, y: 38, s: 17, r: -24, onVolume: 1 },
        { t: "smile", x: 258, y: 214, s: 15, r: -6 },
        { t: "jib", x: 292, y: 210, s: 14, r: 8 },
        { t: "chip", x: 262, y: 150, s: 13, r: 20 },
      ],
      tape: [
        { x: 239, y: 208.5, w: 14, r: -3 },
        { x: 283, y: 182.5, w: 20, r: 3, text: "V5" },
      ],
    },
  ],
};
