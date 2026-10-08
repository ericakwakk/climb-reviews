import RouteWall from "../illustrations/RouteWall";
import styles from "./RockWall.module.css";

const PALETTE = {
  pink: "var(--zine-pink)",
  yellow: "var(--zine-yellow)",
  teal: "var(--zine-green)",
  purple: "var(--zine-purple)",
  orange: "var(--zine-orange)",
  blue: "var(--zine-blue)",
};

// The top of version B's home page: a sculpted rock wall with real routes set on it, printed in riso inks.
// Whatever you put inside (the search panel) sits on top, on the left.
export default function RockWall({ children }) {
  return (
    <section className={styles.wall}>
      <div className={styles.art} aria-hidden="true">
        <RouteWall
          className={styles.routes}
          palette={PALETTE}
          ink="var(--zine-ink)"
          paper="var(--zine-paper)"
          printed
        />
      </div>

      <div className={styles.content}>{children}</div>
    </section>
  );
}
