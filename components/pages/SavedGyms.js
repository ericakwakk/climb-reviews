"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import GymCard from "@/components/GymCard";
import GymRow from "@/components/b/GymRow";
import styles from "./SavedGyms.module.css";

const LISTS = [
  { key: "favorite", title: "Favorites", empty: "Tap Favorite on a gym's page to keep it here." },
  { key: "want_to_visit", title: "Want to visit", empty: "Tap Want to visit on a gym's page to plan your next session." },
  { key: "visited", title: "Visited", empty: "Tap Visited on a gym's page to keep track of where you've climbed." },
];

// Your three lists of saved gyms. For now they're read from this browser's storage (same place the
// save buttons write to); with sign-in they'll come from the saved_gyms table instead.
export default function SavedGyms({ gyms, variant = "a" }) {
  const [saved, setSaved] = useState(null); // null until we've read storage

  useEffect(() => {
    let data = {};
    try {
      data = JSON.parse(localStorage.getItem("saved-gyms")) ?? {};
    } catch {
      // storage unavailable: show empty lists
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from browser storage on mount
    setSaved(data);
  }, []);

  const base = variant === "b" ? "/b" : "";
  const inList = (key) => (saved ? gyms.filter((g) => saved[g.slug]?.includes(key)) : []);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Saved gyms</h1>
        <p className={styles.note}>
          Saved in this browser for now. Once sign-in is ready, they&apos;ll follow your account to any device.
        </p>
      </header>

      {LISTS.map((list) => {
        const items = inList(list.key);
        return (
          <section key={list.key} className={styles.section}>
            <h2 className={styles.listTitle}>
              {list.title} <span className={styles.count}>{saved ? items.length : ""}</span>
            </h2>
            {items.length > 0 ? (
              variant === "b" ? (
                <div className={styles.rows}>
                  {items.map((gym) => (
                    <GymRow key={gym.slug} gym={gym} />
                  ))}
                </div>
              ) : (
                <ul className={styles.grid}>
                  {items.map((gym) => (
                    <li key={gym.slug}>
                      <GymCard gym={gym} />
                    </li>
                  ))}
                </ul>
              )
            ) : (
              <p className={styles.empty}>
                {list.empty} <Link href={base || "/"}>Browse gyms →</Link>
              </p>
            )}
          </section>
        );
      })}
    </main>
  );
}
