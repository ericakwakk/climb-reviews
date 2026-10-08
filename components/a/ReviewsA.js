"use client";

import { ViewTransition } from "react";
import ReviewCard from "@/components/ReviewCard";
import { useReviewFilters } from "@/lib/useReviewFilters";
import styles from "./ReviewsA.module.css";

// Reviews with Google Maps-style topic chips, a search box and sorting.
export default function ReviewsA({ reviews }) {
  const { topics, topic, setTopic, query, setQuery, sort, setSort, results, clear } = useReviewFilters(reviews);

  return (
    <div className={styles.reviews}>
      <div className={styles.tools}>
        {/* Topic chips: what reviews mention most, with counts */}
        <div className={styles.topics} role="group" aria-label="Filter reviews by topic">
          <button type="button" className={styles.topic} aria-pressed={topic === null} onClick={() => topic && setTopic(topic)}>
            All <span>{reviews.length}</span>
          </button>
          {topics.map((t) => (
            <button
              key={t.label}
              type="button"
              className={styles.topic}
              aria-pressed={topic === t.label}
              onClick={() => setTopic(t.label)}
            >
              {t.label} <span>{t.count}</span>
            </button>
          ))}
        </div>

        <div className={styles.row}>
          <label className={styles.search}>
            <span className={styles.srOnly}>Search reviews</span>
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <path d="M16.5 16.5 L21 21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <input type="search" autoComplete="off" placeholder="Search reviews" value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
          <label className={styles.sort}>
            <span className={styles.srOnly}>Sort reviews</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="highest">Highest rated</option>
              <option value="lowest">Lowest rated</option>
            </select>
          </label>
        </div>
      </div>

      {results.length > 0 ? (
        <div>
          {results.map((review) => (
            <ViewTransition
              key={review.id}
              name={`review-${review.id}`}
              enter={{ "nav-forward": "none", "nav-back": "none", default: "gym-enter" }}
              exit={{ "nav-forward": "none", "nav-back": "none", default: "gym-exit" }}
              update={{ "nav-forward": "none", "nav-back": "none", default: "auto" }}
              default="none"
            >
              <div>
                <ReviewCard review={review} />
              </div>
            </ViewTransition>
          ))}
        </div>
      ) : (
        <p className={styles.empty}>
          No reviews match.{" "}
          <button type="button" onClick={clear}>
            Show all reviews
          </button>
        </p>
      )}
    </div>
  );
}
