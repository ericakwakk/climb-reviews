import Link from "next/link";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.name}>Name TBD</p>
        <nav className={styles.links} aria-label="Footer">
          <Link href="/about">About</Link>
          <Link href="/submit">Suggest a gym</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
        {/* Required credit: gym locations come from OpenStreetMap */}
        <p className={styles.credit}>
          Gym locations © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>
        </p>
      </div>
    </footer>
  );
}
