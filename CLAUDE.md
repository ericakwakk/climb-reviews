@AGENTS.md

# climb-reviews

A climbing gym guide built on how climbers describe each gym: tags for difficulty, setting style, versatility, price and more, plus ratings and written reviews. Google's rating is shown alongside for context, never blended in. My portfolio flagship.

Tags are the core feature, not decoration. Climbers pick them from a fixed list, grouped by category, so they can be counted (e.g. "Soft grades · 12 climbers").

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

## Photo rules (do not break)
- Never copy photos from Google, gym websites or social media. Publicly visible doesn't mean free to use.
- Allowed sources: my own photos; gym photos with written permission (credit the gym, e.g. "Photo: Brooklyn Boulders"); user uploads.
- User uploads: the Terms page must say uploaders own the photo and grant permission to display it. Uploads need moderation before showing.
- No Google Place Photos. Keeps costs down and keeps Google content out of the climbers' view.
- Gyms without photos get an illustrated header (holds, ropes, carabiners), not a gray placeholder.

## Data model
- gyms: id, slug, name, neighborhood, type (bouldering / ropes / both), website, google_place_id, latitude, longitude
- reviews: id, gym_id → gyms.id, user_id → auth.users.id, overall, setting, value, community (1–5), body, created_at
- tags: id, slug, label, category. A fixed list I manage; users can't create tags. Categories and tags are listed under "Tag list" below.
- review_tags: review_id → reviews.id, tag_id → tags.id. Picked in the review form, so each review carries its own tags.
- Amenities are tags with category = 'amenity', flagged by climbers in the review form (not entered by me). The gym page shows only amenities climbers have flagged, labeled "Climbers mention", with counts.
- saved_gyms: user_id → auth.users.id, gym_id → gyms.id, list ('favorite', 'want_to_visit' or 'visited'), created_at. One table for all three lists; a gym can be in several.
- gym_submissions: id, user_id, name, address, website, notes, status (pending / approved / rejected), created_at. I review and approve them; submissions never go straight into gyms.
- gym_photos: TBD when the gallery is built (Supabase Storage).
- RLS: anyone can read gyms, reviews, tags, review_tags and photos. Signed-in users can insert their own reviews (with review_tags), saved gyms and gym submissions. Users can read and delete only their own saved gyms. Only I can read submissions.

### How criteria are classified
- Fact (true/false, stored on the gym): climbing type.
- Rating (1–5, has a better and worse): overall, setting quality, value, community (how welcoming it is). Community is shown up front: on every gym card and near the top of the gym page.
- Tag (about fit, not quality; counted): grading, setting style, who it suits, crowding, setting frequency, amenities.
- Written review: everything else.

### Tag list
Pick any unless marked "pick one".
- Grading (pick one): Soft · Fair · Sandbagged
- Setting style: Slab-heavy · Overhang-heavy · Dynamic/comp-style · Technical · Good variety
- Who it suits: Beginner-friendly · Good for kids · Training-focused
- Crowding: Quiet · Moderately busy · Packed after work · Packed on weekends
- Setting frequency (pick one): Fresh sets often · Sets stay up a while
- Amenities: Weight room · Kilter board · Moonboard · Tension board · Spray wall · Sauna · Showers · Shoe rental · Gear rental · Auto-belay · Fitness classes · Hangboard

Tags describe style and fit, never quality (quality belongs in ratings). A tag must differ between gyms; something every gym has (e.g. "crimpy") isn't a tag.

## Pages
- `/` landing: hero + gym list, card/map toggle, search (gym or city), tag filters, sort
- `/gyms/[slug]` gym detail: top tags with counts, climber-flagged amenities, site ratings and reviews, Google rating badge, links to the gym's website and Google Maps, photo gallery, favorite, want-to-visit and visited buttons, review flow (ratings + tag picker + amenity checklist + text)
- `/submit` submit a missing gym
- `/saved` the signed-in user's Favorites, Want to visit and Visited lists (private, not a profile)
- `/about`
- `/mphc` hand-built memorial for MPHC (closed Sept 30, 2026). Static and quieter in tone; no ratings or form.
- `/login`, `/terms`, `/privacy`

## Build order
No deadline and no cut features. Build in this order so there's always a finished, deployable site:
1. Core loop: landing + gym list, gym page, review flow with tags, login, deploy.
2. Differentiators: tag filtering, map view, sort.
3. Growth: search, saved gyms (favorites, want to visit, visited), submit a gym, national import.
4. Polish and play: view transitions, shape morphing, animated illustrations, photo gallery.

## Visual direction
Colorful UI with climbing illustrations (holds, ropes, carabiners). View transitions and shape morphing with Motion.

## Open questions (decide, then log in NOTES.md)
- Seed NYC with my own tags and reviews before importing other states?
- Minimum number of climbers flagging an amenity before it shows (1 or 2+)?

## Not planned
User profiles, editing reviews, directions. Ask me before adding these.
