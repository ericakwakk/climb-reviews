import styles from "./GymMap.module.css";

// A small square map showing where the gym is.
// For now: an OpenStreetMap embed (free, no API key; coordinates come from OSM too).
// Later this can switch to the Google Maps JavaScript API without changing the pages that use it.
export default function GymMap({ gym, className = "" }) {
  if (gym.lat == null || gym.lng == null) return null;

  const pad = { lat: 0.0045, lng: 0.0075 }; // how much area around the pin to show
  const bbox = [gym.lng - pad.lng, gym.lat - pad.lat, gym.lng + pad.lng, gym.lat + pad.lat].join(",");
  const embed = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${gym.lat},${gym.lng}`;
  const larger = `https://www.openstreetmap.org/?mlat=${gym.lat}&mlon=${gym.lng}#map=17/${gym.lat}/${gym.lng}`;

  return (
    <figure className={`${styles.map} ${className}`}>
      <iframe
        src={embed}
        title={`Map showing ${gym.name}`}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      <figcaption className={styles.caption}>
        <a href={larger} target="_blank" rel="noopener noreferrer">View larger map ↗</a>
        <span>© OpenStreetMap contributors</span>
      </figcaption>
    </figure>
  );
}
