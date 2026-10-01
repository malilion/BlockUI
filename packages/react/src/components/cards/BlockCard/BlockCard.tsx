import { createElement, forwardRef, useId } from "react";
import { cx } from "../../../utils/cx";
import styles from "./BlockCard.module.css";
import type { BlockCardProps } from "./BlockCard.types";

/** Material-framed card — the base of Quest, Achievement, Player, Server and World cards. */
export const BlockCard = forwardRef<HTMLElement, BlockCardProps>(function BlockCard(
  {
    material = "stone",
    label,
    headingLevel = 3,
    headerAction,
    footer,
    as = "article",
    className,
    children,
    "aria-labelledby": ariaLabelledBy,
    ...rest
  },
  ref,
) {
  const labelId = useId();
  return createElement(
    as,
    {
      ref,
      "data-material": material,
      "aria-labelledby": ariaLabelledBy ?? (label ? labelId : undefined),
      className: cx(styles.card, className),
      ...rest,
    },
    label || headerAction ? (
      <div className={styles.header}>
        {label
          ? createElement(`h${headingLevel}`, { id: labelId, className: styles.label }, label)
          : null}
        {headerAction ? <div className={styles.headerAction}>{headerAction}</div> : null}
      </div>
    ) : null,
    <div className={styles.body}>{children}</div>,
    footer ? <div className={styles.footer}>{footer}</div> : null,
  );
});
