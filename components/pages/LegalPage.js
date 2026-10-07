import { CONTACT_EMAIL, LEGAL_UPDATED } from "@/lib/site";
import styles from "./LegalPage.module.css";

// Shared layout for Terms and Privacy: title, "last updated", then numbered sections.
// Used by both design versions (each wraps it in its own header/footer and fonts).
export default function LegalPage({ title, intro, children }) {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.updated}>Last updated {LEGAL_UPDATED} · Draft</p>
        <h1 className={styles.title}>{title}</h1>
        {intro && <p className={styles.intro}>{intro}</p>}
      </header>
      <div className={styles.body}>{children}</div>
    </main>
  );
}

export function Section({ title, children }) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

// How to reach us. Until a contact email is set, says it's coming soon instead of showing a fake address.
export function Contact() {
  return CONTACT_EMAIL ? (
    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
  ) : (
    <span>our contact email (coming soon)</span>
  );
}
