import { createElement, forwardRef } from "react";
import { cx } from "../../../utils/cx";
import styles from "./BlockStack.module.css";
import type { BlockStackProps } from "./BlockStack.types";

/** Flex layout helper that spaces children on the 4px token grid. */
export const BlockStack = forwardRef<HTMLElement, BlockStackProps>(function BlockStack(
  {
    direction = "column",
    gap = 3,
    align = "stretch",
    justify = "start",
    wrap = false,
    stackOnMobile = false,
    as = "div",
    className,
    children,
    ...rest
  },
  ref,
) {
  return createElement(
    as,
    {
      ref,
      "data-direction": direction,
      "data-gap": gap,
      "data-align": align,
      "data-justify": justify,
      "data-wrap": wrap || undefined,
      "data-stack-mobile": stackOnMobile || undefined,
      className: cx(styles.stack, className),
      ...rest,
    },
    children,
  );
});
