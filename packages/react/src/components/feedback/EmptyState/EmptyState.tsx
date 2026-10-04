import { ChestIcon } from "@malilion/block-ui-icons";
import { createElement, forwardRef } from "react";
import { cx } from "../../../utils/cx";
import styles from "./EmptyState.module.css";
import type { EmptyStateProps } from "./EmptyState.types";

/** Placeholder for an empty list or search: icon, title, description and an action. */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { title, description, icon, action, headingLevel = 3, size = "md", className, ...rest },
  ref,
) {
  return (
    <div ref={ref} data-size={size} className={cx(styles.empty, className)} {...rest}>
      <span className={styles.icon} aria-hidden="true">
        {icon ?? <ChestIcon size={size === "sm" ? 32 : 48} />}
      </span>
      {createElement(`h${headingLevel}`, { className: styles.title }, title)}
      {description ? <p className={styles.description}>{description}</p> : null}
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
});
