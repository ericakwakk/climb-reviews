// Hand-drawn-style symbols that mark each tag category (plus amenities and price). Used in both versions.

const GLYPHS = {
  // Three steps going up: difficulty
  Grading: <path d="M3 19 H8 V14 H13 V9 H18 V4" fill="none" />,
  // A squiggle: movement
  "Setting style": <path d="M2 14 C5 6 8 6 10 12 C12 18 15 18 18 10 C19 7 21 7 22 9" fill="none" />,
  // A little person
  "Who it suits": (
    <>
      <circle cx="12" cy="6" r="3" fill="none" />
      <path d="M5 21 C6 14 18 14 19 21" fill="none" />
    </>
  ),
  // Three heads: a crowd
  Crowding: (
    <>
      <circle cx="6" cy="14" r="3" fill="none" />
      <circle cx="12" cy="9" r="3" fill="none" />
      <circle cx="18" cy="14" r="3" fill="none" />
    </>
  ),
  // Circular arrow: reset / refresh
  "Setting frequency": (
    <>
      <path d="M19 12 A7 7 0 1 1 15 5.6" fill="none" />
      <path d="M14 2 L16 6 L12 7.5" fill="none" />
    </>
  ),
  // Plus: extras
  Amenities: <path d="M12 4 V20 M4 12 H20" fill="none" />,
  // Dollar sign: price
  Price: <path d="M12 3 V21 M16.5 7 C15.5 5.5 13.8 5 12 5 C9.5 5 7.5 6.3 7.5 8.4 C7.5 13 16.5 10.5 16.5 15.4 C16.5 17.6 14.4 19 12 19 C9.8 19 8 18.2 7 16.6" fill="none" />,
};

export default function Glyph({ category, size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      {GLYPHS[category] ?? GLYPHS.Amenities}
    </svg>
  );
}
