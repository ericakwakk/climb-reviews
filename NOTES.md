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
