import type { HTMLAttributes, ReactElement, ReactNode } from "react";

export const tooltipPlacements = ["top", "bottom", "left", "right"] as const;

export type BlockTooltipPlacement = (typeof tooltipPlacements)[number];

export interface BlockTooltipProps extends Omit<HTMLAttributes<HTMLSpanElement>, "content"> {
  /** Tooltip text. Keep it short and non-interactive — links and buttons belong in a menu or modal. */
  content: ReactNode;
  /** A single focusable element (button, link, input). It receives `aria-describedby`. */
  children: ReactElement<{ "aria-describedby"?: string }>;
  /** Preferred side; flips to the opposite side when it would leave the viewport. @default "top" */
  placement?: BlockTooltipPlacement;
  /** Hover delay before opening, in ms. Focus opens immediately. @default 300 */
  delay?: number;
  /** `sm` wraps at 200px, `md` at 280px. @default "md" */
  size?: "sm" | "md";
  /** Never show the tooltip. */
  disabled?: boolean;
}
