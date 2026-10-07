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

## Day 2 — 2026-10-06

### Community
- **Community is a star rating, not a tag.** Four ratings: overall, setting, value, community. Tried a community tag (Easy to make friends / Some socialization / People keep to themselves) but cut it: one community question in the form is enough.
- **Community goes up front:** the community rating shows on every gym card and near the top of the gym page. Google reviews never capture this.

### Visual direction
- **Look:** plywood climbing walls with colorful holds. Based on Pinterest "bouldering" references: plywood walls with bolt-hole dot grids, hold flat-lays, zine/club posters.
- **White pages, plywood only as a feature surface** (hero, card headers, gym banner). Keeps the color moments special.
- **One primary accent: pink hold.** Also the color of the community rating, which is shown up front.
- **Circuit colors:** each tag category gets a hold color (grading yellow, setting style teal, who it suits purple, crowding orange, setting frequency blue), like gyms color-coding routes. Color means something instead of decorating.
- **Sticker style:** ink outlines on holds, cards and buttons, with offset shadows. Playful, matches the zine references.
- **Type:** Bricolage Grotesque ExtraBold (display) + DM Sans (body).
- **Paper paused** (free plan hit its weekly MCP limit). Designing in code for now; token names match the Paper file so the two stay in sync.
- **Placeholder name:** "Name TBD" until I pick one.

### Design feedback round (Day 2)
- **Overall rating is the headline, not community.** Gym previews show only the overall star rating; the full breakdown (community, setting, value) lives on the gym page. Reverses the earlier "community up front" call: overall is what people scan for first.
- **No gym banner images.** Most gyms won't have photos until someone uploads them, and placeholder art in a banner slot felt fake. Photos only appear in the gallery.
- **Volumes are pointed** (pyramids, diamonds, fins), with bolt holes and holds screwed onto them, like real gym volumes. Not cubes.
- **Rock texture** (version B) is based on sculpted gym rock walls: big ledges, deep shadows, chalk. Rendered to a single image so it never shows a seam. Used for a rock-wall band on the home page, not as a gym banner.
- **Icons for the cards/map toggle**, not words.
- **Version B got more color:** riso yellow, green, orange and purple join pink and blue. Tag categories get a colored dot plus their symbol; numbered rows and score boxes each get an ink color.

### Landing page, filters, price (Day 2)
- **Straightforward landing page, no hook line.** Dropped "Every gym climbs differently" and "tagged by climbers". Title is just "Find a climbing gym", subtitle "Rated and reviewed by climbers". People should get to using it immediately.
- **No numbers on gym lists:** numbering made an unordered list look like a ranking.
- **Category icons over colors:** each tag category has a unique icon (both versions). Easier to recognize than an assigned color, and works for colorblind users.
- **Filters as dropdowns by category** instead of a wall of tag chips. Fewer things on screen; each opens to its options.
- **Sort by every rating + price**, not just a few.
- **Price is a fact, not a rating.** Day pass + monthly membership stored on the gym, with an "as of" date and a link to the gym's site since prices change. Cards show the day pass (what people compare when picking a next gym); the gym page shows both. Price filter uses day pass ranges. The Value rating stays separate: price = what it costs, value = whether climbers think it's worth it.

### Real NYC gyms (Day 2)
- **15 real NYC gyms** compiled into a Google Sheet ("NYC Climbing Gyms") and data/nyc-gyms.csv: name, address, neighborhood, borough, type, website, day pass price, with sources. Verified against official sites; Central Rock Gym prices are medium-confidence (price widget couldn't be read).
- **No Bronx or Staten Island gyms** exist right now. Chelsea Piers Fitness is members-only, so it shows "No public day pass".
- **Sample reviews on real gyms are clearly labeled** and never shipped. Real businesses shouldn't have made-up reviews that look genuine.
- **Removed the mock Google rating** (it showed 4.5 / 1,204 on every gym, which would look like real Google data next to real gyms). The badge shows an empty state until the Places API is connected.
- Dropped the word "tagged" from the UI copy ("No reviews yet" instead).

### MPHC memorial (Day 2)
- **Built the /mphc memorial page.** Manhattan Plaza Health Club's climbing gym opened in 1992 in a converted racquetball court and, per the club, was NYC's first commercial climbing gym. It closed Sept 30, 2026 after 34 years. It was my gym, and it deserves more than a "closed" label.
- **Quieter design than the rest of the site:** a serif typeface (Newsreader), soft paper color, one faded accent, lots of space. No ratings, no review form.
- **Facts only, with sources on the page** (MPHC's notice, W42ST, Time Out, Hoodline). Photos and memories are placeholders until I collect them, with permission. No invented quotes.
- **Linked quietly** from the bottom of the gym list and the footer, not mixed in with open gyms.
- **Removed Chelsea Piers Fitness** from the gym list (members-only club, not really a climbing gym you can visit).

### MPHC as a closed gym, not a separate page (Day 2)
- **Reversed the separate memorial page.** Its serif, soft-paper style felt disconnected from the rest of the site. MPHC is now a regular gym with status "closed": the **last card in the list, in black and white**, with "Closed · 1992–2026".
- **Its gym page uses the normal layout,** with the story (intro, numbers, timeline, photos, memories, sources) in place of ratings, prices and reviews. /mphc still works as a short link.
- **Cut the rope (and the start tape, carabiner) from the A hero.** They looked random next to the holds and volume.

### Responsive pass (Day 2)
- **One responsive site** that adapts to any screen, checked at 320 / 375 / 414 / 768 / 812 (landscape) / 1024 / 1280 / 1920 on every page type in both versions.
- **Fixed:** header links off-screen on small phones, long gym names ("Queensbridge") pushing pages sideways, filter menus opening off-screen, Version B's controls not wrapping and big score numbers overflowing, footer links not wrapping.
- **Phone patterns:** filters become one swipeable row; filter menus open as bottom sheets (easy to reach with a thumb); Version B scores stack on very small phones.
- **Touch targets:** everything tappable is at least 44px tall on touch screens.

### Interactive components (Day 2)
- **Filters, search and sort actually work.** Shared hook (useGymFilters) so both versions use the same logic. Any pick within a category, all categories must match, amenities need every pick. Removable chips + "Clear all", live count, "no gyms match" state. Price ranges changed to Under $30 / $30–$35 / Over $35 because no NYC gym costs under $25.
- **View transitions:** gym cards fade and slide when filters change; a gym's name morphs from its card into the page title; pages slide forward/back; the header stays put. Respects reduced-motion settings.
- **Morphing review composer:** "Write a review" morphs into a sheet (like iOS sheets growing out of their button). Star ratings (keyboard accessible), tag picker with pick-one rules, amenity checklist, text. Posting waits for sign-in.
- **Reviews filter like Google Maps:** topic chips built from tags and words in the text (Kilter, crowds, price, beginners…), merged so "Beginners" and "Beginner-friendly" are one chip. Search and sort too.
- **Save buttons toggle** and remember choices in the browser until accounts exist.
- **Map square** on gym pages (OpenStreetMap embed, coordinates from Nominatim). Google Maps later.
- **Removed "In memory: MPHC"** from the footers; the black-and-white card in the list is enough.

### Reviewer context (Day 2)
- **Optional "About you" in the review form:** bouldering grade, rope grade, height, gender, age range. All optional, tap to pick or skip, collapsed by default so the form stays short. Shown on the review ("Boulders V4–V5 · 5'3"–5'7"") so readers can judge it: "sandbagged" from a V2 climber means something different than from a V7 climber. Height matters for reach.
- **Ranges, not exact values** (grade ranges, height bands, age ranges): enough context without being too personal.
- **Review cards now highlight overall, not community**, matching the rest of the site.
- **Custom dropdown arrows** site-wide; the browser's default arrow sat too close to the edge.
- **Version A cards have no image anymore.** Every card repeated the same plywood-with-holds picture, echoing the hero. Now the hero is the page's one illustration moment, and cards are text-first: type label, name, neighborhood, rating + day pass on one line, top tags.
