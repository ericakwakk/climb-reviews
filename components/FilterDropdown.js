"use client";

import { useEffect, useRef } from "react";
import Glyph from "./Glyph";
import styles from "./FilterDropdown.module.css";

// One filter: a button like "Grading ▾" that opens a list of checkboxes.
// Built on <details>/<summary> (the browser's own open/close element), plus a little JavaScript
// to close it when you click elsewhere. What's checked lives in the parent (see useGymFilters).
// Each design version restyles it with the --filter-* CSS variables.
export default function FilterDropdown({ category, options, color, selected = [], onToggle }) {
  const ref = useRef(null);
  const id = category.toLowerCase().replace(/\W+/g, "-");

  // Close when clicking or tapping outside the menu
  useEffect(() => {
    function handlePointerDown(event) {
      if (ref.current?.open && !ref.current.contains(event.target)) ref.current.open = false;
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <details ref={ref} className={`${styles.dropdown} ${selected.length ? styles.active : ""}`}>
      <summary className={styles.summary}>
        <span className={styles.badge} style={{ background: color }}>
          <Glyph category={category} size={13} />
        </span>
        {category}
        {selected.length > 0 && <span className={styles.count}>{selected.length}</span>}
        <svg className={styles.chevron} width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>

      <fieldset className={styles.panel}>
        <legend className={styles.legend}>{category}</legend>
        {options.map((option) => (
          <label key={option} className={styles.option}>
            <input
              type="checkbox"
              name={id}
              value={option}
              checked={selected.includes(option)}
              onChange={() => onToggle?.(category, option)}
            />
            {option}
          </label>
        ))}
        <button type="button" className={styles.done} onClick={() => (ref.current.open = false)}>
          Done
        </button>
      </fieldset>
    </details>
  );
}
