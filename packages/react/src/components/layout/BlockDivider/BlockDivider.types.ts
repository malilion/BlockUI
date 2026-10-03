import type { HTMLAttributes, ReactNode } from "react";

export const dividerVariants = ["bevel", "line", "dashed"] as const;

export type BlockDividerVariant = (typeof dividerVariants)[number];

export interface BlockDividerProps extends HTMLAttributes<HTMLElement> {
  /** @default "horizontal" */
  orientation?: "horizontal" | "vertical";
  /** `bevel` is a carved groove, `line` a flat border, `dashed` a pixel dash. @default "bevel" */
  variant?: BlockDividerVariant;
  /** Text in the middle of a horizontal divider (e.g. "or"). */
  label?: ReactNode;
  /** Purely visual: hide it from assistive technology. */
  decorative?: boolean;
}
