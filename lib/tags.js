// The fixed tag list (see CLAUDE.md). Mirrors what the `tags` table will hold.
// pickOne: the review form lets a climber choose only one tag in that category.

export const TAG_LIST = [
  { category: "Grading", pickOne: true, labels: ["Soft", "Fair", "Sandbagged"] },
  {
    category: "Setting style",
    pickOne: false,
    labels: ["Slab-heavy", "Overhang-heavy", "Dynamic/comp-style", "Technical", "Good variety"],
  },
  { category: "Who it suits", pickOne: false, labels: ["Beginner-friendly", "Good for kids", "Training-focused"] },
  {
    category: "Crowding",
    pickOne: false,
    labels: ["Quiet", "Moderately busy", "Packed after work", "Packed on weekends"],
  },
  { category: "Setting frequency", pickOne: true, labels: ["Fresh sets often", "Sets stay up a while"] },
];

export const AMENITIES = [
  "Weight room",
  "Kilter board",
  "Moonboard",
  "Tension board",
  "Spray wall",
  "Sauna",
  "Showers",
  "Shoe rental",
  "Gear rental",
  "Auto-belay",
  "Fitness classes",
  "Hangboard",
];

// The filter dropdowns: every tag category, plus amenities.
export const FILTER_GROUPS = [
  ...TAG_LIST.map((group) => ({ category: group.category, options: group.labels })),
  { category: "Amenities", options: AMENITIES },
];

const CATEGORY_BY_LABEL = Object.fromEntries(
  TAG_LIST.flatMap((group) => group.labels.map((label) => [label, group.category]))
);

export function categoryOf(label) {
  return CATEGORY_BY_LABEL[label];
}
