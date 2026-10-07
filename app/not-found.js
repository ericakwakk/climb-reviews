import Link from "next/link";
import Hold from "@/components/illustrations/Hold";
import styles from "./not-found.module.css";

export const metadata = { title: "Page not found · Name TBD" };

// Shown for any address that doesn't exist (including a gym that isn't in the list).
export default function NotFound() {
  return (
    <main className={styles.page}>
      <Hold shape={3} color="var(--color-hold-yellow)" size={96} rotate={-14} />
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Off route</h1>
      <p className={styles.text}>That page doesn&apos;t exist, or it moved. Let&apos;s get you back on the wall.</p>
      <Link href="/" className={styles.link}>
        Find a climbing gym
      </Link>
    </main>
  );
}
