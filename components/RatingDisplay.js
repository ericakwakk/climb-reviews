import styles from "./RatingDisplay.module.css";

// One rating out of 5: label, optional hint, number, and a fill bar.
// highlight = the community rating, shown big and pink.
export default function RatingDisplay({ label, hint, value, highlight = false }) {
  const percent = (value / 5) * 100;

  return (
    <div className={`${styles.rating} ${highlight ? styles.highlight : ""}`}>
      <div className={styles.top}>
        <div>
          <p className={styles.label}>{label}</p>
          {hint && <p className={styles.hint}>{hint}</p>}
        </div>
        <p className={styles.value}>
          {value.toFixed(1)}
          <span>/5</span>
        </p>
      </div>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
