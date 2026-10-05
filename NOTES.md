# Decision log

## Day 0 — 2026-10-05

### Stack
- **Next.js (App Router), plain JavaScript.** No TypeScript yet: I'm learning JS first, and adding types on top would slow that down.
- **CSS Modules, no Tailwind.** I'm strong in CSS, and my Paper tokens map 1:1 to CSS variables. Token names in Paper must match variable names in code.
- **Supabase** for the database and email magic-link sign-in. No passwords to manage.
- **Google Maps Platform:** Maps JavaScript API for the map, Places API (New) for ratings. Never the legacy Places API.
- **@vis.gl/react-google-maps** for the map, **Motion** for animation, **Vercel** for hosting.

### Google data rules
- Store only `google_place_id`. Fetch the rating and review count fresh on each request; never store them (Google's terms).
- Places requests run server-side only, with a server key. The map uses a separate browser key restricted by website.
- Keep site ratings and Google ratings separate. Never blend them into one score.

### Gym data
- Map coordinates come from OpenStreetMap, not Google, so I'm not storing Google data.
- NYC gyms added by hand. Everywhere else imported from OpenStreetMap with a one-time script, then matched to Google place IDs.

### Setup
- Created with create-next-app: Next.js 16.3.8, ESLint, no src/ directory.
- Repo: github.com/ericakwakk/climb-reviews (pushed over SSH).
- Skipped `npm audit fix --force`: the 5 warnings are in dev-only tools (ESLint), not code that ships to users, and forcing the fix could install breaking versions.

### Product framing
- **Tags are the core, not just reviews.** The site is about how climbers *classify* a gym (difficulty, setting style, versatility, price), not only star ratings. This is my main difference from RateMyWall.
- **Fixed tag list, grouped by category.** Free text can't be counted; fixed tags can ("Soft grades · 12 climbers").
- **Tags are picked in the review form**, so each review carries its own tags. Two new tables: `tags` and `review_tags`.
- Still open: which ratings overlap with tags (value vs price, crowding), and whether tag filtering is in v1.

## Day 1 — 2026-10-05

### Ratings vs tags vs facts
- **Ratings (1–5) are for quality:** overall, setting, value, community. **Tags are for fit:** things that aren't better or worse, just right for some climbers. **Facts** (climbing type) are stored on the gym.
- Crowding moved from a rating to tags, because "packed after work" is more useful than a 3/5.

### Tag list
- Grading is pick-one, so nobody ticks Soft and Sandbagged together. "Fair" instead of "Accurate": friendlier word.
- Setting style tags come in opposite pairs (slab ↔ overhang, technical ↔ dynamic) plus "Good variety" for gyms that don't lean either way.
- Cut "Crimpy": every gym has crimps, so it doesn't tell gyms apart. A tag must differ between gyms.
- Cut "Creative" and "Uninspired ladders": those are quality judgments, and the setting rating already covers quality.
- Cut the Vibe category: it overlapped with Training-focused and the community rating.
- "Sets go stale" → "Sets stay up a while": same info, fairer to gyms who'll read the site.
- Cut "Other" from amenities: a fixed list can't count "other". Unusual amenities go in the written review.

### Amenities
- Amenities are tags climbers flag in their review, not a list I maintain. The gym page shows only what climbers flagged ("Climbers mention"), with counts. No red ✕ wall like RateMyWall.

### Photos
- No copying photos from Google or gym sites (copyright). Sources: my own, gyms with permission, user uploads later. No Google Place Photos. Gyms without photos get an illustrated header.

### Scope
- No deadline, no cut features. Build in four levels (core loop → differentiators → growth → polish) so there's always a deployable site.
