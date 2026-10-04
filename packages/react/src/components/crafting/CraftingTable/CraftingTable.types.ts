import type { HTMLAttributes, ReactNode } from "react";

export interface CraftingTableProps extends HTMLAttributes<HTMLDivElement> {
  /** Input grid, usually `<CraftingGrid size={3}>`. */
  input: ReactNode;
  /** Output — a `<CraftingResult>` or a bare `<ItemStack>` (wrapped automatically). */
  result?: ReactNode;
  /** Called when the bare `result` is taken. */
  onTake?: () => void;
  /** Renders a Craft button. */
  onCraft?: () => void;
  /** Enables the Craft button. @default true when a result exists */
  canCraft?: boolean;
  /** @default locale `craftingTable.craft` ("Craft") */
  craftLabel?: string;
  /** Accessible name of the crafting area. @default locale `craftingTable.label` ("Crafting table") */
  label?: string;
}
