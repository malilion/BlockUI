import { createElement, forwardRef } from "react";
import { cx } from "../../../utils/cx";
import styles from "./BlockContainer.module.css";
import type { BlockContainerProps } from "./BlockContainer.types";

/** Centres content at a readable max width with 16px side gutters. */
export const BlockContainer = forwardRef<HTMLElement, BlockContainerProps>(function BlockContainer(
  { size = "lg", flush = false, as = "div", className, children, ...rest },
  ref,
) {
  return createElement(
    as,
    {
      ref,
      "data-size": size,
      "data-flush": flush || undefined,
      className: cx(styles.container, className),
      ...rest,
    },
    children,
  );
});
