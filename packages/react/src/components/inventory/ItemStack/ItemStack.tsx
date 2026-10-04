import { forwardRef } from "react";
import { cx } from "../../../utils/cx";
import { DurabilityBar } from "../DurabilityBar/DurabilityBar";
import styles from "./ItemStack.module.css";
import type { ItemStackProps } from "./ItemStack.types";
import { describeItemStack } from "./ItemStack.utils";
import { useBlockUIMessages } from "../../../provider/context";

/**
 * An item inside a slot: icon, stack amount (bottom-right) and an optional
 * durability bar. Visual details are hidden from screen readers and replaced
 * by a single text description.
 */
export const ItemStack = forwardRef<HTMLSpanElement, ItemStackProps>(function ItemStack(
  { icon, amount, maxAmount, durability, maxDurability, name, className, ...rest },
  ref,
) {
  const m = useBlockUIMessages();
  const showAmount = amount !== undefined && amount > 1;
  const full = maxAmount !== undefined && amount !== undefined && amount >= maxAmount;
  const showDurability =
    durability !== undefined && maxDurability !== undefined && durability < maxDurability;
  const description = describeItemStack({ name, amount, durability, maxDurability }, m);

  return (
    <span ref={ref} className={cx(styles.stack, className)} data-full={full || undefined} {...rest}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      {showAmount ? (
        <span className={styles.amount} aria-hidden="true">
          {amount}
        </span>
      ) : null}
      {showDurability ? (
        <span className={styles.durability} aria-hidden="true">
          <DurabilityBar value={durability} max={maxDurability} compact />
        </span>
      ) : null}
      {description ? <span className="block-visually-hidden">{description}</span> : null}
    </span>
  );
});
