import { Children, forwardRef } from "react";
import { cx } from "../../../utils/cx";
import { useBlockUIMessages } from "../../../provider/context";
import { InventoryGrid } from "../../inventory/InventoryGrid/InventoryGrid";
import { CraftingSlot } from "../CraftingSlot/CraftingSlot";
import styles from "./CraftingGrid.module.css";
import type { CraftingGridProps } from "./CraftingGrid.types";

/**
 * 2 × 2 or 3 × 3 crafting input grid. Missing slots are filled with empty
 * `CraftingSlot`s; keyboard behaviour matches `InventoryGrid`.
 */
export const CraftingGrid = forwardRef<HTMLDivElement, CraftingGridProps>(function CraftingGrid(
  { size = 3, slotSize = "lg", label, className, children, ...rest },
  ref,
) {
  const m = useBlockUIMessages();
  const filled = Children.toArray(children);
  const padded = [...filled];
  for (let i = filled.length; i < size * size; i += 1) {
    padded.push(<CraftingSlot key={`block-crafting-empty-${i}`} />);
  }

  return (
    <InventoryGrid
      ref={ref}
      columns={size}
      slotSize={slotSize}
      label={label ?? m.craftingGrid.label}
      data-crafting-size={size}
      className={cx(styles.craftingGrid, className)}
      {...rest}
    >
      {padded}
    </InventoryGrid>
  );
});
