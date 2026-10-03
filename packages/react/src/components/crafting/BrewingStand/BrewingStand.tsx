import { BlazePowderIcon, PotionIcon } from "@malilion/block-ui-icons";
import { forwardRef, type CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import { clamp } from "../../../utils/number";
import { InventorySlot } from "../../inventory/InventorySlot/InventorySlot";
import styles from "./BrewingStand.module.css";
import type { BrewingStandProps, BrewingState } from "./BrewingStand.types";
import { getBrewingState, isFilled } from "./BrewingStand.utils";

const defaultLabels: Record<BrewingState, string> = {
  idle: "Idle",
  brewing: "Brewing",
  complete: "Complete",
  noFuel: "No fuel",
};

const BOTTLE_NAMES = ["Left bottle", "Middle bottle", "Right bottle"] as const;

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
    label = "Brewing stand",
    className,
    ...rest
  },
  ref,
) {
  const current = state ?? getBrewingState({ ingredient, bottles, progress, fuelLevel });
  const pct = clamp(progress, 0, 100);
  const fuelPct = clamp(fuelLevel, 0, 100);
  const labels = { ...defaultLabels, ...statusLabels };
  const statusText =
    current === "brewing" ? `${labels.brewing} ${Math.round(pct)}%` : labels[current];

  return (
    <div
      ref={ref}
      role="group"
      aria-label={label}
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
          <InventorySlot size="md" label={isFilled(fuel) ? undefined : "Fuel: empty"}>
            {fuel ?? (
              <span className={styles.ghost} aria-hidden="true">
                <BlazePowderIcon size={24} />
              </span>
            )}
          </InventorySlot>
          <div
            role="meter"
            aria-label="Fuel"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(fuelPct)}
            className={styles.gauge}
          >
            <span className={styles.gaugeFill} />
          </div>
        </div>
        <div className={styles.center}>
          <InventorySlot size="lg" label={isFilled(ingredient) ? undefined : "Ingredient: empty"}>
            {ingredient}
          </InventorySlot>
          <div
            role="progressbar"
            aria-label="Brewing progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pct)}
            className={styles.progress}
          >
            <span className={styles.progressFill} />
          </div>
          <div className={styles.bottles}>
            {BOTTLE_NAMES.map((name, index) => {
              const bottle = bottles[index];
              return (
                <InventorySlot
                  key={name}
                  size="lg"
                  label={isFilled(bottle) ? undefined : `${name}: empty`}
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
