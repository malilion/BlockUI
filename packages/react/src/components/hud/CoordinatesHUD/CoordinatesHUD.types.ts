import type { HTMLAttributes } from "react";

export const facings = ["north", "south", "east", "west"] as const;

export type Facing = (typeof facings)[number];

export interface CoordinatesHUDProps extends HTMLAttributes<HTMLDivElement> {
  x: number;
  y: number;
  z: number;
  /** Compass direction the player looks at; shown with its axis (north = −Z). */
  facing?: Facing;
  /** Decimal places. @default 0 */
  precision?: number;
  /** Add a button that copies `x y z` to the clipboard. */
  copyable?: boolean;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Accessible name of the group. @default "Coordinates" */
  label?: string;
}
