import Link from "next/link";
import styles from "./ZineHeader.module.css";

export default function ZineHeader() {
  return (
    <header className={styles.header} style={{ viewTransitionName: "site-header" }}>
      <Link href="/b" className={styles.wordmark}>
        Name TBD
      </Link>
      <nav className={`mono ${styles.nav}`} aria-label="Main">
        <Link href="/about">About</Link>
        <Link href="/saved">Saved</Link>
        <Link href="/login">Log in</Link>
        <Link href="/login" className={styles.signup}>Sign up</Link>
      </nav>
    </header>
  );
}
