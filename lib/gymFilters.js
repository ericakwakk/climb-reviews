// Pure functions for filtering and sorting the gym list. No React here, so they're easy to reason about.

// selected: { [category]: string[] }, e.g. { Grading: ["Soft"], Amenities: ["Sauna"], Price: ["Under $30"] }
export function filterGyms(gyms, { query = "", selected = {} } = {}) {
  const q = query.trim().toLowerCase();
  const hasFilters = Object.values(selected).some((values) => values.length > 0);

  return gyms.filter((gym) => {
    // Search: gym name, neighborhood, borough or address
    if (q) {
      const haystack = `${gym.name} ${gym.neighborhood} ${gym.city} ${gym.address}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    // Closed gyms (MPHC) can't match tag, amenity or price filters
    if (gym.status === "closed") return !hasFilters;

    for (const [category, values] of Object.entries(selected)) {
      if (values.length === 0) continue;

      if (category === "Price") {
        if (!values.some((range) => inPriceRange(gym.dayPass, range))) return false;
      } else if (category === "Amenities") {
        // Amenities: every picked amenity must be there
        const has = new Set(gym.amenities.map((a) => a.label));
        if (!values.every((v) => has.has(v))) return false;
      } else {
        // Tag categories: any one of the picked tags counts
        const has = new Set(gym.tags.filter((t) => t.category === category).map((t) => t.label));
        if (!values.some((v) => has.has(v))) return false;
      }
    }
    return true;
  });
}

function inPriceRange(price, range) {
  if (price == null) return false;
  if (range === "Under $30") return price < 30;
  if (range === "$30–$35") return price >= 30 && price <= 35;
  if (range === "Over $35") return price > 35;
  return true;
}

// Higher is better for ratings; gyms without a rating or price always go after ones that have it.
const BY = {
  overall: (g) => g.ratings?.overall,
  community: (g) => g.ratings?.community,
  setting: (g) => g.ratings?.setting,
  value: (g) => g.ratings?.value,
  reviews: (g) => g.reviewCount,
};

export function sortGyms(gyms, sort) {
  const open = gyms.filter((g) => g.status !== "closed");
  const closed = gyms.filter((g) => g.status === "closed"); // closed gyms always last

  const sorted = [...open].sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name);
    if (sort === "price-low" || sort === "price-high") {
      if (a.dayPass == null) return 1;
      if (b.dayPass == null) return -1;
      return sort === "price-low" ? a.dayPass - b.dayPass : b.dayPass - a.dayPass;
    }
    const get = BY[sort] ?? BY.overall;
    const av = get(a);
    const bv = get(b);
    if (av == null && bv == null) return a.name.localeCompare(b.name);
    if (av == null) return 1;
    if (bv == null) return -1;
    return bv - av;
  });

  return [...sorted, ...closed];
}
