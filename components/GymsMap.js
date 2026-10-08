"use client";

import Link from "next/link";
import { startTransition, useEffect, useState, ViewTransition } from "react";
import { AdvancedMarker, APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import StarRating from "./StarRating";
import { dayPassLabel } from "@/lib/gymDisplay";
import { storyFor } from "@/lib/closedGyms";
import styles from "./GymsMap.module.css";

// The browser key is public by design (it ends up in the page); it's locked to our website
// and to the Maps JavaScript API in the Google Cloud console.
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;
const NYC = { lat: 40.735, lng: -73.97 };

// Map view of the gym list: one pin per gym (showing its overall rating). Tapping a pin
// grows a preview card on the map instead of sending you to another page.
export default function GymsMap({ gyms, hrefFor }) {
  const [selected, setSelected] = useState(null);
  const pinned = gyms.filter((g) => g.lat != null && g.lng != null);
  const active = pinned.find((g) => g.slug === selected) ?? null;

  if (!API_KEY) {
    return (
      <div className={styles.missing}>
        <p className={styles.missingTitle}>The map needs a Google Maps key</p>
        <p>Add NEXT_PUBLIC_GOOGLE_MAPS_KEY to .env.local, then restart the dev server.</p>
      </div>
    );
  }

  const select = (slug) => startTransition(() => setSelected((cur) => (cur === slug ? null : slug)));

  return (
    <APIProvider apiKey={API_KEY}>
      <div className={styles.wrap}>
        <Map
          className={styles.map}
          mapId={MAP_ID || "DEMO_MAP_ID"}
          // Reuse the same map when switching views back and forth: each new map counts as a billed "map load"
          reuseMaps
          defaultCenter={NYC}
          defaultZoom={11}
          gestureHandling="greedy"
          disableDefaultUI
          zoomControl
          clickableIcons={false}
          onClick={() => select(null)}
        >
          <FitToGyms gyms={pinned} />
          {pinned.map((gym) => {
            const closed = gym.status === "closed";
            return (
              <AdvancedMarker
                key={gym.slug}
                position={{ lat: gym.lat, lng: gym.lng }}
                title={gym.name}
                zIndex={gym.slug === selected ? 10 : closed ? 0 : 1}
                onClick={() => select(gym.slug)}
              >
                <span
                  className={`${styles.pin} ${closed ? styles.pinClosed : ""} ${gym.slug === selected ? styles.pinActive : ""}`}
                >
                  {closed ? "Closed" : gym.ratings ? gym.ratings.overall.toFixed(1) : "New"}
                </span>
              </AdvancedMarker>
            );
          })}
        </Map>

        {/* Preview card: grows out of the map when a pin is tapped */}
        {active && (
          <ViewTransition key={active.slug} enter="gym-enter" exit="gym-exit" default="none">
            <div className={styles.card}>
              <button type="button" className={styles.close} onClick={() => select(null)} aria-label="Close preview">
                ×
              </button>
              <p className={styles.cardType}>
                {active.status === "closed" ? `Closed · ${storyFor(active).years}` : `${active.neighborhood} · ${active.city}`}
              </p>
              <ViewTransition name={`gym-name-${active.slug}`} share="morph" default="none">
                <h3 className={styles.cardName}>{active.name}</h3>
              </ViewTransition>
              {active.status !== "closed" && (
                <p className={styles.cardMeta}>
                  {active.ratings ? <StarRating value={active.ratings.overall} size={16} /> : <span>No reviews yet</span>}
                  <span className={styles.cardPrice}>{dayPassLabel(active)}</span>
                </p>
              )}
              <Link href={hrefFor(active.slug)} transitionTypes={["nav-forward"]} className={styles.cardLink}>
                {active.status === "closed" ? "Read its story" : "View gym"}&nbsp;<span aria-hidden="true">→</span>
              </Link>
            </div>
          </ViewTransition>
        )}

        <p className={styles.count}>
          {pinned.length} {pinned.length === 1 ? "gym" : "gyms"} on the map
        </p>
      </div>
    </APIProvider>
  );
}

// Zooms the map to fit whichever gyms are showing (it re-fits when filters change).
function FitToGyms({ gyms }) {
  const map = useMap();
  const key = gyms.map((g) => g.slug).join(",");

  useEffect(() => {
    if (!map || gyms.length === 0 || !window.google) return;
    if (gyms.length === 1) {
      map.panTo({ lat: gyms[0].lat, lng: gyms[0].lng });
      map.setZoom(14);
      return;
    }
    const bounds = new window.google.maps.LatLngBounds();
    gyms.forEach((g) => bounds.extend({ lat: g.lat, lng: g.lng }));
    map.fitBounds(bounds, 60);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-fit only when the set of gyms changes
  }, [map, key]);

  return null;
}
