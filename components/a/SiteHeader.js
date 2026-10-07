import Link from "next/link";
import Hold from "../illustrations/Hold";
import styles from "./SiteHeader.module.css";

export default function SiteHeader() {
  return (
    <header className={styles.header} style={{ viewTransitionName: "site-header" }}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <Hold shape={4} size={34} rotate={-12} />
          {/* Placeholder until the product is named */}
          <span>Name TBD</span>
        </Link>
        <nav className={styles.nav} aria-label="Main">
          <Link href="/about" className={styles.navLink}>About</Link>
          <Link href="/saved" className={styles.navLink}>Saved</Link>
          <Link href="/login" className={styles.navLink}>Log in</Link>
          <Link href="/login" className={styles.signup}>Sign up</Link>
        </nav>
      </div>
    </header>
  );
}
