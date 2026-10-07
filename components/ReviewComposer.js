"use client";

import { startTransition, useEffect, useRef, useState, ViewTransition } from "react";
import Glyph from "./Glyph";
import RatingInput from "./RatingInput";
import { categoryColor, RATING_FIELDS } from "@/lib/gymDisplay";
import { AMENITIES, TAG_LIST } from "@/lib/tags";
import { CLIMBER_QUESTIONS } from "@/lib/climberInfo";
import styles from "./ReviewComposer.module.css";

const EMPTY_RATINGS = { overall: 0, community: 0, setting: 0, value: 0 };

// "Write a review": the button morphs into a review sheet (and back when you close it).
// Both the button and the sheet use the same view-transition name, so the browser animates
// one shape into the other, like iOS sheets growing out of the button that opened them.
export default function ReviewComposer({ gym, label = "Write a review", className = "" }) {
  const [open, setOpen] = useState(false);
  const [ratings, setRatings] = useState(EMPTY_RATINGS);
  const [tags, setTags] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [body, setBody] = useState("");
  const [climber, setClimber] = useState({}); // optional "About you" answers
  const [notice, setNotice] = useState("");
  const sheetRef = useRef(null);
  const name = `review-composer-${gym.slug}`;

  const openSheet = () => startTransition(() => setOpen(true));
  const closeSheet = () => startTransition(() => setOpen(false));

  // While open: Escape closes it, focus moves into the sheet, and the page behind doesn't scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && closeSheet();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    sheetRef.current?.querySelector("input, button, textarea")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Pick-one categories (Grading, Setting frequency) swap the old pick for the new one
  function toggleTag(category, label, pickOne) {
    setTags((prev) => {
      if (prev.includes(label)) return prev.filter((t) => t !== label);
      if (!pickOne) return [...prev, label];
      const others = TAG_LIST.find((g) => g.category === category).labels;
      return [...prev.filter((t) => !others.includes(t)), label];
    });
  }

  // Tap an answer to pick it, tap it again to clear it (everything here is optional)
  const pickClimber = (key, option) =>
    setClimber((prev) => ({ ...prev, [key]: prev[key] === option ? undefined : option }));

  const toggleAmenity = (a) =>
    setAmenities((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));

  const ready = Object.values(ratings).every((v) => v > 0);

  function handleSubmit(e) {
    e.preventDefault();
    // No accounts or database yet: the form works, but posting comes with sign-in.
    setNotice("Posting reviews comes with sign-in, which is next on the build list. Your answers aren't saved yet.");
  }

  if (!open) {
    return (
      <ViewTransition name={name} share="morph" default="none">
        <button type="button" className={`${styles.trigger} ${className}`} onClick={openSheet}>
          {label}
        </button>
      </ViewTransition>
    );
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={closeSheet} aria-hidden="true" />
      <ViewTransition name={name} share="morph" default="none">
        <form
          ref={sheetRef}
          className={styles.sheet}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${name}-title`}
          onSubmit={handleSubmit}
        >
          <header className={styles.head}>
            <div>
              <p className={styles.eyebrow}>Write a review</p>
              <h2 id={`${name}-title`} className={styles.title}>{gym.name}</h2>
            </div>
            <button type="button" className={styles.close} onClick={closeSheet} aria-label="Close">
              ×
            </button>
          </header>

          <div className={styles.scroll}>
            {/* 1. Ratings */}
            <section className={styles.section}>
              <h3>Rate it</h3>
              {RATING_FIELDS.map((f) => (
                <RatingInput
                  key={f.key}
                  name={`${name}-${f.key}`}
                  label={f.label}
                  hint={f.hint}
                  value={ratings[f.key]}
                  onChange={(v) => setRatings((r) => ({ ...r, [f.key]: v }))}
                />
              ))}
            </section>

            {/* 2. Tags */}
            <section className={styles.section}>
              <h3>What&apos;s it like?</h3>
              {TAG_LIST.map((group) => (
                <div key={group.category} className={styles.tagGroup}>
                  <p className={styles.groupLabel}>
                    <span className={styles.badge} style={{ background: categoryColor(group.category) }}>
                      <Glyph category={group.category} size={12} />
                    </span>
                    {group.category}
                    {group.pickOne && <span className={styles.pickOne}>pick one</span>}
                  </p>
                  <div className={styles.chips}>
                    {group.labels.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        className={styles.chip}
                        aria-pressed={tags.includes(tag)}
                        onClick={() => toggleTag(group.category, tag, group.pickOne)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* 3. Amenities */}
            <section className={styles.section}>
              <h3>What does it have?</h3>
              <div className={styles.chips}>
                {AMENITIES.map((a) => (
                  <button key={a} type="button" className={styles.chip} aria-pressed={amenities.includes(a)} onClick={() => toggleAmenity(a)}>
                    {a}
                  </button>
                ))}
              </div>
            </section>

            {/* 4. About you: optional, collapsed by default so the form stays short */}
            <section className={styles.section}>
              <details className={styles.about}>
                <summary className={styles.aboutSummary}>
                  <span>
                    <span className={styles.aboutTitle}>About you</span>{" "}
                    <span className={styles.optional}>Optional</span>
                  </span>
                  <span className={styles.aboutHint}>
                    Helps others read your review, like what grade you climb. Shown on your review; skip anything.
                  </span>
                </summary>
                <div className={styles.aboutBody}>
                  {CLIMBER_QUESTIONS.map((q) => (
                    <div key={q.key} className={styles.tagGroup}>
                      <p className={styles.groupLabel}>
                        {q.label}
                        {q.hint && <span className={styles.pickOne}>{q.hint}</span>}
                      </p>
                      <div className={styles.chips}>
                        {q.options.map((option) => (
                          <button
                            key={option}
                            type="button"
                            className={styles.chip}
                            aria-pressed={climber[q.key] === option}
                            onClick={() => pickClimber(q.key, option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            </section>

            {/* 5. Written review */}
            <section className={styles.section}>
              <h3>
                <label htmlFor={`${name}-body`}>Anything else? <span className={styles.optional}>Optional</span></label>
              </h3>
              <textarea
                id={`${name}-body`}
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="What should other climbers know?"
              />
            </section>
          </div>

          <footer className={styles.foot}>
            {notice && <p className={styles.notice} role="status">{notice}</p>}
            <div className={styles.actions}>
              <button type="button" className={styles.cancel} onClick={closeSheet}>
                Cancel
              </button>
              <button type="submit" className={styles.post} disabled={!ready} title={ready ? "" : "Add all four ratings first"}>
                Post review
              </button>
            </div>
          </footer>
        </form>
      </ViewTransition>
    </div>
  );
}
