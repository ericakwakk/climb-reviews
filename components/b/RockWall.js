import LineHold from "./LineHold";
import Volume from "../illustrations/Volume";
import styles from "./RockWall.module.css";

// The top of version B's home page: a sculpted rock wall with volumes (holds screwed on)
// and loose holds. Whatever you put inside (the search panel) sits on top, on the left.
export default function RockWall({ children }) {
  return (
    <section className={styles.wall}>
      <div className={styles.art} aria-hidden="true">
        <Volume
          className={styles.v1}
          shape="tetra"
          color="var(--zine-orange)"
          holds={["var(--zine-pink)", "var(--zine-yellow)"]}
          ink="var(--zine-ink)"
          printed
          size={230}
          rotate={-4}
        />
        <Volume
          className={styles.v2}
          shape="kite"
          color="var(--zine-purple)"
          holds={["var(--zine-green)"]}
          ink="var(--zine-ink)"
          printed
          size={180}
          rotate={8}
        />
        <Volume
          className={styles.v3}
          shape="fin"
          color="var(--zine-green)"
          holds={["var(--zine-blue)", "var(--zine-pink)"]}
          ink="var(--zine-ink)"
          printed
          size={200}
          rotate={-10}
        />
        <LineHold className={styles.h1} shape={0} color="var(--zine-pink)" size={100} rotate={-12} />
        <LineHold className={styles.h2} shape={3} color="var(--zine-yellow)" size={60} rotate={18} />
        <LineHold className={styles.h3} shape={5} color="var(--zine-blue)" size={84} rotate={-28} />
        <LineHold className={styles.h4} shape={1} color="var(--zine-orange)" size={64} rotate={30} />
      </div>

      <div className={styles.content}>{children}</div>
    </section>
  );
}
