import type { HTMLAttributes, ReactNode } from "react";

export const bossBarColors = [
  "amethyst",
  "redstone",
  "emerald",
  "diamond",
  "gold",
  "obsidian",
] as const;

export type BossBarColor = (typeof bossBarColors)[number];

/** Notch counts drawn over the bar. */
export const bossBarSegments = [0, 6, 10, 12, 20] as const;

export type BossBarSegments = (typeof bossBarSegments)[number];

export interface BossBarProps extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  /** Boss name shown above the bar — also the meter's accessible name. */
  name: ReactNode;
  value: number;
  /** @default 100 */
  max?: number;
  /** Bar material. @default "amethyst" */
  color?: BossBarColor;
  /** Notches over the bar. @default 0 */
  segments?: BossBarSegments;
  /** Icon before the name. */
  icon?: ReactNode;
  /** Show the percentage after the name. */
  showPercent?: boolean;
}
