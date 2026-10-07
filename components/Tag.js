import Glyph from "./Glyph";
import { categoryColor } from "@/lib/gymDisplay";
import styles from "./Tag.module.css";

// A tag chip with its category's icon on a dot of the category's color.
// e.g. <Tag label="Sandbagged" category="Grading" count={9} />
export default function Tag({ label, category, count, selected = false }) {
  return (
    <span className={`${styles.tag} ${selected ? styles.selected : ""}`}>
      <span className={styles.badge} style={{ background: categoryColor(category) }} aria-hidden="true">
        <Glyph category={category ?? "Amenities"} size={11} />
      </span>
      {label}
      {count != null && <span className={styles.count}>{count}</span>}
    </span>
  );
}
