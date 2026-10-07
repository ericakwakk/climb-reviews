# Adds Latitude/Longitude to data/nyc-gyms.csv using OpenStreetMap's Nominatim geocoder.
# Map coordinates come from OpenStreetMap, not Google (see CLAUDE.md). Nominatim's usage policy:
# max 1 request per second and a real User-Agent. Only fills rows that don't have coordinates yet.
# Run: python3 scripts/geocode-gyms.py
import csv, json, os, time, urllib.parse, urllib.request

ROOT = os.path.join(os.path.dirname(__file__), "..")
PATH = os.path.join(ROOT, "data", "nyc-gyms.csv")
HEADERS = {"User-Agent": "climb-reviews/0.1 (portfolio project; one-time geocoding)"}

rows = list(csv.DictReader(open(PATH)))
fields = list(rows[0].keys())
for col in ["Latitude", "Longitude"]:
    if col not in fields:
        fields.append(col)

for row in rows:
    if row.get("Latitude"):
        continue
    query = urllib.parse.urlencode({"q": row["Address"], "format": "json", "limit": 1, "countrycodes": "us"})
    req = urllib.request.Request(f"https://nominatim.openstreetmap.org/search?{query}", headers=HEADERS)
    results = json.load(urllib.request.urlopen(req, timeout=20))
    if results:
        row["Latitude"], row["Longitude"] = results[0]["lat"], results[0]["lon"]
        print(f"{row['Name']}: {row['Latitude']}, {row['Longitude']}  ({results[0]['display_name'][:70]})")
    else:
        print(f"{row['Name']}: NOT FOUND")
    time.sleep(1.1)

with open(PATH, "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=fields)
    w.writeheader()
    w.writerows(rows)
