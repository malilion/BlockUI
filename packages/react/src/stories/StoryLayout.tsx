import type { ReactNode } from "react";
import { cx } from "../utils/cx";
import styles from "./StoryLayout.module.css";

/** Layout helpers used only by stories (keeps stories free of inline styles). */
export function StoryRow({ children, wrap = true }: { children: ReactNode; wrap?: boolean }) {
  return <div className={cx(styles.row, wrap && styles.wrap)}>{children}</div>;
}

export function StoryStack({
  children,
  narrow = false,
}: {
  children: ReactNode;
  narrow?: boolean;
}) {
  return <div className={cx(styles.stack, narrow && styles.narrow)}>{children}</div>;
}

export function StoryGrid({
  children,
  min = "md",
}: {
  children: ReactNode;
  min?: "sm" | "md" | "lg";
}) {
  return <div className={cx(styles.grid, styles[min])}>{children}</div>;
}

export function StoryLabel({ children }: { children: ReactNode }) {
  return <span className={styles.label}>{children}</span>;
}

/** A 360px phone-width frame so Responsive stories also read well on the docs page. */
export function StoryMobile({ children }: { children: ReactNode }) {
  return (
    <div className={styles.mobile} data-story-frame="mobile">
      {children}
    </div>
  );
}
