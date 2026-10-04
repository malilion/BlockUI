import { AnvilIcon, ArrowIcon, PlusIcon } from "@malilion/block-ui-icons";
import { forwardRef, useId } from "react";
import { useControllableState } from "../../../hooks/useControllableState";
import { useBlockUIMessages } from "../../../provider/context";
import { cx } from "../../../utils/cx";
import { BlockInput } from "../../forms/BlockInput/BlockInput";
import { InventorySlot } from "../../inventory/InventorySlot/InventorySlot";
import { CraftingResult } from "../CraftingResult/CraftingResult";
import styles from "./Anvil.module.css";
import type { AnvilProps } from "./Anvil.types";
import { anvilCostState } from "./Anvil.utils";

const filled = (node: unknown) => node !== undefined && node !== null && node !== false;

/**
 * Anvil: rename field, two input slots combining into a result, and the
 * experience cost — red when the player cannot afford it, "Too Expensive!" at the cap.
 */
export const Anvil = forwardRef<HTMLDivElement, AnvilProps>(function Anvil(
  {
    left,
    right,
    result,
    name,
    defaultName = "",
    onNameChange,
    cost,
    playerLevel,
    maxCost = 40,
    onTakeResult,
    label,
    className,
    ...rest
  },
  ref,
) {
  const m = useBlockUIMessages();
  const costId = useId();
  const [itemName, setItemName] = useControllableState({
    value: name,
    defaultValue: defaultName,
    onChange: onNameChange,
  });
  const costState = anvilCostState(cost, playerLevel, maxCost);
  const blocked = costState === "tooExpensive" || costState === "unaffordable";
  const hasLeft = filled(left);

  return (
    <div
      ref={ref}
      role="group"
      aria-label={label ?? m.anvil.label}
      data-cost={costState}
      className={cx(styles.anvil, className)}
      {...rest}
    >
      <div className={styles.header}>
        <span className={styles.icon} aria-hidden="true">
          <AnvilIcon size={32} />
        </span>
        <BlockInput
          label={m.anvil.itemName}
          value={itemName}
          onChange={(event) => setItemName(event.target.value)}
          disabled={!hasLeft}
          maxLength={50}
          wrapperClassName={styles.name}
        />
      </div>
      <div className={styles.layout}>
        <InventorySlot size="lg" label={hasLeft ? undefined : m.common.emptyNamed(m.anvil.item)}>
          {left}
        </InventorySlot>
        <span className={styles.symbol} aria-hidden="true">
          <PlusIcon size={24} />
        </span>
        <InventorySlot
          size="lg"
          label={filled(right) ? undefined : m.common.emptyNamed(m.anvil.material)}
        >
          {right}
        </InventorySlot>
        <span className={styles.symbol} aria-hidden="true">
          <ArrowIcon size={32} />
        </span>
        <CraftingResult
          label={m.common.result}
          onTake={blocked ? undefined : onTakeResult}
          disabled={blocked}
          aria-describedby={costState === "none" ? undefined : costId}
        >
          {result}
        </CraftingResult>
      </div>
      {costState !== "none" ? (
        <p id={costId} className={styles.cost} aria-live="polite">
          {costState === "tooExpensive"
            ? m.anvil.tooExpensive
            : m.anvil.cost(String(cost)) +
              (costState === "unaffordable" ? m.anvil.notEnoughLevels : "")}
        </p>
      ) : null}
    </div>
  );
});
