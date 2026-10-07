import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/site";
import styles from "./ZineFooter.module.css";

export default function ZineFooter() {
  return (
    <footer className={styles.footer}>
      <p className={styles.big}>Name TBD</p>
      <div className={`mono ${styles.row}`}>
        <nav className={styles.links} aria-label="Footer">
          <Link href="/b/saved">Saved gyms</Link>
          <Link href="/b/submit">Suggest a gym</Link>
          <Link href="/b/terms">Terms</Link>
          <Link href="/b/privacy">Privacy</Link>
          {CONTACT_EMAIL && <a href={`mailto:${CONTACT_EMAIL}`}>Contact</a>}
        </nav>
        {/* Required credit: gym locations come from OpenStreetMap */}
        <p>
          Gym locations © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>
        </p>
      </div>
    </footer>
  );
}
