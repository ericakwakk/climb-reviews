// Hold silhouettes for the route wall, drawn flat in the same style as Hold.js: solid color, ink outline,
// one white bolt hole. Shapes are deliberately irregular (real holds are lumpy, lobed and asymmetric,
// almost never round). Each sits in a 100×100 box centered on 0,0 with its "good side" facing up,
// so rotate 0 = pulled down, 90/-90 = sidepull, 180 = undercling.
// bolt: where the bolt hole sits (null = a small screw-on hold, too small to show one)

export const HOLD_TYPES = {
  // Lobed jug: big and positive
  jug: {
    body: "M-50 -4 C-52 -28 -30 -40 -10 -34 C0 -46 30 -46 42 -28 C54 -12 50 14 34 26 C20 38 -4 40 -22 32 C-40 26 -48 12 -50 -4 Z",
    bolt: [10, -6],
  },
  // Rounded pyramid sloper
  sloper: {
    body: "M-50 34 C-40 6 -16 -36 4 -44 C18 -46 30 -20 44 10 C52 28 46 38 30 38 C6 40 -24 42 -50 34 Z",
    bolt: [2, 12],
  },
  // Edge for fingertips: a flat lip on top, lumpy underneath
  crimp: {
    body: "M-50 -10 C-30 -16 10 -16 48 -12 C52 -4 44 8 30 12 C18 16 8 8 -4 12 C-18 16 -34 14 -44 6 C-50 2 -52 -4 -50 -10 Z",
    bolt: [8, -2],
  },
  // Long, uneven edge you can match hands on
  rail: {
    body: "M-50 -6 C-40 -14 -20 -12 -4 -14 C14 -16 34 -12 48 -6 C54 0 48 10 36 10 C26 10 20 16 8 14 C-6 12 -16 16 -30 12 C-44 10 -54 4 -50 -6 Z",
    bolt: [-12, 0],
  },
  // Tall blade you squeeze
  pinch: {
    body: "M-8 -50 C10 -44 24 -20 22 10 C20 34 8 50 -8 48 C-22 46 -26 26 -24 2 C-22 -22 -24 -46 -8 -50 Z",
    bolt: [-1, 6],
  },
  // Pointed horn: a sidepull or undercling
  horn: {
    body: "M-50 30 C-40 0 -10 -40 40 -48 C30 -30 26 -6 30 20 C10 34 -24 40 -50 30 Z",
    bolt: [2, 14],
  },
  // Thick, curved banana
  crescent: {
    body: "M-46 26 C-50 -6 -24 -40 14 -44 C34 -46 50 -36 48 -26 C30 -28 8 -18 -2 0 C-10 16 -20 30 -46 26 Z",
    bolt: [-24, 4],
  },
  // Mushroom: a cap you can grab from above, with a stem
  mushroom: {
    body: "M-48 -6 C-50 -30 -20 -42 4 -40 C30 -40 50 -28 48 -8 C46 4 30 6 20 8 C22 22 14 40 0 40 C-14 40 -18 22 -16 8 C-30 6 -46 6 -48 -6 Z",
    bolt: [0, -18],
  },
  // Foothold: flat top edge, rounded underside
  smile: {
    body: "M-50 -14 C-30 -20 30 -20 50 -14 C46 14 22 30 0 30 C-24 30 -46 14 -50 -14 Z",
    bolt: null,
  },
  // Foothold: small screw-on triangle
  jib: {
    body: "M-48 32 L-2 -42 C4 -48 10 -46 14 -38 L48 30 C50 36 44 40 38 40 L-40 40 C-48 40 -52 36 -48 32 Z",
    bolt: null,
  },
  // Foothold: a lopsided little chip
  chip: {
    body: "M-44 -10 C-40 -34 -10 -46 12 -36 C24 -30 22 -14 34 -8 C48 0 48 22 32 32 C14 44 -20 40 -36 26 C-46 18 -46 4 -44 -10 Z",
    bolt: null,
  },
};
