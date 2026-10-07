import Link from "next/link";
import { ViewTransition } from "react";
import StarRating from "./StarRating";
import Tag from "./Tag";
import { TYPE_LABELS, dayPassLabel, topTags } from "@/lib/gymDisplay";
import { storyFor } from "@/lib/closedGyms";
import styles from "./GymCard.module.css";

// One gym in the list. The whole card links to the gym's page.
// No image: the hero illustration is the page's one plywood moment, so cards stay text-first.
export default function GymCard({ gym }) {
  const hasReviews = gym.reviewCount > 0;
  const closed = gym.status === "closed";
  const story = closed ? storyFor(gym) : null;

  return (
    <Link
      href={`/gyms/${gym.slug}`}
      transitionTypes={["nav-forward"]}
      className={`${styles.card} ${closed ? styles.closed : ""}`}
    >
      <div className={styles.top}>
        <span className={styles.type}>{closed ? `Closed · ${story.years}` : TYPE_LABELS[gym.type]}</span>
        {/* Same name as the gym page title, so the name morphs from card to page */}
        <ViewTransition name={`gym-name-${gym.slug}`} share="morph" default="none">
          <h3 className={styles.name}>{gym.name}</h3>
        </ViewTransition>
        <p className={styles.place}>
          {gym.neighborhood} · {gym.city}
          {/* Day pass price: the number people compare when picking their next gym */}
          {!closed && (
            <>
              {" · "}
              <span className={styles.price}>{dayPassLabel(gym)}</span>
            </>
          )}
        </p>
      </div>

      {closed ? (
        // Closed gyms: no price or rating, just a line about them and a link to their story
        <p className={styles.closedText}>
          {story.cardLine}. <span>{story.closedOn}. Read its story →</span>
        </p>
      ) : (
        <>
          <div className={styles.scores}>
            {hasReviews ? (
              // Just the overall rating here; the full breakdown is on the gym page
              <>
                <StarRating value={gym.ratings.overall} />
                <span className={styles.count}>({gym.reviewCount})</span>
              </>
            ) : (
              <span className={styles.count}>No reviews yet</span>
            )}
          </div>

          {hasReviews ? (
            <div className={styles.tags}>
              {topTags(gym.tags, 3).map((tag) => (
                <Tag key={tag.label} label={tag.label} category={tag.category} />
              ))}
            </div>
          ) : (
            <p className={styles.empty}>Climbed here? Be the first to review it.</p>
          )}
        </>
      )}
    </Link>
  );
}
