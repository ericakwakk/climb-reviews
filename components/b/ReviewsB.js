"use client";

import { ViewTransition } from "react";
import ZineTag from "./ZineTag";
import { formatDate } from "@/lib/gymDisplay";
import { categoryOf } from "@/lib/tags";
import { useReviewFilters } from "@/lib/useReviewFilters";
import { climberSummary } from "@/lib/climberInfo";
import styles from "./ReviewsB.module.css";

// Version B reviews: zine pull quotes, with Google Maps-style topic chips, search and sort.
export default function ReviewsB({ reviews }) {
  const { topics, topic, setTopic, query, setQuery, sort, setSort, results, clear } = useReviewFilters(reviews);

  return (
    <div>
      <div className={styles.tools}>
        <div className={styles.topics} role="group" aria-label="Filter reviews by topic">
          <button type="button" className={`mono ${styles.topic}`} aria-pressed={topic === null} onClick={() => topic && setTopic(topic)}>
            All <sup>{reviews.length}</sup>
          </button>
          {topics.map((t) => (
            <button
              key={t.label}
              type="button"
              className={`mono ${styles.topic}`}
              aria-pressed={topic === t.label}
              onClick={() => setTopic(t.label)}
            >
              {t.label} <sup>{t.count}</sup>
            </button>
          ))}
        </div>
        <div className={styles.row}>
          <label className={styles.search}>
            <span className={styles.srOnly}>Search reviews</span>
            <input type="search" autoComplete="off" placeholder="Search reviews" value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
          <label className={`mono ${styles.sort}`}>
            Sort
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="highest">Highest rated</option>
              <option value="lowest">Lowest rated</option>
            </select>
          </label>
        </div>
      </div>

      {results.length > 0 ? (
        results.map((review) => (
          <ViewTransition
            key={review.id}
            name={`review-${review.id}`}
            enter={{ "nav-forward": "none", "nav-back": "none", default: "gym-enter" }}
            exit={{ "nav-forward": "none", "nav-back": "none", default: "gym-exit" }}
            update={{ "nav-forward": "none", "nav-back": "none", default: "auto" }}
            default="none"
          >
            <article className={styles.review}>
              <span className={styles.quoteMark} aria-hidden="true">“</span>
              <p className={styles.reviewBody}>{review.body}</p>
              <p className="mono">
                — {review.author}, {formatDate(review.date)}
              </p>
              {review.climber && <p className={`mono ${styles.about}`}>{climberSummary(review.climber)}</p>}
              <p className={`mono ${styles.reviewScores}`}>
                <span className={styles.reviewOverall}>Overall {review.ratings.overall}</span>
                Community {review.ratings.community} · Setting {review.ratings.setting} · Value {review.ratings.value}
              </p>
              <div className={styles.reviewTags}>
                {review.tags.map((label) => (
                  <ZineTag key={label} label={label} category={categoryOf(label)} />
                ))}
              </div>
            </article>
          </ViewTransition>
        ))
      ) : (
        <p className={`mono ${styles.empty}`}>
          No reviews match ·{" "}
          <button type="button" onClick={clear}>
            Show all
          </button>
        </p>
      )}
    </div>
  );
}
