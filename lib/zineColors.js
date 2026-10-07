// Version B: which riso ink marks each tag category (alongside its symbol).
export const ZINE_CATEGORY_COLORS = {
  Grading: "var(--zine-yellow)",
  "Setting style": "var(--zine-green)",
  "Who it suits": "var(--zine-purple)",
  Crowding: "var(--zine-orange)",
  "Setting frequency": "var(--zine-blue)",
};

export function zineCategoryColor(category) {
  return ZINE_CATEGORY_COLORS[category] ?? "var(--zine-paper)";
}
