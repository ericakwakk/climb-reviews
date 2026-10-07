import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/site";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.name}>Name TBD</p>
        <nav className={styles.links} aria-label="Footer">
          <Link href="/saved">Saved gyms</Link>
          <Link href="/submit">Suggest a gym</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          {CONTACT_EMAIL && <a href={`mailto:${CONTACT_EMAIL}`}>Contact</a>}
        </nav>
        {/* Required credit: gym locations come from OpenStreetMap */}
        <p className={styles.credit}>
          Gym locations © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>
        </p>
      </div>
    </footer>
  );
}
