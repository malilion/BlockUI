import { createElement, forwardRef, useId } from "react";
import { cx } from "../../../utils/cx";
import styles from "./BlockPanel.module.css";
import type { BlockPanelProps } from "./BlockPanel.types";

/**
 * The basic block container: a textured stone surface with a pixel border,
 * bevel and an optional title strip. Titled panels are labelled regions.
 */
export const BlockPanel = forwardRef<HTMLElement, BlockPanelProps>(function BlockPanel(
  {
    title,
    headingLevel = 2,
    actions,
    icon,
    variant = "stone",
    flush = false,
    as = "section",
    className,
    children,
    "aria-labelledby": ariaLabelledBy,
    ...rest
  },
  ref,
) {
  const titleId = useId();
  const heading = title
    ? createElement(`h${headingLevel}`, { id: titleId, className: styles.title }, title)
    : null;

  return createElement(
    as,
    {
      ref,
      "aria-labelledby": ariaLabelledBy ?? (title ? titleId : undefined),
      "data-variant": variant,
      className: cx(styles.panel, styles[variant], className),
      ...rest,
    },
    title || actions ? (
      <div className={styles.header}>
        {icon ? (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        ) : null}
        {heading}
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </div>
    ) : null,
    <div className={cx(styles.body, flush && styles.flush)}>{children}</div>,
  );
});
