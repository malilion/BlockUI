import { forwardRef } from "react";
import { cx } from "../../../utils/cx";
import styles from "./ItemTooltip.module.css";
import { itemRarities, type ItemRarity, type ItemTooltipProps } from "./ItemTooltip.types";

export function normalizeRarity(rarity: string | undefined): ItemRarity | undefined {
  if (!rarity) return undefined;
  const lower = rarity.toLowerCase();
  return (itemRarities as readonly string[]).includes(lower) ? (lower as ItemRarity) : undefined;
}

/**
 * Item details card: rarity-colored name, enchantments and stats. Rendered
 * automatically by `InventorySlot` when it receives a `tooltip`.
 */
export const ItemTooltip = forwardRef<HTMLDivElement, ItemTooltipProps>(function ItemTooltip(
  { name, rarity, description, enchantments, stats, statIcon, className, ...rest },
  ref,
) {
  const normalized = normalizeRarity(rarity);
  return (
    <div ref={ref} className={cx(styles.tooltip, className)} data-rarity={normalized} {...rest}>
      <p className={styles.name}>{name}</p>
      {rarity ? <p className={styles.rarity}>{rarity}</p> : null}
      {enchantments && enchantments.length > 0 ? (
        <ul className={styles.enchantments}>
          {enchantments.map((enchantment) => (
            <li key={enchantment}>{enchantment}</li>
          ))}
        </ul>
      ) : null}
      {description ? <div className={styles.description}>{description}</div> : null}
      {stats && stats.length > 0 ? (
        <dl className={styles.stats}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <dt>
                {statIcon ? (
                  <span className={styles.statIcon} aria-hidden="true">
                    {statIcon}
                  </span>
                ) : null}
                {stat.label}
              </dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
});
