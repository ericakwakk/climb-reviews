# Turns data/nyc-gyms.csv (the same data as the "NYC Climbing Gyms" Google Sheet) into data/gyms.js.
# Real facts come from the CSV. Ratings, tags and reviews are SAMPLE content so we can see the
# design filled in; they're marked `sample: true` and must never ship to the live site.
# Run: python3 scripts/csv-to-gyms.py

import csv, json, os, re

ROOT = os.path.join(os.path.dirname(__file__), "..")
CHECKED = "2026-10-06"

# Three sample rating/tag sets. "ropes" sets mention auto-belay, so they only go on gyms with ropes.
SAMPLES = {
    "bouldering-a": {
        "reviewCount": 14,
        "ratings": {"overall": 4.6, "setting": 4.8, "value": 3.9, "community": 4.7},
        "tags": [
            {"category": "Grading", "label": "Sandbagged", "count": 9},
            {"category": "Setting style", "label": "Dynamic/comp-style", "count": 11},
            {"category": "Setting style", "label": "Overhang-heavy", "count": 7},
            {"category": "Who it suits", "label": "Training-focused", "count": 8},
            {"category": "Crowding", "label": "Packed after work", "count": 12},
            {"category": "Setting frequency", "label": "Fresh sets often", "count": 10},
        ],
        "amenities": [
            {"label": "Kilter board", "count": 12},
            {"label": "Spray wall", "count": 9},
            {"label": "Hangboard", "count": 8},
            {"label": "Showers", "count": 6},
        ],
        "reviews": [
                {
                        "id": 1,
                        "author": "Sample climber",
                        "date": "2026-09-21",
                        "ratings": {
                                "overall": 5,
                                "setting": 5,
                                "value": 4,
                                "community": 5
                        },
                        "tags": [
                                "Sandbagged",
                                "Dynamic/comp-style",
                                "Fresh sets often"
                        ],
                        "body": "Sample review: grades are stiff but the sets are fun, and people hype each other up on the comp wall."
                },
                {
                        "id": 2,
                        "author": "Sample climber",
                        "date": "2026-08-30",
                        "ratings": {
                                "overall": 4,
                                "setting": 5,
                                "value": 3,
                                "community": 4
                        },
                        "tags": [
                                "Packed after work",
                                "Training-focused"
                        ],
                        "body": "Sample review: go before 5 or after 9. The Kilter board is always busy but worth the wait."
                },
                {
                        "id": 3,
                        "author": "Sample climber",
                        "date": "2026-08-12",
                        "ratings": {
                                "overall": 4,
                                "setting": 4,
                                "value": 3,
                                "community": 5
                        },
                        "tags": [
                                "Sandbagged",
                                "Overhang-heavy"
                        ],
                        "body": "Sample review: the overhang cave is the best part. V3 here feels like V5 elsewhere, so check your ego at the door."
                },
                {
                        "id": 4,
                        "author": "Sample climber",
                        "date": "2026-07-28",
                        "ratings": {
                                "overall": 5,
                                "setting": 5,
                                "value": 4,
                                "community": 4
                        },
                        "tags": [
                                "Fresh sets often",
                                "Dynamic/comp-style"
                        ],
                        "body": "Sample review: new sets every week. The setting team clearly loves coordination moves and big dynos."
                },
                {
                        "id": 5,
                        "author": "Sample climber",
                        "date": "2026-07-02",
                        "ratings": {
                                "overall": 3,
                                "setting": 4,
                                "value": 2,
                                "community": 4
                        },
                        "tags": [
                                "Packed after work"
                        ],
                        "body": "Sample review: great walls, but the day pass is pricey and weekday evenings are a zoo."
                },
                {
                        "id": 6,
                        "author": "Sample climber",
                        "date": "2026-06-15",
                        "ratings": {
                                "overall": 5,
                                "setting": 5,
                                "value": 4,
                                "community": 5
                        },
                        "tags": [
                                "Training-focused",
                                "Overhang-heavy"
                        ],
                        "body": "Sample review: spray wall, hangboards and a Kilter board. Best training setup I've found in the city."
                }
        ],
    },
    "bouldering-b": {
        "reviewCount": 8,
        "ratings": {"overall": 4.1, "setting": 3.8, "value": 4.6, "community": 4.9},
        "tags": [
            {"category": "Grading", "label": "Soft", "count": 6},
            {"category": "Setting style", "label": "Slab-heavy", "count": 7},
            {"category": "Setting style", "label": "Technical", "count": 5},
            {"category": "Who it suits", "label": "Beginner-friendly", "count": 5},
            {"category": "Crowding", "label": "Quiet", "count": 6},
            {"category": "Setting frequency", "label": "Sets stay up a while", "count": 4},
        ],
        "amenities": [
            {"label": "Shoe rental", "count": 6},
            {"label": "Hangboard", "count": 4},
        ],
        "reviews": [
                {
                        "id": 7,
                        "author": "Sample climber",
                        "date": "2026-09-04",
                        "ratings": {
                                "overall": 4,
                                "setting": 4,
                                "value": 5,
                                "community": 5
                        },
                        "tags": [
                                "Slab-heavy",
                                "Quiet"
                        ],
                        "body": "Sample review: quiet, friendly, and the slab will humble you. Great for footwork."
                },
                {
                        "id": 8,
                        "author": "Sample climber",
                        "date": "2026-08-20",
                        "ratings": {
                                "overall": 4,
                                "setting": 3,
                                "value": 5,
                                "community": 5
                        },
                        "tags": [
                                "Beginner-friendly",
                                "Soft"
                        ],
                        "body": "Sample review: took my roommate for her first time. Staff walked her through everything and the easy problems are actually easy."
                },
                {
                        "id": 9,
                        "author": "Sample climber",
                        "date": "2026-08-01",
                        "ratings": {
                                "overall": 5,
                                "setting": 4,
                                "value": 5,
                                "community": 5
                        },
                        "tags": [
                                "Quiet",
                                "Sets stay up a while"
                        ],
                        "body": "Sample review: never crowded, so I can project in peace. Sets stay up a while, which is good for projecting and bad for variety."
                },
                {
                        "id": 10,
                        "author": "Sample climber",
                        "date": "2026-07-14",
                        "ratings": {
                                "overall": 3,
                                "setting": 3,
                                "value": 4,
                                "community": 4
                        },
                        "tags": [
                                "Technical",
                                "Slab-heavy"
                        ],
                        "body": "Sample review: very technical setting. If you like crimps and balance it's great; if you like big moves, go elsewhere."
                },
                {
                        "id": 11,
                        "author": "Sample climber",
                        "date": "2026-06-22",
                        "ratings": {
                                "overall": 4,
                                "setting": 4,
                                "value": 5,
                                "community": 5
                        },
                        "tags": [
                                "Soft",
                                "Beginner-friendly"
                        ],
                        "body": "Sample review: grades run soft, so it's a confidence boost. Lovely community and the price is fair."
                }
        ],
    },
    "ropes": {
        "reviewCount": 22,
        "ratings": {"overall": 4.3, "setting": 4.1, "value": 4.4, "community": 4.5},
        "tags": [
            {"category": "Grading", "label": "Fair", "count": 15},
            {"category": "Setting style", "label": "Good variety", "count": 13},
            {"category": "Who it suits", "label": "Beginner-friendly", "count": 17},
            {"category": "Who it suits", "label": "Good for kids", "count": 6},
            {"category": "Crowding", "label": "Packed on weekends", "count": 11},
            {"category": "Setting frequency", "label": "Fresh sets often", "count": 9},
        ],
        "amenities": [
            {"label": "Auto-belay", "count": 18},
            {"label": "Shoe rental", "count": 16},
            {"label": "Gear rental", "count": 14},
            {"label": "Weight room", "count": 10},
        ],
        "reviews": [
                {
                        "id": 12,
                        "author": "Sample climber",
                        "date": "2026-09-12",
                        "ratings": {
                                "overall": 4,
                                "setting": 4,
                                "value": 5,
                                "community": 5
                        },
                        "tags": [
                                "Beginner-friendly",
                                "Fair"
                        ],
                        "body": "Sample review: brought friends who'd never climbed. Staff were great and the auto-belays made it easy."
                },
                {
                        "id": 13,
                        "author": "Sample climber",
                        "date": "2026-08-25",
                        "ratings": {
                                "overall": 5,
                                "setting": 4,
                                "value": 4,
                                "community": 4
                        },
                        "tags": [
                                "Good variety",
                                "Fresh sets often"
                        ],
                        "body": "Sample review: bouldering, top rope and lead all in one place, and something new every visit."
                },
                {
                        "id": 14,
                        "author": "Sample climber",
                        "date": "2026-08-03",
                        "ratings": {
                                "overall": 4,
                                "setting": 4,
                                "value": 4,
                                "community": 4
                        },
                        "tags": [
                                "Packed on weekends",
                                "Good for kids"
                        ],
                        "body": "Sample review: weekends are full of birthday parties and kids' teams, so come on a weekday morning."
                },
                {
                        "id": 15,
                        "author": "Sample climber",
                        "date": "2026-07-19",
                        "ratings": {
                                "overall": 4,
                                "setting": 5,
                                "value": 4,
                                "community": 5
                        },
                        "tags": [
                                "Good variety",
                                "Fair"
                        ],
                        "body": "Sample review: grades feel accurate across the gym, and the lead walls are tall enough to get pumped."
                },
                {
                        "id": 16,
                        "author": "Sample climber",
                        "date": "2026-06-30",
                        "ratings": {
                                "overall": 4,
                                "setting": 4,
                                "value": 5,
                                "community": 4
                        },
                        "tags": [
                                "Beginner-friendly",
                                "Packed on weekends"
                        ],
                        "body": "Sample review: good intro classes and gear rental. Weekend crowds are the only downside."
                }
        ],
    },
}

# Sample "About you" info, so the optional climber details show up on some sample reviews.
# Some reviewers share everything, some share a little, some nothing (it's all optional).
SAMPLE_CLIMBERS = [
    {"boulderGrade": "V4–V5", "height": "5'3\"–5'7\"", "gender": "Woman", "age": "25–34"},
    {"boulderGrade": "V6–V7", "ropeGrade": "5.12", "height": "5'8\"–6'0\""},
    None,
    {"boulderGrade": "VB–V1", "age": "18–24"},
    {"boulderGrade": "V2–V3", "ropeGrade": "5.10", "height": "Under 5'3\" (160 cm)", "gender": "Non-binary"},
    {"ropeGrade": "5.11", "gender": "Man", "age": "35–44"},
]
for sample in SAMPLES.values():
    for review in sample["reviews"]:
        climber = SAMPLE_CLIMBERS[review["id"] % len(SAMPLE_CLIMBERS)]
        if climber:
            review["climber"] = climber

EMPTY = {"reviewCount": 0, "ratings": None, "tags": [], "amenities": [], "reviews": []}


def slugify(name):
    s = name.lower().replace("&", "and")
    s = re.sub(r"\(.*?\)", "", s)
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


# Short URLs for special cases (otherwise the slug comes from the name)
SLUG_OVERRIDES = {"Manhattan Plaza Health Club Climbing Gym": "mphc"}

gyms = []
with open(os.path.join(ROOT, "data", "nyc-gyms.csv")) as f:
    rows = list(csv.DictReader(f))

open_rows = [r for r in rows if r.get("Status", "open") == "open"]
closed_rows = [r for r in rows if r.get("Status", "open") == "closed"]


def base_fields(row):
    return {
        "slug": SLUG_OVERRIDES.get(row["Name"], slugify(row["Name"])),
        "name": row["Name"],
        "address": row["Address"],
        "neighborhood": row["Neighborhood"],
        "city": row["City"],
        "state": row["State"],
        "type": row["Type"],
        "website": row["Website"],
        "lat": float(row["Latitude"]) if row.get("Latitude") else None,
        "lng": float(row["Longitude"]) if row.get("Longitude") else None,
    }


for i, row in enumerate(open_rows):
    # Every 5th gym stays empty so the "no reviews yet" state shows up too
    if i % 5 == 4:
        sample = EMPTY
    elif row["Type"] == "bouldering":
        sample = SAMPLES["bouldering-a" if i % 2 == 0 else "bouldering-b"]
    else:
        sample = SAMPLES["ropes"]
    gyms.append({
        **base_fields(row),
        "status": "open",
        "dayPass": int(row["Day pass ($)"]) if row["Day pass ($)"].strip() else None,
        "dayPassNote": row["Notes"],
        "membership": None,  # not collected yet
        "pricesCheckedAt": CHECKED,
        "sample": sample is not EMPTY,
        **json.loads(json.dumps(sample)),
    })

# Closed gyms go last. Their pages tell their story instead of showing ratings (see lib/closedGyms.js).
for row in closed_rows:
    gyms.append({
        **base_fields(row),
        "status": "closed",
        "dayPass": None,
        "membership": None,
        "sample": False,
        **EMPTY,
    })

out = f"""// GENERATED by scripts/csv-to-gyms.py from data/nyc-gyms.csv. Don't edit by hand; edit the CSV and re-run.
// Gym facts are real (verified Oct 2026). Ratings, tags and reviews are SAMPLE content (sample: true)
// so we can see the design filled in. Never ship sample reviews to the live site.

export const gyms = {json.dumps(gyms, indent=2)};

export function getGymBySlug(slug) {{
  return gyms.find((gym) => gym.slug === slug);
}}
"""
open(os.path.join(ROOT, "data", "gyms.js"), "w").write(out)
print(f"wrote {len(gyms)} gyms:", ", ".join(g["slug"] for g in gyms))
