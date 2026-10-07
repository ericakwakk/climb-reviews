// Helpers for turning gym data into display text and colors.

export const TYPE_LABELS = {
  bouldering: "Bouldering",
  ropes: "Ropes",
  both: "Bouldering + ropes",
};

// Tag categories in display order, each with its circuit color.
export const TAG_CATEGORIES = [
  { name: "Grading", color: "var(--color-hold-yellow)" },
  { name: "Setting style", color: "var(--color-hold-teal)" },
  { name: "Who it suits", color: "var(--color-hold-purple)" },
  { name: "Crowding", color: "var(--color-hold-orange)" },
  { name: "Setting frequency", color: "var(--color-hold-blue)" },
];

const CATEGORY_COLORS = Object.fromEntries(TAG_CATEGORIES.map((c) => [c.name, c.color]));

// Amenities and price have no circuit color: they're facts, not character.
export function categoryColor(category) {
  return CATEGORY_COLORS[category] ?? "var(--color-background)";
}

// Overall first: it's the headline rating. The rest show on the gym page.
export const RATING_FIELDS = [
  { key: "overall", label: "Overall" },
  { key: "community", label: "Community", hint: "How welcoming it is" },
  { key: "setting", label: "Setting" },
  { key: "value", label: "Value" },
];

// The most-picked tags first.
export function topTags(tags, limit = tags.length) {
  return [...tags].sort((a, b) => b.count - a.count).slice(0, limit);
}

// Groups tags by category: { "Grading": [...], "Setting style": [...] }
export function tagsByCategory(tags) {
  const groups = {};
  for (const tag of topTags(tags)) {
    if (!groups[tag.category]) groups[tag.category] = [];
    groups[tag.category].push(tag);
  }
  return groups;
}

// A Google Maps search link. Will switch to googleMapsUri from the Places API later.
export function googleMapsLink(gym) {
  const query = encodeURIComponent(`${gym.name} ${gym.address}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function formatDate(isoDate) {
  return new Date(isoDate + "T12:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Sort options for the gym list (same in both design versions).
export const SORT_OPTIONS = [
  { value: "overall", label: "Top rated" },
  { value: "community", label: "Best community" },
  { value: "setting", label: "Best setting" },
  { value: "value", label: "Best value" },
  { value: "price-low", label: "Day pass: low to high" },
  { value: "price-high", label: "Day pass: high to low" },
  { value: "reviews", label: "Most reviewed" },
  { value: "name", label: "Name A–Z" },
];

// Price filter ranges (day pass). Matched to real NYC prices ($28–$38 in Oct 2026).
export const PRICE_RANGES = ["Under $30", "$30–$35", "Over $35"];

export function formatPrice(dollars) {
  return `$${dollars}`;
}

export function formatMonthYear(isoDate) {
  return new Date(isoDate + "T12:00:00").toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// Short price text for cards and rows. Some gyms have no public day pass (e.g. members-only clubs).
export function dayPassLabel(gym) {
  return gym.dayPass != null ? `${formatPrice(gym.dayPass)} day pass` : "No public day pass";
}
