import { forwardRef, type Ref } from "react";
import { cx } from "../../../utils/cx";
import styles from "./BlockDivider.module.css";
import type { BlockDividerProps } from "./BlockDivider.types";

/**
 * Carved separator line. Horizontal dividers render an `<hr>`; vertical ones a
 * `role="separator"`. A labelled divider reads its label instead of a separator.
 */
export const BlockDivider = forwardRef<HTMLElement, BlockDividerProps>(function BlockDivider(
  { orientation = "horizontal", variant = "bevel", label, decorative = false, className, ...rest },
  ref,
) {
  const shared = {
    "data-orientation": orientation,
    "data-variant": variant,
    className: cx(styles.divider, className),
  };

  if (label && orientation === "horizontal") {
    return (
      <div
        ref={ref as Ref<HTMLDivElement>}
        {...shared}
        data-labelled=""
        aria-hidden={decorative || undefined}
        {...rest}
      >
        <span className={styles.line} aria-hidden="true" />
        <span className={styles.label}>{label}</span>
        <span className={styles.line} aria-hidden="true" />
      </div>
    );
  }

  if (orientation === "horizontal") {
    return (
      <hr
        ref={ref as Ref<HTMLHRElement>}
        {...shared}
        aria-hidden={decorative || undefined}
        {...rest}
      />
    );
  }

  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : "vertical"}
      {...shared}
      {...rest}
    />
  );
});
