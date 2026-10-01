import type { HTMLAttributes } from "react";

export interface DurabilityBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max: number;
  /** Accessible label. @default "Durability" */
  label?: string;
  /** Slim variant used inside item slots. */
  compact?: boolean;
  /** Show `value / max` text next to the bar. */
  showValue?: boolean;
}

export type DurabilityLevel = "high" | "medium" | "low";
