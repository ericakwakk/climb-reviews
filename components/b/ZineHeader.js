import Link from "next/link";
import styles from "./ZineHeader.module.css";

export default function ZineHeader() {
  return (
    <header className={styles.header} style={{ viewTransitionName: "site-header" }}>
      <Link href="/b" className={styles.wordmark}>
        Name TBD
      </Link>
      <nav className={`mono ${styles.nav}`} aria-label="Main">
        <Link href="/b/saved">Saved</Link>
        <Link href="/b/login">Log in</Link>
        <Link href="/b/login" className={styles.signup}>Sign up</Link>
      </nav>
    </header>
  );
}
