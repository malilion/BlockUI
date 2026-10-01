import type { InventoryGridProps } from "../../inventory/InventoryGrid/InventoryGrid.types";

export interface CraftingGridProps extends Omit<InventoryGridProps, "columns" | "rows"> {
  /** 2 × 2 (player) or 3 × 3 (crafting table). @default 3 */
  size?: 2 | 3;
}
