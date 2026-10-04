import type { HTMLAttributes, ReactNode } from "react";

export interface CraftingResultProps extends Omit<HTMLAttributes<HTMLDivElement>, "onClick"> {
  /** The crafted item, usually an `<ItemStack />`. */
  children?: ReactNode;
  /** Called when the player takes the result (click / Enter). */
  onTake?: () => void;
  /** Accessible label prefix. @default locale `craftingResult.label` ("Crafting result") */
  label?: string;
  disabled?: boolean;
}
