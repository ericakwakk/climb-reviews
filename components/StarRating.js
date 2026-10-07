import styles from "./StarRating.module.css";

const STAR = "M12 2.6l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z";

function Stars({ size, fill, stroke }) {
  return (
    <span className={styles.row}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <path d={STAR} fill={fill} stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      ))}
    </span>
  );
}

// Five stars filled to match the rating (e.g. 4.6 fills four and a bit), plus the number.
// Two rows of stars stacked: empty ones underneath, filled ones on top, cut off at the right width.
export default function StarRating({
  value,
  size = 18,
  color = "var(--color-hold-yellow)",
  ink = "var(--color-ink)",
  showNumber = true,
  className = "",
}) {
  const percent = (value / 5) * 100;

  return (
    <span className={`${styles.rating} ${className}`} role="img" aria-label={`${value.toFixed(1)} out of 5 stars`}>
      <span className={styles.stars}>
        <Stars size={size} fill="none" stroke={ink} />
        <span className={styles.filled} style={{ width: `${percent}%` }}>
          <Stars size={size} fill={color} stroke={ink} />
        </span>
      </span>
      {showNumber && <span className={styles.number}>{value.toFixed(1)}</span>}
    </span>
  );
}
