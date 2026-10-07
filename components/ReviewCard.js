import Tag from "./Tag";
import { formatDate } from "@/lib/gymDisplay";
import { categoryOf } from "@/lib/tags";
import { climberSummary } from "@/lib/climberInfo";
import styles from "./ReviewCard.module.css";

// One climber's review: who, when, their four scores (overall first), what they wrote, and the tags they picked.
// If they shared optional "About you" info (grade, height...), it shows under their name.
export default function ReviewCard({ review }) {
  const { overall, setting, value, community } = review.ratings;
  const about = climberSummary(review.climber);

  return (
    <article className={styles.review}>
      <header className={styles.header}>
        <span className={styles.avatar} aria-hidden="true">
          {review.author[0]}
        </span>
        <div>
          <p className={styles.author}>{review.author}</p>
          <p className={styles.date}>{formatDate(review.date)}</p>
          {about && <p className={styles.about}>{about}</p>}
        </div>
      </header>

      <dl className={styles.scores}>
        <div className={styles.overall}><dt>Overall</dt><dd>{overall}</dd></div>
        <div><dt>Community</dt><dd>{community}</dd></div>
        <div><dt>Setting</dt><dd>{setting}</dd></div>
        <div><dt>Value</dt><dd>{value}</dd></div>
      </dl>

      <p className={styles.body}>{review.body}</p>

      <div className={styles.tags}>
        {review.tags.map((label) => (
          <Tag key={label} label={label} category={categoryOf(label)} />
        ))}
      </div>
    </article>
  );
}
