"use client";

import { useState } from "react";
import styles from "./RatingInput.module.css";

const STAR = "M12 2.6l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z";

// Pick 1–5 stars. Under the hood it's a group of radio buttons, so it works with a keyboard
// (Tab to it, arrow keys to change) and screen readers, not just mouse clicks.
export default function RatingInput({ name, label, hint, value, onChange }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  return (
    <fieldset className={styles.rating} onMouseLeave={() => setHover(0)}>
      <legend className={styles.legend}>
        <span className={styles.label}>{label}</span>
        {hint && <span className={styles.hint}>{hint}</span>}
      </legend>
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((n) => (
          <label key={n} className={styles.star} onMouseEnter={() => setHover(n)}>
            <input
              type="radio"
              name={name}
              value={n}
              checked={value === n}
              onChange={() => onChange(n)}
              className={styles.radio}
            />
            <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true">
              <path d={STAR} className={n <= shown ? styles.filled : styles.empty} />
            </svg>
            <span className={styles.srOnly}>
              {n} {n === 1 ? "star" : "stars"}
            </span>
          </label>
        ))}
        <span className={styles.value}>{value ? `${value}/5` : "–"}</span>
      </div>
    </fieldset>
  );
}
