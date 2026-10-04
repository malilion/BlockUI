import type { HTMLAttributes, ReactNode } from "react";

export interface AnvilProps extends HTMLAttributes<HTMLDivElement> {
  /** Item being repaired or renamed. */
  left?: ReactNode;
  /** Sacrifice item, material or enchanted book. */
  right?: ReactNode;
  /** Output item. */
  result?: ReactNode;
  /** Controlled item name. */
  name?: string;
  /** Initial item name when uncontrolled. */
  defaultName?: string;
  onNameChange?: (name: string) => void;
  /** Experience levels the operation costs. */
  cost?: number;
  /** Player experience level; a higher cost is shown in red and blocks taking the result. */
  playerLevel?: number;
  /** Costs at or above this are "Too Expensive!". @default 40 */
  maxCost?: number;
  /** Called when the result is taken. */
  onTakeResult?: () => void;
  /** Accessible name. @default locale `anvil.label` ("Anvil") */
  label?: string;
}
