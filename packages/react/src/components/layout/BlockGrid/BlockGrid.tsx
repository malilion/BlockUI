import { createElement, forwardRef, type CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import styles from "./BlockGrid.module.css";
import type { BlockGridProps } from "./BlockGrid.types";

/** Two-dimensional grid: fixed equal columns, or auto-fill with a minimum item width. */
export const BlockGrid = forwardRef<HTMLElement, BlockGridProps>(function BlockGrid(
  {
    columns = 2,
    minItemWidth,
    gap = 4,
    stackOnMobile = true,
    as = "div",
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const auto = minItemWidth !== undefined;
  return createElement(
    as,
    {
      ref,
      "data-mode": auto ? "auto" : "fixed",
      "data-stack-mobile": (!auto && stackOnMobile) || undefined,
      className: cx(styles.grid, className),
      style: {
        "--block-grid-columns": Math.max(1, Math.floor(columns)),
        "--block-grid-min": minItemWidth,
        "--block-grid-gap": `var(--block-space-${gap})`,
        ...style,
      } as CSSProperties,
      ...rest,
    },
    children,
  );
});
