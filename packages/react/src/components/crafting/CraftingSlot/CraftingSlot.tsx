import { forwardRef } from "react";
import { cx } from "../../../utils/cx";
import { InventorySlot } from "../../inventory/InventorySlot/InventorySlot";
import styles from "./CraftingSlot.module.css";
import type { CraftingSlotProps } from "./CraftingSlot.types";

/** An input slot of a crafting grid. Same behaviour as `InventorySlot`. */
export const CraftingSlot = forwardRef<HTMLElement, CraftingSlotProps>(function CraftingSlot(
  { className, ...rest },
  ref,
) {
  return <InventorySlot ref={ref} className={cx(styles.craftingSlot, className)} {...rest} />;
});
