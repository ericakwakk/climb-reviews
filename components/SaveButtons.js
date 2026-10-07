"use client";

import { useEffect, useState } from "react";
import styles from "./SaveButtons.module.css";

const LISTS = [
  {
    key: "favorite",
    label: "Favorite",
    savedLabel: "Favorited",
    icon: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
  },
  {
    key: "want_to_visit",
    label: "Want to visit",
    savedLabel: "Want to visit",
    icon: <path d="M4.5 3h15v18l-7.5-4.5-7.5 4.5z" />, // as wide as the heart and check
  },
  {
    key: "visited",
    label: "Visited",
    savedLabel: "Visited",
    icon: <path d="M5 12.5l4.5 4.5L19 7" />,
  },
];

const STORAGE_KEY = "saved-gyms"; // { [slug]: ["favorite", "visited", ...] }

function readSaved() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {}; // private browsing or blocked storage: start empty
  }
}

// Favorite / Want to visit / Visited toggles. Until there are accounts, choices are kept in this
// browser (localStorage) so they survive a refresh. They'll move to the saved_gyms table with sign-in.
export default function SaveButtons({ slug }) {
  const [saved, setSaved] = useState([]);

  // Read what's saved after the page loads (localStorage only exists in the browser)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from browser storage on mount
    setSaved(readSaved()[slug] ?? []);
  }, [slug]);

  function toggle(key) {
    const next = saved.includes(key) ? saved.filter((k) => k !== key) : [...saved, key];
    setSaved(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...readSaved(), [slug]: next }));
    } catch {
      // storage unavailable: the toggle still works for this visit
    }
  }

  return (
    <div className={styles.saves}>
      {LISTS.map((list) => {
        const on = saved.includes(list.key);
        return (
          <button
            key={list.key}
            type="button"
            className={styles.save}
            aria-pressed={on}
            onClick={() => toggle(list.key)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
              <g fill={on && list.key !== "visited" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                {list.icon}
              </g>
            </svg>
            {on ? list.savedLabel : list.label}
          </button>
        );
      })}
    </div>
  );
}
