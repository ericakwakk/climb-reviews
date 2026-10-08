"use client";

import Link from "next/link";
import { startTransition, useState, ViewTransition } from "react";
import FilterDropdown from "@/components/FilterDropdown";
import GymRow from "@/components/b/GymRow";
import GymsMap from "@/components/GymsMap";
import RockWall from "@/components/b/RockWall";
import { ListIcon, MapIcon } from "@/components/icons";
import { PRICE_RANGES, SORT_OPTIONS } from "@/lib/gymDisplay";
import { FILTER_GROUPS } from "@/lib/tags";
import { useGymFilters } from "@/lib/useGymFilters";
import { zineCategoryColor } from "@/lib/zineColors";
import styles from "./HomeB.module.css";

// Version B home page, interactive part: same filter logic as version A, zine styling.
export default function HomeB({ gyms }) {
  const { query, setQuery, selected, toggle, clearAll, sort, setSort, results, active, openCount } =
    useGymFilters(gyms);
  const [view, setView] = useState("list"); // "list" or "map"
  const switchView = (v) => startTransition(() => setView(v));

  return (
    <main id="main">
      {/* ---------- Top: search panel sitting on the rock wall ---------- */}
      <RockWall>
        <div className={styles.panel}>
          <h1 className={styles.title}>Find a climbing gym</h1>
          <p className={styles.lede}>Rated and reviewed by climbers: grading, setting, community, value, and price.</p>

          {/* Search filters as you type; Enter jumps down to the results */}
          <form
            className={styles.search}
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <label htmlFor="search-b" className={styles.srOnly}>Search gyms</label>
            <input
              id="search-b"
              name="q"
              type="search"
              autoComplete="off" // no browser search history dropdown
              placeholder="Gym or city"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="mono">Search&nbsp;<span aria-hidden="true">→</span></button>
          </form>
        </div>
      </RockWall>

      {/* ---------- Gym list ---------- */}
      <section className={styles.list} id="results">
        <div className={styles.filters}>
          {FILTER_GROUPS.map((group) => (
            <FilterDropdown
              key={group.category}
              category={group.category}
              options={group.options}
              color={zineCategoryColor(group.category)}
              selected={selected[group.category] ?? []}
              onToggle={toggle}
            />
          ))}
          <FilterDropdown
            category="Price"
            options={PRICE_RANGES}
            color="var(--zine-pink)"
            selected={selected.Price ?? []}
            onToggle={toggle}
          />
        </div>

        {/* Active filters as removable chips */}
        {(active.length > 0 || query) && (
          <div className={styles.activeRow}>
            {query && (
              <button type="button" className={`mono ${styles.chip}`} onClick={() => setQuery("")}>
                “{query}” ×
              </button>
            )}
            {active.map(({ category, value }) => (
              <button key={`${category}-${value}`} type="button" className={`mono ${styles.chip}`} onClick={() => toggle(category, value)}>
                {value} ×
              </button>
            ))}
            <button type="button" className={`mono ${styles.clearAll}`} onClick={clearAll}>
              Clear all
            </button>
          </div>
        )}

        <div className={styles.listHead}>
          <h2 className={styles.listTitle}>New York City</h2>
          <div className={styles.rightControls}>
            <p className="mono" aria-live="polite">
              {openCount} {openCount === 1 ? "gym" : "gyms"}
            </p>
            <label className={`mono ${styles.sort}`}>
              Sort
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
            {/* List / Map toggle */}
            <div className={styles.toggle} role="group" aria-label="View">
              <button type="button" aria-pressed={view === "list"} aria-label="List view" title="List view" onClick={() => switchView("list")}>
                <ListIcon />
              </button>
              <button type="button" aria-pressed={view === "map"} aria-label="Map view" title="Map view" onClick={() => switchView("map")}>
                <MapIcon />
              </button>
            </div>
          </div>
        </div>

        {view === "map" ? (
          <div className={styles.mapWrap}>
            <GymsMap gyms={results} hrefFor={(slug) => `/b/gyms/${slug}`} />
          </div>
        ) : results.length > 0 ? (
          <div className={styles.rows}>
            {results.map((gym) => (
              <ViewTransition
                key={gym.slug}
                name={`gym-item-${gym.slug}`}
                enter={{ "nav-forward": "none", "nav-back": "none", default: "gym-enter" }}
                exit={{ "nav-forward": "none", "nav-back": "none", default: "gym-exit" }}
                update={{ "nav-forward": "none", "nav-back": "none", default: "auto" }}
                default="none"
              >
                <div>
                  <GymRow gym={gym} />
                </div>
              </ViewTransition>
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <p className={styles.noResultsTitle}>No gyms match</p>
            <p>Try removing a filter or two.</p>
            <button type="button" className={`mono ${styles.clearAll}`} onClick={clearAll}>
              Clear all filters
            </button>
          </div>
        )}

        {/* ---------- Missing a gym? ---------- */}
        <Link href="/b/submit" className={styles.suggest}>
          <span className={styles.suggestBig}>Missing a gym?</span>
          <span className="mono">Suggest one and we&apos;ll add it&nbsp;<span aria-hidden="true">→</span></span>
        </Link>
      </section>
    </main>
  );
}
