@AGENTS.md

# climb-reviews

A climbing gym review site and my portfolio flagship. Each gym page shows the site's own climber ratings next to a Google overview (rating and review count only).

## How to work with me
- I'm a junior product designer learning design engineering. Strong in HTML, CSS and Git; new to JavaScript and React.
- Teach as you go. Explain every new concept briefly the first time it appears.
- Let me hand-write the first version of each new concept. Give me the pieces and check my work; don't write it for me unless I ask.
- Keep explanations short and direct.
- Log decisions (with the reason) in NOTES.md.

## Stack
- Next.js App Router, plain JavaScript (no TypeScript), no src/ directory.
- CSS Modules for component styles; design tokens as CSS variables in app/globals.css. No Tailwind.
- Token names come from Paper (my only design tool) and must match the CSS variable names exactly.
- Supabase: database, RLS, email magic-link auth. Reviews are written with Server Actions.
- Google Maps Platform: Maps JavaScript API via @vis.gl/react-google-maps; Places API (New) for ratings. Never the legacy Places API.
- Motion for animation. Hosted on Vercel.

## Google data rules (do not break)
- Store only google_place_id. Never store Google ratings or review counts; fetch them fresh.
- Places requests are server-side only, using GOOGLE_PLACES_KEY (never NEXT_PUBLIC_).
- The map uses a separate browser key, NEXT_PUBLIC_GOOGLE_MAPS_KEY, restricted by website.
- Field mask: rating, userRatingCount, googleMapsUri. Keep usage low.
- Show Google Maps attribution and a "See reviews on Google Maps" link. No Google review text.
- Never blend site ratings and Google ratings into one score.
- Map coordinates come from OpenStreetMap. Credit "© OpenStreetMap contributors".

## Data model
- gyms: id, slug, name, neighborhood, type (bouldering / ropes / both), website, google_place_id, latitude, longitude
- reviews: id, gym_id → gyms.id, user_id → auth.users.id, overall, setting, crowding, value (1–5), body, created_at
- RLS: anyone can read gyms and reviews; only signed-in users can insert reviews, with their own user_id.

## Pages
- `/` gym list with a map toggle
- `/gyms/[slug]` gym detail: site ratings and reviews, Google rating badge, review form
- `/mphc` hand-built memorial for MPHC (closed Sept 30, 2026). Static and quieter in tone; no ratings or form.
- `/login`, `/terms`, `/privacy`

## Out of scope for v1
User profiles, search, photo uploads, editing reviews, directions, users adding or editing gym details. Flag it if a task drifts into these.
