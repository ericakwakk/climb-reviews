"use client";

import Link from "next/link";
import { startTransition, useState, ViewTransition } from "react";
import FilterDropdown from "@/components/FilterDropdown";
import GymCard from "@/components/GymCard";
import GymsMap from "@/components/GymsMap";
import HeroWall from "@/components/HeroWall";
import Carabiner from "@/components/illustrations/Carabiner";
import { GridIcon, MapIcon } from "@/components/icons";
import { PRICE_RANGES, SORT_OPTIONS, categoryColor } from "@/lib/gymDisplay";
import { FILTER_GROUPS } from "@/lib/tags";
import { useGymFilters } from "@/lib/useGymFilters";
import styles from "./HomeA.module.css";

// Version A home page, interactive part: search, filters and sort narrow down the gym list.
export default function HomeA({ gyms }) {
  const { query, setQuery, selected, toggle, clearAll, sort, setSort, results, active, openCount } =
    useGymFilters(gyms);
  const [view, setView] = useState("cards"); // "cards" or "map"
  const switchView = (v) => startTransition(() => setView(v));

  return (
    <main>
      {/* ---------- Top: title + search, small illustration on the side ---------- */}
      <section className={styles.top}>
        <div className={styles.intro}>
          <h1 className={styles.title}>Find a climbing gym</h1>
          <p className={styles.lede}>Rated and reviewed by climbers: grading, setting, community, value, and price.</p>

          {/* Search filters as you type; pressing Enter jumps down to the results */}
          <form
            className={styles.search}
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <label htmlFor="search" className={styles.srOnly}>
              Search gyms
            </label>
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" className={styles.searchIcon}>
              <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <path d="M16.5 16.5 L21 21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <input
              id="search"
              name="q"
              type="search"
              placeholder="Gym or city"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>

        <HeroWall />
      </section>

      {/* ---------- Toolbar: filters, sort, view ---------- */}
      <section className={styles.list} id="results">
        <div className={styles.toolbar}>
          <div className={styles.filters}>
            {FILTER_GROUPS.map((group) => (
              <FilterDropdown
                key={group.category}
                category={group.category}
                options={group.options}
                color={categoryColor(group.category)}
                selected={selected[group.category] ?? []}
                onToggle={toggle}
              />
            ))}
            <FilterDropdown
              category="Price"
              options={PRICE_RANGES}
              color="var(--color-background)"
              selected={selected.Price ?? []}
              onToggle={toggle}
            />
          </div>

          {/* Active filters as removable chips */}
          {(active.length > 0 || query) && (
            <div className={styles.activeRow}>
              {query && (
                <button type="button" className={styles.chip} onClick={() => setQuery("")}>
                  “{query}” <span aria-hidden="true">×</span>
                  <span className={styles.srOnly}>Clear search</span>
                </button>
              )}
              {active.map(({ category, value }) => (
                <button key={`${category}-${value}`} type="button" className={styles.chip} onClick={() => toggle(category, value)}>
                  {value} <span aria-hidden="true">×</span>
                  <span className={styles.srOnly}>Remove filter</span>
                </button>
              ))}
              <button type="button" className={styles.clearAll} onClick={clearAll}>
                Clear all
              </button>
            </div>
          )}
        </div>

        <div className={styles.listHeader}>
          <p className={styles.count} aria-live="polite">
            <strong>
              {openCount} {openCount === 1 ? "gym" : "gyms"}
            </strong>{" "}
            in New York City
          </p>
          <div className={styles.controls}>
            <label className={styles.sort}>
              <span>Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>

            {/* Cards / Map toggle */}
            <div className={styles.toggle} role="group" aria-label="View">
              <button type="button" aria-pressed={view === "cards"} aria-label="Card view" title="Card view" onClick={() => switchView("cards")}>
                <GridIcon />
              </button>
              <button type="button" aria-pressed={view === "map"} aria-label="Map view" title="Map view" onClick={() => switchView("map")}>
                <MapIcon />
              </button>
            </div>
          </div>
        </div>

        {view === "map" ? (
          <GymsMap gyms={results} hrefFor={(slug) => `/gyms/${slug}`} />
        ) : results.length > 0 ? (
          <ul className={styles.grid}>
            {results.map((gym) => (
              // Each card animates: it slides to its new spot when the order changes,
              // and fades in or out when filters add or remove it.
              <ViewTransition
                key={gym.slug}
                name={`gym-item-${gym.slug}`}
                enter={{ "nav-forward": "none", "nav-back": "none", default: "gym-enter" }}
                exit={{ "nav-forward": "none", "nav-back": "none", default: "gym-exit" }}
                update={{ "nav-forward": "none", "nav-back": "none", default: "auto" }}
                default="none"
              >
                <li>
                  <GymCard gym={gym} />
                </li>
              </ViewTransition>
            ))}
          </ul>
        ) : (
          <div className={styles.noResults}>
            <p className={styles.noResultsTitle}>No gyms match those filters</p>
            <p>Try removing one or two.</p>
            <button type="button" className={styles.suggestLink} onClick={clearAll}>
              Clear all filters
            </button>
          </div>
        )}

        {/* ---------- Missing a gym? ---------- */}
        <div className={styles.suggest}>
          <Carabiner color="var(--color-primary)" size={40} rotate={-20} />
          <div>
            <p className={styles.suggestTitle}>Missing a gym?</p>
            <p className={styles.suggestText}>Tell us about it and we&apos;ll add it.</p>
          </div>
          <Link href="/submit" className={styles.suggestLink}>
            Suggest a gym
          </Link>
        </div>
      </section>
    </main>
  );
}
