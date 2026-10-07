"use client";

import { useState } from "react";
import styles from "./Forms.module.css";

const TYPES = [
  { value: "bouldering", label: "Bouldering" },
  { value: "ropes", label: "Ropes" },
  { value: "both", label: "Both" },
  { value: "unsure", label: "Not sure" },
];

// "Missing a gym?" form. Suggestions will go into the gym_submissions table for review, never straight onto the site.
// The form works up to submitting; saving needs the database (next step).
export default function SubmitForm() {
  const [form, setForm] = useState({ name: "", location: "", website: "", type: "", notes: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((errs) => ({ ...errs, [key]: undefined }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Add the gym's name.";
    if (!form.location.trim()) next.location = "Add an address, or at least the neighborhood and city.";
    if (form.website && !/^https?:\/\/.+\..+/.test(form.website.trim()))
      next.website = "Start the link with http:// or https://";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  }

  if (sent) {
    return (
      <main className={styles.page}>
        <div className={styles.card}>
          <h1 className={styles.title}>Thanks for the suggestion</h1>
          <p className={styles.lede}>
            Saving suggestions needs the database, which is being connected next, so this one wasn&apos;t sent
            yet. Once it&apos;s live, every suggestion gets checked before the gym appears on the site.
          </p>
          <button type="button" className={styles.secondary} onClick={() => setSent(false)}>
            Back to the form
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Suggest a gym</h1>
        <p className={styles.lede}>
          Know a climbing gym we&apos;re missing? Tell us about it. We check every suggestion before adding it.
        </p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label className={styles.field}>
            <span className={styles.label}>Gym name <span className={styles.required}>Required</span></span>
            <input value={form.name} onChange={update("name")} aria-invalid={!!errors.name} />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Address <span className={styles.required}>Required</span></span>
            <input
              value={form.location}
              onChange={update("location")}
              placeholder="Street address, or neighborhood and city"
              aria-invalid={!!errors.location}
            />
            {errors.location && <span className={styles.error}>{errors.location}</span>}
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Website <span className={styles.optional}>Optional</span></span>
            <input type="url" value={form.website} onChange={update("website")} placeholder="https://" aria-invalid={!!errors.website} />
            {errors.website && <span className={styles.error}>{errors.website}</span>}
          </label>

          <fieldset className={styles.field}>
            <legend className={styles.label}>Type of climbing <span className={styles.optional}>Optional</span></legend>
            <div className={styles.choices}>
              {TYPES.map((t) => (
                <label key={t.value} className={styles.choice}>
                  <input type="radio" name="type" value={t.value} checked={form.type === t.value} onChange={update("type")} />
                  {t.label}
                </label>
              ))}
            </div>
          </fieldset>

          <label className={styles.field}>
            <span className={styles.label}>Anything else? <span className={styles.optional}>Optional</span></span>
            <textarea rows={4} value={form.notes} onChange={update("notes")} placeholder="Opening date, what makes it special..." />
          </label>

          <button type="submit" className={styles.primary}>
            Send suggestion
          </button>
        </form>
      </div>
    </main>
  );
}
