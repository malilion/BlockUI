import type { HTMLAttributes } from "react";

export interface HungerBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  /** @default 20 */
  max?: number;
  /** Show `value / max`. */
  showText?: boolean;
  /** Icon size in px. @default 16 */
  iconSize?: number;
  /** Visual direction. @default "ltr" */
  direction?: "ltr" | "rtl";
  /** Accessible name. @default "Hunger" */
  label?: string;
}
