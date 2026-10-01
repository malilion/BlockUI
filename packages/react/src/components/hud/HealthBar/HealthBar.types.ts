import type { HTMLAttributes } from "react";

export interface HealthBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  /** @default 20 */
  max?: number;
  /** Show `value / max`. */
  showText?: boolean;
  /** Icon size in px. @default 16 */
  iconSize?: number;
  /** Accessible name. @default "Health" */
  label?: string;
}
