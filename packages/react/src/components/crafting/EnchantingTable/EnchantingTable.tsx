import { BookIcon, LapisIcon } from "@malilion/block-ui-icons";
import { forwardRef } from "react";
import { cx } from "../../../utils/cx";
import { InventorySlot } from "../../inventory/InventorySlot/InventorySlot";
import styles from "./EnchantingTable.module.css";
import type { EnchantingTableProps } from "./EnchantingTable.types";
import { enchantBlocker, hasContent } from "./EnchantingTable.utils";

const BLOCKER_TEXT = {
  level: "Not enough levels",
  lapis: "Not enough lapis",
  disabled: "Unavailable",
} as const;

/**
 * Enchanting table: item and lapis slots beside three enchantment offers.
 * Offers the player cannot afford stay visible but disabled, with the reason.
 */
export const EnchantingTable = forwardRef<HTMLDivElement, EnchantingTableProps>(
  function EnchantingTable(
    {
      item,
      lapis,
      lapisCount,
      playerLevel,
      options = [],
      onEnchant,
      label = "Enchanting table",
      className,
      ...rest
    },
    ref,
  ) {
    const hasItem = hasContent(item);
    return (
      <div
        ref={ref}
        role="group"
        aria-label={label}
        className={cx(styles.table, className)}
        {...rest}
      >
        <div className={styles.inputs}>
          <span className={styles.book} aria-hidden="true">
            <BookIcon size={32} />
          </span>
          <div className={styles.slots}>
            <InventorySlot size="lg" label={hasItem ? undefined : "Item: empty"}>
              {item}
            </InventorySlot>
            <InventorySlot
              size="lg"
              label={hasContent(lapis) ? undefined : "Lapis: empty"}
              className={styles.lapisSlot}
            >
              {lapis ?? (
                <span className={styles.ghost} aria-hidden="true">
                  <LapisIcon size={32} />
                </span>
              )}
            </InventorySlot>
          </div>
        </div>
        <ul className={styles.options} aria-label="Enchantments">
          {options.slice(0, 3).map((option) => {
            const blocker = enchantBlocker(option, { hasItem, playerLevel, lapisCount });
            const reason = blocker && blocker !== "noItem" ? BLOCKER_TEXT[blocker] : undefined;
            return (
              <li key={option.id}>
                <button
                  type="button"
                  className={styles.option}
                  aria-disabled={blocker ? true : undefined}
                  data-blocker={blocker ?? undefined}
                  onClick={() => {
                    if (!blocker) onEnchant?.(option.id);
                  }}
                >
                  <span className={styles.cost} aria-hidden="true">
                    {Array.from({ length: Math.min(3, Math.max(1, option.lapisCost)) }, (_, i) => (
                      <LapisIcon key={i} size={16} />
                    ))}
                  </span>
                  <span className={styles.text}>
                    {hasItem && option.runes ? (
                      <span className={styles.runes} aria-hidden="true">
                        {option.runes}
                      </span>
                    ) : null}
                    <span className={styles.clue}>
                      {hasItem ? (option.clue ?? "Unknown enchantment") : "Place an item"}
                    </span>
                    <span className="block-visually-hidden">
                      {`, level ${option.level}, ${option.lapisCost} lapis${reason ? `. ${reason}` : ""}`}
                    </span>
                  </span>
                  <span className={styles.level} aria-hidden="true">
                    {option.level}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
);
