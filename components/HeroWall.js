import Hold from "./illustrations/Hold";
import Volume from "./illustrations/Volume";
import styles from "./HeroWall.module.css";

// The home page illustration: a plywood wall with holds and a volume.
export default function HeroWall() {
  return (
    <div className={styles.wall} aria-hidden="true">
      <Hold className={styles.h1} shape={0} color="var(--color-primary)" size={150} rotate={-8} />
      <Hold className={styles.h2} shape={3} color="var(--color-hold-yellow)" size={74} rotate={10} />
      <Hold className={styles.h3} shape={5} color="var(--color-hold-purple)" size={96} rotate={-24} />
      <Hold className={styles.h4} shape={1} color="var(--color-hold-orange)" size={86} rotate={14} />
      <Volume className={styles.volume} shape="tetra" color="var(--color-hold-teal)" holds={["var(--color-primary)", "var(--color-hold-yellow)"]} size={190} rotate={-6} />
      <Hold className={styles.h6} shape={4} color="var(--color-hold-yellow)" size={46} rotate={30} />
    </div>
  );
}
