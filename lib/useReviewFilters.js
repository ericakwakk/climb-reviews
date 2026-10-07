"use client";

import { startTransition, useMemo, useState } from "react";

// Climbing words to look for in review text, like Google Maps' "people often mention" chips.
// Each topic lists the words that count as mentioning it.
// A topic can also cover related tags, so "Beginners" and the "Beginner-friendly" tag become one chip.
const TEXT_TOPICS = [
  { label: "Kilter board", words: ["kilter"] },
  { label: "Staff", words: ["staff"] },
  { label: "Crowds", words: ["crowd", "busy", "zoo"], tags: ["Packed after work", "Packed on weekends", "Moderately busy"] },
  { label: "Price", words: ["price", "pricey", "expensive", "cheap", "worth"] },
  { label: "Beginners", words: ["beginner", "first time", "never climbed", "intro"], tags: ["Beginner-friendly"] },
  { label: "Training", words: ["train", "hangboard", "spray wall"], tags: ["Training-focused"] },
  { label: "Auto-belay", words: ["auto-belay"] },
  { label: "Kids", words: ["kid", "birthday"], tags: ["Good for kids"] },
];

const COVERED_TAGS = new Set(TEXT_TOPICS.flatMap((t) => t.tags ?? []));

function mentions(review, topic) {
  if (topic.tag) return review.tags.includes(topic.tag);
  const text = review.body.toLowerCase();
  return topic.words.some((w) => text.includes(w)) || (topic.tags ?? []).some((t) => review.tags.includes(t));
}

// State and derived lists for filtering a gym's reviews. Shared by both design versions.
export function useReviewFilters(reviews) {
  const [topic, setTopicState] = useState(null); // the selected topic's label, or null for "All"
  const [query, setQueryState] = useState("");
  const [sort, setSortState] = useState("newest");

  // Topic chips: tags climbers picked + words found in the text, with how many reviews mention each
  const topics = useMemo(() => {
    const fromTags = [...new Set(reviews.flatMap((r) => r.tags))]
      .filter((tag) => !COVERED_TAGS.has(tag)) // already counted by a text topic
      .map((tag) => ({ label: tag, tag }));
    return [...fromTags, ...TEXT_TOPICS]
      .map((t) => ({ ...t, count: reviews.filter((r) => mentions(r, t)).length }))
      .filter((t) => t.count > 0)
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
      .slice(0, 10);
  }, [reviews]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const active = topics.find((t) => t.label === topic);
    const filtered = reviews.filter(
      (r) => (!active || mentions(r, active)) && (!q || r.body.toLowerCase().includes(q))
    );
    return [...filtered].sort((a, b) => {
      if (sort === "highest") return b.ratings.overall - a.ratings.overall || b.date.localeCompare(a.date);
      if (sort === "lowest") return a.ratings.overall - b.ratings.overall || b.date.localeCompare(a.date);
      return b.date.localeCompare(a.date); // newest
    });
  }, [reviews, topics, topic, query, sort]);

  // Wrapped in startTransition so the review list animates when it changes
  const setTopic = (value) => startTransition(() => setTopicState((cur) => (cur === value ? null : value)));
  const setQuery = (value) => startTransition(() => setQueryState(value));
  const setSort = (value) => startTransition(() => setSortState(value));
  const clear = () => startTransition(() => { setTopicState(null); setQueryState(""); });

  return { topics, topic, setTopic, query, setQuery, sort, setSort, results, clear };
}
