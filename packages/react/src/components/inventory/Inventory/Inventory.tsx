import { ChestIcon } from "@block-ui/icons";
import { forwardRef, useId } from "react";
import { cx } from "../../../utils/cx";
import { BlockPanel } from "../../layout/BlockPanel/BlockPanel";
import styles from "./Inventory.module.css";
import type { InventoryProps, InventorySectionProps } from "./Inventory.types";

/**
 * Inventory window — a panel that stacks `InventorySection`s (grids, hotbar).
 * Use `variant="chest"` for storage containers.
 */
export const Inventory = forwardRef<HTMLElement, InventoryProps>(function Inventory(
  { title = "Inventory", variant = "default", icon, className, children, ...rest },
  ref,
) {
  return (
    <BlockPanel
      ref={ref}
      title={title}
      icon={icon ?? (variant === "chest" ? <ChestIcon size={24} /> : undefined)}
      data-inventory={variant}
      className={cx(styles.inventory, variant === "chest" && styles.chest, className)}
      {...rest}
    >
      <div className={styles.sections}>{children}</div>
    </BlockPanel>
  );
});

/** A titled group inside an `Inventory` (e.g. main storage, hotbar). */
export const InventorySection = forwardRef<HTMLDivElement, InventorySectionProps>(
  function InventorySection({ title, className, children, ...rest }, ref) {
    const titleId = useId();
    return (
      <div
        ref={ref}
        role={title ? "group" : undefined}
        aria-labelledby={title ? titleId : undefined}
        className={cx(styles.section, className)}
        {...rest}
      >
        {title ? (
          <p id={titleId} className={styles.sectionTitle}>
            {title}
          </p>
        ) : null}
        {children}
      </div>
    );
  },
);
