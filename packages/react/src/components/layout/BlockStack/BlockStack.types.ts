import type { HTMLAttributes, ReactNode } from "react";

/** Spacing token steps (4px grid) accepted by `gap`. */
export const stackGaps = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12] as const;

export type BlockStackGap = (typeof stackGaps)[number];

export type BlockStackAlign = "start" | "center" | "end" | "stretch" | "baseline";

export type BlockStackJustify = "start" | "center" | "end" | "between" | "around";

export interface BlockStackProps extends HTMLAttributes<HTMLElement> {
  /** @default "column" */
  direction?: "row" | "column";
  /** Spacing token step between children (`3` = `--block-space-3` = 12px). @default 3 */
  gap?: BlockStackGap;
  /** Cross-axis alignment. @default "stretch" */
  align?: BlockStackAlign;
  /** Main-axis distribution. @default "start" */
  justify?: BlockStackJustify;
  /** Let children wrap onto new lines. */
  wrap?: boolean;
  /** Switch a row to a column below 768px (PRD §50 mobile). */
  stackOnMobile?: boolean;
  /** Render as a different element. @default "div" */
  as?: "div" | "section" | "ul" | "ol" | "nav" | "header" | "footer";
  children?: ReactNode;
}
