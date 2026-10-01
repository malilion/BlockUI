import { forwardRef } from "react";
import { cx } from "../../../utils/cx";
import styles from "./BlockBadge.module.css";
import type { BlockBadgeProps } from "./BlockBadge.types";

/** Small block label for status, roles and counts. */
export const BlockBadge = forwardRef<HTMLSpanElement, BlockBadgeProps>(function BlockBadge(
  { variant = "stone", icon, dot = false, size = "md", className, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      data-material={variant}
      data-size={size}
      className={cx(styles.badge, className)}
      {...rest}
    >
      {dot ? <span className={styles.dot} aria-hidden="true" /> : null}
      {icon ? (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className={styles.label}>{children}</span>
    </span>
  );
});
