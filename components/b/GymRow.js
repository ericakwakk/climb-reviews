import Link from "next/link";
import { ViewTransition } from "react";
import StarRating from "../StarRating";
import ZineTag from "./ZineTag";
import { TYPE_LABELS, dayPassLabel, topTags } from "@/lib/gymDisplay";
import { storyFor } from "@/lib/closedGyms";
import styles from "./GymRow.module.css";

// One gym as a row in the list (in no particular order, so no numbers). Closed gyms show in black and white.
export default function GymRow({ gym }) {
  const hasReviews = gym.reviewCount > 0;
  const closed = gym.status === "closed";
  const story = closed ? storyFor(gym) : null;

  return (
    <Link
      href={`/b/gyms/${gym.slug}`}
      transitionTypes={["nav-forward"]}
      className={`${styles.row} ${closed ? styles.closed : ""}`}
    >
      <div className={styles.title}>
        <ViewTransition name={`gym-name-${gym.slug}`} share="morph" default="none">
          <h3 className={styles.name}>{gym.name}</h3>
        </ViewTransition>
        <p className="mono">
          {gym.neighborhood}, {gym.city} · {closed ? `Closed · ${story.years}` : `${TYPE_LABELS[gym.type]} · ${dayPassLabel(gym)}`}
        </p>
      </div>

      {closed ? (
        <p className={styles.closedText}>
          {story.cardLine}. <span className="mono">{story.closedOn} · Read its story</span>
        </p>
      ) : hasReviews ? (
        <>
          <div className={styles.tags}>
            {topTags(gym.tags, 3).map((tag) => (
              <ZineTag key={tag.label} label={tag.label} category={tag.category} />
            ))}
          </div>

          {/* Just the overall rating here; the full breakdown is on the gym page */}
          <div className={styles.scores}>
            <StarRating value={gym.ratings.overall} color="var(--zine-pink)" ink="var(--zine-ink)" size={17} />
            <span className="mono">{gym.reviewCount} reviews</span>
          </div>
        </>
      ) : (
        <p className={`mono ${styles.empty}`}>No reviews yet — be the first</p>
      )}

      <span className={styles.arrow} aria-hidden="true">→</span>
    </Link>
  );
}
