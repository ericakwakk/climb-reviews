import Link from "next/link";
import styles from "./ZineFooter.module.css";

export default function ZineFooter() {
  return (
    <footer className={styles.footer}>
      <p className={styles.big}>Name TBD</p>
      <div className={`mono ${styles.row}`}>
        <nav className={styles.links} aria-label="Footer">
          <Link href="/about">About</Link>
          <Link href="/submit">Suggest a gym</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
        {/* Required credit: gym locations come from OpenStreetMap */}
        <p>
          Gym locations © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>
        </p>
      </div>
    </footer>
  );
}
