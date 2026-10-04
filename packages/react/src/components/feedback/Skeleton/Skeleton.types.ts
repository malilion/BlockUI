import type { HTMLAttributes } from "react";

export const skeletonVariants = ["text", "block", "slot", "avatar"] as const;

export type SkeletonVariant = (typeof skeletonVariants)[number];

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  /** `text` lines, a `block` rectangle, an inventory `slot` or a square `avatar`. @default "text" */
  variant?: SkeletonVariant;
  /** Number of lines for `text` (the last one is shorter). @default 1 */
  lines?: number;
  /** CSS width, e.g. `"200px"` or `"60%"`. */
  width?: string;
  /** CSS height for `block`, e.g. `"120px"`. */
  height?: string;
}
