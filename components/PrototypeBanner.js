import styles from "./PrototypeBanner.module.css";

// Shown on every page while the site uses sample ratings and reviews on real gyms,
// so nobody mistakes them for real reviews. Remove when real reviews replace the samples.
export default function PrototypeBanner() {
  return (
    <aside className={styles.banner} aria-label="Prototype notice">
      <strong>Prototype.</strong> Gym details are real; ratings and reviews are sample data, not real reviews.
    </aside>
  );
}
