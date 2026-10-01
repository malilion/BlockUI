import type { HTMLAttributes } from "react";

export const progressVariants = ["grass", "water", "diamond", "emerald", "gold", "redstone"] as const;

export type BlockProgressVariant = (typeof progressVariants)[number];

export interface BlockProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** Current value. Omit for an indeterminate bar. */
  value?: number;
  /** @default 100 */
  max?: number;
  /** @default "grass" */
  variant?: BlockProgressVariant;
  /** Visible label above the bar (also the accessible name). */
  label?: string;
  /** Show the formatted value next to the label. */
  showValue?: boolean;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Formats the visible value and `aria-valuetext`. Defaults to a percentage. */
  formatValue?: (value: number, max: number) => string;
}
