import Glyph from "../Glyph";
import { zineCategoryColor } from "@/lib/zineColors";
import styles from "./ZineTag.module.css";

// Version B tag: square corners, the category's symbol on a dot of its riso color, count in blue.
export default function ZineTag({ label, category, count }) {
  return (
    <span className={styles.tag}>
      <span className={styles.badge} style={{ background: zineCategoryColor(category) }}>
        <Glyph category={category} size={13} />
      </span>
      {label}
      {count != null && <sup className={styles.count}>{count}</sup>}
    </span>
  );
}
