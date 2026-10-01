import type { HTMLAttributes } from "react";

export interface PlayerStats {
  name?: string;
  health: number;
  /** @default 20 */
  maxHealth?: number;
  armor?: number;
  /** @default 20 */
  maxArmor?: number;
  hunger?: number;
  /** @default 20 */
  maxHunger?: number;
  level?: number;
  xp?: number;
  maxXp?: number;
}

export interface PlayerHUDProps extends HTMLAttributes<HTMLElement> {
  player: PlayerStats;
  /** Icon size for hearts, armor and hunger. @default 16 */
  iconSize?: number;
  /** Show numeric values next to each bar. */
  showText?: boolean;
  /** Accessible name. @default "Player status" */
  label?: string;
}
