import type { HTMLAttributes } from "react";

export interface XPBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max: number;
  /** Player level shown above the bar. */
  level?: number;
  /** Show `value / max XP` under the bar. */
  showValue?: boolean;
  /** Accessible name. @default "Experience" */
  label?: string;
}
