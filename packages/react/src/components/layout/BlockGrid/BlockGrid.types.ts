import type { HTMLAttributes, ReactNode } from "react";
import type { BlockStackGap } from "../BlockStack/BlockStack.types";

export interface BlockGridProps extends HTMLAttributes<HTMLElement> {
  /** Fixed number of equal columns. Ignored when `minItemWidth` is set. @default 2 */
  columns?: number;
  /** Fit as many columns as possible, each at least this wide (e.g. `"240px"`). */
  minItemWidth?: string;
  /** Spacing token step between cells. @default 4 */
  gap?: BlockStackGap;
  /** Collapse fixed columns to one below 768px. @default true */
  stackOnMobile?: boolean;
  /** Render as a different element. @default "div" */
  as?: "div" | "section" | "ul" | "ol";
  children?: ReactNode;
}
