import type { HTMLAttributes, ReactNode } from "react";

export const brewingStates = ["idle", "brewing", "complete", "noFuel"] as const;

export type BrewingState = (typeof brewingStates)[number];

export interface BrewingStandProps extends HTMLAttributes<HTMLDivElement> {
  /** Ingredient on top (e.g. nether wart). */
  ingredient?: ReactNode;
  /** Fuel slot (blaze powder). */
  fuel?: ReactNode;
  /** Up to three bottles, left to right. */
  bottles?: [ReactNode?, ReactNode?, ReactNode?];
  /** Brewing progress 0–100. @default 0 */
  progress?: number;
  /** Remaining fuel 0–100. @default 0 */
  fuelLevel?: number;
  /** Override the derived state. */
  state?: BrewingState;
  /** Override status texts. */
  statusLabels?: Partial<Record<BrewingState, string>>;
  /** Accessible name. @default locale `brewingStand.label` ("Brewing stand") */
  label?: string;
}
