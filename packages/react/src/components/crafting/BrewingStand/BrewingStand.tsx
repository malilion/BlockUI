import { BlazePowderIcon, PotionIcon } from "@malilion/block-ui-icons";
import { forwardRef, type CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import { clamp } from "../../../utils/number";
import { useBlockUIMessages } from "../../../provider/context";
import { InventorySlot } from "../../inventory/InventorySlot/InventorySlot";
import styles from "./BrewingStand.module.css";
import type { BrewingStandProps } from "./BrewingStand.types";
import { getBrewingState, isFilled } from "./BrewingStand.utils";

/**
 * Brewing stand: fuel with its gauge, the ingredient on top, a progress bar
 * filling downwards and three bottle slots. States: idle, brewing, complete, no fuel.
 */
export const BrewingStand = forwardRef<HTMLDivElement, BrewingStandProps>(function BrewingStand(
  {
    ingredient,
    fuel,
    bottles = [],
    progress = 0,
    fuelLevel = 0,
    state,
    statusLabels,
    label,
    className,
    ...rest
  },
  ref,
) {
  const m = useBlockUIMessages();
  const current = state ?? getBrewingState({ ingredient, bottles, progress, fuelLevel });
  const pct = clamp(progress, 0, 100);
  const fuelPct = clamp(fuelLevel, 0, 100);
  const labels = { ...m.brewingStand.status, ...statusLabels };
  const statusText =
    current === "brewing" ? `${labels.brewing} ${Math.round(pct)}%` : labels[current];

  return (
    <div
      ref={ref}
      role="group"
      aria-label={label ?? m.brewingStand.label}
      data-state={current}
      className={cx(styles.stand, className)}
      style={
        {
          "--block-brew-progress": `${pct}%`,
          "--block-brew-fuel": `${fuelPct}%`,
        } as CSSProperties
      }
      {...rest}
    >
      <div className={styles.layout}>
        <div className={styles.fuel}>
          <InventorySlot
            size="md"
            label={isFilled(fuel) ? undefined : m.common.emptyNamed(m.common.fuel)}
          >
            {fuel ?? (
              <span className={styles.ghost} aria-hidden="true">
                <BlazePowderIcon size={24} />
              </span>
            )}
          </InventorySlot>
          <div
            role="meter"
            aria-label={m.common.fuel}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(fuelPct)}
            className={styles.gauge}
          >
            <span className={styles.gaugeFill} />
          </div>
        </div>
        <div className={styles.center}>
          <InventorySlot
            size="lg"
            label={
              isFilled(ingredient) ? undefined : m.common.emptyNamed(m.brewingStand.ingredient)
            }
          >
            {ingredient}
          </InventorySlot>
          <div
            role="progressbar"
            aria-label={m.brewingStand.progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pct)}
            className={styles.progress}
          >
            <span className={styles.progressFill} />
          </div>
          <div className={styles.bottles}>
            {m.brewingStand.bottles.map((name, index) => {
              const bottle = bottles[index];
              return (
                <InventorySlot
                  key={name}
                  size="lg"
                  label={isFilled(bottle) ? undefined : m.common.emptyNamed(name)}
                  className={styles.bottle}
                >
                  {isFilled(bottle) ? (
                    bottle
                  ) : (
                    <span className={styles.ghost} aria-hidden="true">
                      <PotionIcon size={32} />
                    </span>
                  )}
                </InventorySlot>
              );
            })}
          </div>
        </div>
      </div>
      <p className={styles.status} aria-live="polite">
        {statusText}
      </p>
    </div>
  );
});
