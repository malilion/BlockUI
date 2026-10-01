import type { HTMLAttributes, ReactNode } from "react";

export const furnaceStates = ["idle", "burning", "processing", "complete", "noFuel"] as const;

export type FurnaceState = (typeof furnaceStates)[number];

export interface FurnaceProps extends HTMLAttributes<HTMLDivElement> {
  /** Item being smelted. */
  input?: ReactNode;
  /** Fuel item. */
  fuel?: ReactNode;
  /** Smelted output. */
  result?: ReactNode;
  /** Smelting progress 0–100. @default 0 */
  progress?: number;
  /** Whether the fire is lit. */
  burning?: boolean;
  /** Remaining fuel 0–100 (flame height). @default 100 while burning */
  fuelLevel?: number;
  /** Override the derived state. */
  state?: FurnaceState;
  /** Called when the result is taken. */
  onTakeResult?: () => void;
  /** Override status texts. */
  statusLabels?: Partial<Record<FurnaceState, string>>;
  /** Accessible name. @default "Furnace" */
  label?: string;
}
