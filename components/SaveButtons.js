"use client";

import { useEffect, useState } from "react";
import styles from "./SaveButtons.module.css";

const HEART = <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />;

// "Want to go" and "Been here" are two stages of the same thing, so they're one two-part switch:
// picking one unpicks the other (visiting a gym moves it off your to-go list), and tapping the
// picked one again clears it (it can't be a toggle switch, because "neither" is a valid state).
// Favorite is a feeling, not a stage, so it's separate.
const STAGES = [
  { key: "want_to_visit", label: "Want to go", icon: <path d="M4.5 3h15v18l-7.5-4.5-7.5 4.5z" /> },
  { key: "visited", label: "Been here", icon: <path d="M5 12.5l4.5 4.5L19 7" /> },
];

const STORAGE_KEY = "saved-gyms"; // { [slug]: ["favorite", "visited", ...] }

function readSaved() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {}; // private browsing or blocked storage: start empty
  }
}

// Until there are accounts, choices are kept in this browser (localStorage) so they survive a
// refresh. They'll move to the saved_gyms table with sign-in.
export default function SaveButtons({ slug }) {
  const [saved, setSaved] = useState([]);

  // Read what's saved after the page loads (localStorage only exists in the browser)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from browser storage on mount
    setSaved(readSaved()[slug] ?? []);
  }, [slug]);

  function save(next) {
    setSaved(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...readSaved(), [slug]: next }));
    } catch {
      // storage unavailable: the toggle still works for this visit
    }
  }

  const has = (key) => saved.includes(key);
  const toggleFavorite = () => save(has("favorite") ? saved.filter((k) => k !== "favorite") : [...saved, "favorite"]);
  const pickStage = (key) => {
    const others = saved.filter((k) => !STAGES.some((s) => s.key === k));
    save(has(key) ? others : [...others, key]);
  };

  const favorite = has("favorite");

  return (
    <div className={styles.saves}>
      {/* The label itself carries the state ("Favorited"), so no aria-pressed here */}
      <button type="button" className={styles.save} data-on={favorite} onClick={toggleFavorite}>
        <Icon filled={favorite}>{HEART}</Icon>
        {favorite ? "Favorited" : "Favorite"}
      </button>

      <div className={styles.switch} role="group" aria-label="Your visits">
        {STAGES.map((stage) => {
          const on = has(stage.key);
          return (
            <button
              key={stage.key}
              type="button"
              className={styles.segment}
              data-on={on}
              aria-pressed={on}
              onClick={() => pickStage(stage.key)}
            >
              <Icon filled={on && stage.key !== "visited"}>{stage.icon}</Icon>
              {stage.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Icon({ filled, children }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
      <g fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}
