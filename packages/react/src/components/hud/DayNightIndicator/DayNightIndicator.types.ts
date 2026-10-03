import type { HTMLAttributes } from "react";

export type DayPhase = "dawn" | "day" | "dusk" | "night";

export interface DayNightIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  /** In-game time of day in hours, 0–24 (fractions allowed: 14.5 = 14:30). */
  time: number;
  /** Day counter shown before the clock, e.g. "Day 156". */
  day?: number;
  /** @default "24h" */
  format?: "24h" | "12h";
  /** Show the sun / moon arc. @default true */
  showDial?: boolean;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Accessible name of the group. @default "Time of day" */
  label?: string;
}
