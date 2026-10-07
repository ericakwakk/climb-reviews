import styles from "./GoogleRatingBadge.module.css";

// Google's rating, shown next to (never blended with) the climbers' ratings.
// Rules: fetched fresh from the Places API server-side, never stored; attribution + Maps link required.
// Until the Places API is connected it gets no rating, and shows an empty state instead.
export default function GoogleRatingBadge({ rating, count, mapsUrl }) {
  const hasRating = rating != null;

  return (
    <section className={styles.badge} aria-label="Google rating">
      <p className={styles.label}>On Google</p>
      <div className={styles.row}>
        <p className={styles.rating}>{hasRating ? rating.toFixed(1) : "—"}</p>
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 2.5l2.9 6.1 6.6.8-4.9 4.5 1.3 6.6L12 17.2l-5.9 3.3 1.3-6.6-4.9-4.5 6.6-.8z"
            fill="var(--color-ink)"
          />
        </svg>
        <p className={styles.count}>{hasRating ? `${count.toLocaleString()} reviews` : "Connects to Google soon"}</p>
      </div>
      <p className={styles.note}>A different crowd: everyone who&apos;s left a Google review, not just climbers.</p>
      <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
        See reviews on Google Maps ↗
      </a>
      <p className={styles.attribution}>Rating data © Google</p>
    </section>
  );
}
