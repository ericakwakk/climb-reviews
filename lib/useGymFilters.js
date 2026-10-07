"use client";

import { startTransition, useMemo, useState } from "react";
import { filterGyms, sortGyms } from "./gymFilters";

// A custom hook: all the filter/search/sort state for the gym list, shared by both design versions.
// Every change is wrapped in startTransition, which is what lets <ViewTransition> animate the list
// (gyms sliding into new positions, fading in and out) instead of jumping.
export function useGymFilters(gyms) {
  const [query, setQueryState] = useState("");
  const [selected, setSelected] = useState({}); // { [category]: string[] }
  const [sort, setSortState] = useState("overall");

  const results = useMemo(
    () => sortGyms(filterGyms(gyms, { query, selected }), sort),
    [gyms, query, selected, sort]
  );

  function toggle(category, option) {
    startTransition(() => {
      setSelected((prev) => {
        const current = prev[category] ?? [];
        const next = current.includes(option) ? current.filter((o) => o !== option) : [...current, option];
        return { ...prev, [category]: next };
      });
    });
  }

  function clearAll() {
    startTransition(() => {
      setSelected({});
      setQueryState("");
    });
  }

  function setQuery(value) {
    startTransition(() => setQueryState(value));
  }

  function setSort(value) {
    startTransition(() => setSortState(value));
  }

  // A flat list of active filters, for the removable chips row
  const active = Object.entries(selected).flatMap(([category, values]) =>
    values.map((value) => ({ category, value }))
  );

  const openCount = results.filter((g) => g.status === "open").length;

  return { query, setQuery, selected, toggle, clearAll, sort, setSort, results, active, openCount };
}
