import { forwardRef } from "react";
import { cx } from "../../../utils/cx";
import { useBlockUIMessages } from "../../../provider/context";
import { InventorySlot } from "../../inventory/InventorySlot/InventorySlot";
import styles from "./CraftingResult.module.css";
import type { CraftingResultProps } from "./CraftingResult.types";

/** The large output slot of a crafting table or furnace. Result changes are announced politely. */
export const CraftingResult = forwardRef<HTMLDivElement, CraftingResultProps>(
  function CraftingResult(
    { children, onTake, label: labelProp, disabled = false, className, ...rest },
    ref,
  ) {
    const m = useBlockUIMessages();
    const label = labelProp ?? m.craftingResult.label;
    const empty = children === undefined || children === null || children === false;
    return (
      <div
        ref={ref}
        role="group"
        aria-label={label}
        aria-live="polite"
        data-empty={empty || undefined}
        className={cx(styles.result, className)}
        {...rest}
      >
        <InventorySlot
          size="lg"
          disabled={disabled || empty}
          onClick={onTake}
          className={styles.slot}
          label={empty ? m.common.emptyNamed(label) : undefined}
        >
          {children}
        </InventorySlot>
      </div>
    );
  },
);
