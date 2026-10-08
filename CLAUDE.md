@AGENTS.md

# climb-reviews

A climbing gym guide built on how climbers describe each gym: tags for difficulty, setting style, versatility, price and more, plus ratings and written reviews. Google's rating is shown alongside for context, never blended in. My portfolio flagship.

Tags are the core feature, not decoration. Climbers pick them from a fixed list, grouped by category, so they can be counted (e.g. "Soft grades · 12 climbers").

## How to work with me
- I'm a junior product designer learning design engineering. Strong in HTML, CSS and Git; new to JavaScript and React.
- Automate: write the code and run the steps for me. Briefly explain new concepts or steps that deserve it.
- Bias toward building something tangible and iterating. Fill in information gaps as we go instead of planning everything up front.
- Keep explanations short and direct.
- Log decisions (with the reason) in NOTES.md.
- This project is my portfolio case study for design engineering roles; getting hired is the goal. Add every design decision to docs/decision-log.md, tagged USER CALL / AI PROPOSAL, USER ACCEPTED / AI MISTAKE, USER CAUGHT, and update docs/case-study-plan.md when something changes the story.

## Stack
- Next.js App Router, plain JavaScript (no TypeScript), no src/ directory.
- CSS Modules for component styles; design tokens as CSS variables in app/globals.css. No Tailwind.
- Design happens in code for now (Paper is paused: free plan's weekly MCP limit). Token names in app/globals.css match the tokens in the Paper file "Design system v1" exactly; keep them in sync if Paper resumes.
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
- No banner image on gym pages. Photos only appear in the photo gallery once someone uploads them; no placeholder art in their place.

## Gym data (for now)
- data/nyc-gyms.csv is the source of truth for NYC gym facts (same data as the "NYC Climbing Gyms" Google Sheet). Run `python3 scripts/csv-to-gyms.py` to regenerate data/gyms.js; never edit gyms.js by hand.
- Facts were verified against each gym's official site (Oct 2026). Ratings, tags and reviews in gyms.js are SAMPLE content flagged `sample: true`, shown with a "Sample data" label. Never ship sample reviews or made-up Google ratings to the live site.
- The CSV has a Status column. Closed gyms (MPHC) are kept in gyms.js with status "closed", listed last, and not counted in "N gyms". Chelsea Piers Fitness was removed (members-only).

## Data model
- gyms: id, slug, name, address, neighborhood, city, state, type (bouldering / ropes / both), website, google_place_id, latitude, longitude, day_pass_price, membership_price, prices_checked_at
  - Not yet in Supabase: address, day_pass_price, membership_price, prices_checked_at (add with ALTER TABLE when connecting real data).
  - Prices are facts I enter, shown with "as of <month>" and a link to the gym's site. Cards show the day pass price; the gym page shows day pass + monthly membership.
- reviews: id, gym_id → gyms.id, user_id → auth.users.id, overall, setting, value, community (1–5), body, created_at
  - Optional "About you" fields (all nullable, shown on the review): boulder_grade_range, rope_grade_range, height_range, gender, age_range. Options live in lib/climberInfo.js. Never required, never inferred; the privacy page must mention them.
- tags: id, slug, label, category. A fixed list I manage; users can't create tags. Categories and tags are listed under "Tag list" below.
- review_tags: review_id → reviews.id, tag_id → tags.id. Picked in the review form, so each review carries its own tags.
- Amenities are tags with category = 'amenity', flagged by climbers in the review form (not entered by me). The gym page shows only amenities climbers have flagged, labeled "Climbers mention", with counts.
- saved_gyms: user_id → auth.users.id, gym_id → gyms.id, list ('favorite', 'want_to_visit' or 'visited'), created_at. One table for all three lists; a gym can be in several.
- gym_submissions: id, user_id, name, address, website, notes, status (pending / approved / rejected), created_at. I review and approve them; submissions never go straight into gyms.
- gym_photos: TBD when the gallery is built (Supabase Storage).
- RLS: anyone can read gyms, reviews, tags, review_tags and photos. Signed-in users can insert their own reviews (with review_tags), saved gyms and gym submissions. Users can read and delete only their own saved gyms. Only I can read submissions.

### How criteria are classified
- Fact (true/false, stored on the gym): climbing type.
- Rating (1–5, has a better and worse): overall, setting quality, value, community (how welcoming it is). Overall is the headline rating: gym cards/rows show only the overall star rating; the gym page highlights overall and shows the other three below it.
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
- `/` landing: straightforward, no hook line. Title ("Find a climbing gym"), one-line subtitle, search (gym or city), then filters and the gym list right away. Filters are one dropdown per category (Grading, Setting style, Who it suits, Crowding, Setting frequency, Amenities, Price), each with checkboxes. Sort covers every rating plus price: Top rated, Best community, Best setting, Best value, Day pass low/high, Most reviewed, Name A–Z. Card/map toggle uses icons.
- Gym lists are in no particular order visually: never number them (reads as a ranking).
- `/gyms/[slug]` gym detail: top tags with counts, climber-flagged amenities, site ratings and reviews, Google rating badge, links to the gym's website and Google Maps, photo gallery, favorite, want-to-visit and visited buttons, review flow (ratings + tag picker + amenity checklist + text)
- `/submit` suggest a missing gym (form works; saving waits for the database)
- `/login` log in or sign up with an email magic link (form works; sending waits for Supabase Auth)
- `/terms`, `/privacy`: plain-English drafts in components/pages/ (not legal advice; review before public launch; update Privacy whenever data handling changes). Contact email lives in lib/site.js (CONTACT_EMAIL, currently null = hidden).
- No About page for now (decided: landing page explains the site; the story goes in the portfolio case study).
- Every page exists in both versions: `/x` (A) and `/b/x` (B); shared content lives in components/pages/.
- `/saved` the signed-in user's Favorites, Want to visit and Visited lists (private, not a profile)
- MPHC (Manhattan Plaza Health Club climbing gym: 482 W 43rd St, Hell's Kitchen; opened 1992 in a former racquetball court; per the club, NYC's first commercial climbing gym; closed Sept 30, 2026 after 34 years; bouldering, top rope and lead) is a regular gym with status "closed". Its card sits last in the gym list in black and white with a "Closed · 1992–2026" label. Its page (`/gyms/mphc`, and `/mphc` redirects there) uses the normal gym page style, with its story (intro, numbers, timeline, photos, memories, sources) in place of ratings, prices, reviews and save buttons. Story content lives in lib/closedGyms.js. Every fact needs a source: a published one (listed on the page) or my own firsthand knowledge. Never invent quotes or memories.

## Build order
No deadline and no cut features. Build in this order so there's always a finished, deployable site:
1. Core loop: landing + gym list, gym page, review flow with tags, login, deploy.
2. Differentiators: tag filtering, map view, sort.
3. Growth: search, saved gyms (favorites, want to visit, visited), submit a gym, national import.
4. Polish and play: view transitions, shape morphing, animated illustrations, photo gallery.

## Interactivity (how it's built)
- Pages stay server components; interactive parts are client components ("use client"): components/a/HomeA.js, components/b/HomeB.js, ReviewsA/ReviewsB, ReviewComposer, SaveButtons, FilterDropdown, RatingInput.
- Shared logic lives in hooks, not duplicated per version: lib/useGymFilters.js (search, filters, sort for the gym list; pure functions in lib/gymFilters.js) and lib/useReviewFilters.js (topic chips, search, sort for reviews).
- Filter rules: within a tag category any pick matches; across categories all must match; amenities require every pick; price uses day pass ranges (Under $30, $30–$35, Over $35). Closed gyms only show when no filters are on, and always sort last.
- View transitions use React's <ViewTransition> (no config needed in Next 16; see node_modules/next/dist/docs/01-app/02-guides/view-transitions.md). State changes that should animate go through startTransition. Gym names morph card/row → page title (name `gym-name-<slug>`). Links into a gym use transitionTypes={["nav-forward"]}, back links ["nav-back"]. Pages are wrapped in components/PageTransition.js. Animation CSS is at the bottom of app/globals.css, including prefers-reduced-motion.
- Morphing UI: ReviewComposer morphs its button into a review sheet (same view-transition name on both). Prefer expanding components in place over sending people to a new page.
- Save buttons store choices in localStorage until sign-in exists; they move to saved_gyms later.
- Gym page map: components/GymMap.js, an OpenStreetMap embed using coordinates from Nominatim (scripts/geocode-gyms.py). Swap to Google Maps JS later without changing pages.
- List map view: components/GymsMap.js, Google Maps JS via @vis.gl/react-google-maps. Needs NEXT_PUBLIC_GOOGLE_MAPS_KEY and NEXT_PUBLIC_GOOGLE_MAP_ID in .env.local (and in Vercel's environment variables). Pins show the overall rating; tapping one opens a preview card on the map. Uses the same filtered results as the list. Google project: climb-reviews; key restricted to localhost:3000 and *.vercel.app, Maps JavaScript API only.
- Shared components are themed by CSS variables (--filter-*, --composer-*, --save-*, --map-*); version B overrides them in app/b/zine.css.

## Responsive rules (every page, every change)
- One responsive site, no separate mobile version. Must work from 320px phones to 1920px+ monitors, in portrait and landscape.
- Check at 320, 375, 414, 768, 1024, 1280 and 1920 wide: nothing scrolls sideways, no text spills out of its box.
- Grid columns use minmax(0, …) so long content can't force them wider; long words wrap (overflow-wrap on headings), never hyphenate short ones.
- Touch screens: anything tappable is at least 44px tall (global rule in globals.css).
- Phones: filter menus open as bottom sheets; the filter row scrolls sideways instead of stacking.
- Big display type uses clamp() with a small-phone minimum.

## Design versions (comparing, temporary)
- Version A (plywood wall, sticker style): `/` and `/gyms/[slug]`. Files in app/(a)/ and components/ (+ components/a/ for header/footer).
- Version B (bold riso zine, several riso ink colors): `/b` and `/b/gyms/[slug]`. Files in app/b/ and components/b/. Its tokens are scoped to `.zine` in app/b/zine.css. Rock-wall texture (public/illustrations/rock-wall.jpg, made by scripts/make-rock-texture.py) is used for the home page rock band and callout boxes, never as a gym banner.
- Both share data/, lib/, and the root layout (fonts). Once one is picked, delete the other.

## Visual direction (version A)
- A fresh plywood wall, a bucket of new holds, and the setter's tape. References: Pinterest "bouldering" (plywood walls with t-nut dot grids, hold flat-lays, zine/club posters, marker scribbles, cute illustrated holds).
- White pages (--color-background). Plywood + dot grid only on feature surfaces: hero, card headers, illustrations.
- One primary accent: pink hold (--color-primary), used for main buttons and the overall rating highlight.
- Each tag category has its own icon (components/Glyph.js), shown on a dot of the category's color. Icons are the main identifier, color is secondary. Amenities and price get icons on a neutral dot.
- Illustrations: flat holds with ink outlines and a bolt hole, carabiners, and volumes. Components in components/illustrations/. (Rope and setter's tape were tried and cut: they looked random.)
- Home page heroes (both versions) are a close-up of a set wall: components/illustrations/RouteWall.js draws wallLayout.js (parts of two routes around a volume) with hold silhouettes from wallHolds.js. Same flat style as the other illustrations: solid color, ink outline, one white bolt hole, no shading or inner detail. One color per route; big hand holds, small footholds in the route color; holds face the way they're pulled. Keep it calm: a close crop, not a whole wall (a detailed four-route version was tried and cut as distracting).
- Volumes are POINTED shapes (three-sided pyramids, diamonds, fins), never cubes. They have bolt holes and often holds screwed onto their faces.
- View toggles (cards/list vs map) use icons, not words.
- Type: Bricolage Grotesque ExtraBold for display, DM Sans for body.
- Control sizes (both versions): every button, chip, dropdown and field is --control-lg (48px, main actions + text fields), --control-md (40px, everyday buttons, dropdowns, pills) or --control-sm (32px, chips). Fixed height, text centered, side padding from --control-pad-*. Read-only tags are --tag-height (28px). Never set vertical padding on a control.
- The design system is documented in docs/design-system.md (for the portfolio, not a site page). Update it when tokens change.
- View transitions and shape morphing with Motion (level 4).

## Google Cloud safety checklist (before deploy / before upgrading the free trial)
- Free trial (ends Jan 2027) never charges the card unless upgraded. Budget alert set: $5/month on real usage (credits excluded), alerts at 50/90/100%.
- Daily and per-minute map-load quotas are NOT adjustable on this account. Before upgrading to a paid account, revisit caps (or add an automated budget-triggered shutoff).
- At deploy: replace the key's `https://*.vercel.app/*` referrer with the exact site address, and add NEXT_PUBLIC_GOOGLE_MAPS_KEY + NEXT_PUBLIC_GOOGLE_MAP_ID to Vercel's environment variables.
- Map view reuses one map instance (`reuseMaps`) so switching views doesn't create extra billed map loads.

## Open questions (decide, then log in NOTES.md)
- Seed NYC with my own tags and reviews before importing other states?
- Minimum number of climbers flagging an amenity before it shows (1 or 2+)?

## Not planned
User profiles, editing reviews, directions. Ask me before adding these.
