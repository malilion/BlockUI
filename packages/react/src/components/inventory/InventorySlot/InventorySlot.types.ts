import type { HTMLAttributes, ReactNode } from "react";
import type { ItemRarity } from "../ItemTooltip/ItemTooltip.types";

export interface InventorySlotProps extends Omit<HTMLAttributes<HTMLElement>, "onClick"> {
  /** Highlight as the selected slot. Inside a grid this follows the grid's selection by default. */
  selected?: boolean;
  disabled?: boolean;
  /** Locked slots show a padlock and cannot be selected. */
  locked?: boolean;
  rarity?: ItemRarity;
  /** Usually an `<ItemStack />`. Empty slots are announced as "Empty slot". */
  children?: ReactNode;
  onClick?: () => void;
  /** Tooltip content (usually `<ItemTooltip />`) shown on hover and keyboard focus. */
  tooltip?: ReactNode;
  /** Accessible name override. */
  label?: string;
  /** Slot size when used outside a grid. @default "md" */
  size?: "sm" | "md" | "lg";
}
