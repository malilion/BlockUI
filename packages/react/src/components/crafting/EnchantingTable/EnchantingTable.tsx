import { BookIcon, LapisIcon } from "@malilion/block-ui-icons";
import { forwardRef } from "react";
import { cx } from "../../../utils/cx";
import { useBlockUIMessages } from "../../../provider/context";
import { InventorySlot } from "../../inventory/InventorySlot/InventorySlot";
import styles from "./EnchantingTable.module.css";
import type { EnchantingTableProps } from "./EnchantingTable.types";
import { enchantBlocker, hasContent } from "./EnchantingTable.utils";

/**
 * Enchanting table: item and lapis slots beside three enchantment offers.
 * Offers the player cannot afford stay visible but disabled, with the reason.
 */
export const EnchantingTable = forwardRef<HTMLDivElement, EnchantingTableProps>(
  function EnchantingTable(
    { item, lapis, lapisCount, playerLevel, options = [], onEnchant, label, className, ...rest },
    ref,
  ) {
    const m = useBlockUIMessages();
    const blockerText = {
      level: m.enchantingTable.notEnoughLevels,
      lapis: m.enchantingTable.notEnoughLapis,
      disabled: m.enchantingTable.unavailable,
    };
    const hasItem = hasContent(item);
    return (
      <div
        ref={ref}
        role="group"
        aria-label={label ?? m.enchantingTable.label}
        className={cx(styles.table, className)}
        {...rest}
      >
        <div className={styles.inputs}>
          <span className={styles.book} aria-hidden="true">
            <BookIcon size={32} />
          </span>
          <div className={styles.slots}>
            <InventorySlot
              size="lg"
              label={hasItem ? undefined : m.common.emptyNamed(m.enchantingTable.item)}
            >
              {item}
            </InventorySlot>
            <InventorySlot
              size="lg"
              label={hasContent(lapis) ? undefined : m.common.emptyNamed(m.enchantingTable.lapis)}
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
        <ul className={styles.options} aria-label={m.enchantingTable.enchantments}>
          {options.slice(0, 3).map((option) => {
            const blocker = enchantBlocker(option, { hasItem, playerLevel, lapisCount });
            const reason = blocker && blocker !== "noItem" ? blockerText[blocker] : undefined;
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
                      {hasItem
                        ? (option.clue ?? m.enchantingTable.unknown)
                        : m.enchantingTable.placeItem}
                    </span>
                    <span className="block-visually-hidden">
                      {m.enchantingTable.optionDetail(
                        String(option.level),
                        String(option.lapisCost),
                      ) + (reason ? `. ${reason}` : "")}
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
