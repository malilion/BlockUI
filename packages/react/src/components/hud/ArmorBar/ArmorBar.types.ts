import type { HTMLAttributes } from "react";

export interface ArmorBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  /** @default 20 */
  max?: number;
  /** Show `value / max`. */
  showText?: boolean;
  /** Icon size in px. @default 16 */
  iconSize?: number;
  /** Accessible name. @default "Armor" */
  label?: string;
}
