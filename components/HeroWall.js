import RouteWall from "./illustrations/RouteWall";
import styles from "./HeroWall.module.css";

const PALETTE = {
  pink: "var(--color-primary)",
  yellow: "var(--color-hold-yellow)",
  teal: "var(--color-hold-teal)",
  purple: "var(--color-hold-purple)",
  orange: "var(--color-hold-orange)",
  blue: "var(--color-hold-blue)",
};

// The home page illustration: a section of a plywood gym wall with real routes set on it.
export default function HeroWall() {
  return (
    <div className={styles.wall} aria-hidden="true">
      <RouteWall className={styles.art} palette={PALETTE} grid />
    </div>
  );
}
