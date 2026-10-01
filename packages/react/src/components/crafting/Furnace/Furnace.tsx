import { ArrowIcon, FireIcon } from "@block-ui/icons";
import { forwardRef, type CSSProperties, type ReactNode } from "react";
import { cx } from "../../../utils/cx";
import { clamp } from "../../../utils/number";
import { InventorySlot } from "../../inventory/InventorySlot/InventorySlot";
import { CraftingResult } from "../CraftingResult/CraftingResult";
import styles from "./Furnace.module.css";
import type { FurnaceProps, FurnaceState } from "./Furnace.types";

const present = (node: ReactNode) => node !== undefined && node !== null && node !== false;

/** Derives the furnace state from its slots (PRD §33). */
export function getFurnaceState({
  input,
  fuel,
  result,
  progress = 0,
  burning = false,
}: Pick<FurnaceProps, "input" | "fuel" | "result" | "progress" | "burning">): FurnaceState {
  if (progress >= 100) return "complete";
  if (burning && progress > 0) return "processing";
  if (burning) return "burning";
  if (present(input) && !present(fuel)) return "noFuel";
  if (!present(input) && present(result)) return "complete";
  return "idle";
}

const defaultLabels: Record<FurnaceState, string> = {
  idle: "Idle",
  burning: "Burning",
  processing: "Smelting",
  complete: "Complete",
  noFuel: "No fuel",
};

/**
 * Furnace UI: input and fuel slots, a flame, a progress arrow and a result
 * slot. States: idle, burning, processing, complete, no fuel.
 */
export const Furnace = forwardRef<HTMLDivElement, FurnaceProps>(function Furnace(
  {
    input,
    fuel,
    result,
    progress = 0,
    burning = false,
    fuelLevel,
    state,
    onTakeResult,
    statusLabels,
    label = "Furnace",
    className,
    ...rest
  },
  ref,
) {
  const current = state ?? getFurnaceState({ input, fuel, result, progress, burning });
  const pct = clamp(progress, 0, 100);
  const flame = burning ? clamp(fuelLevel ?? 100, 0, 100) : 0;
  const labels = { ...defaultLabels, ...statusLabels };
  const statusText = current === "processing" ? `${labels.processing} ${Math.round(pct)}%` : labels[current];

  return (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      data-state={current}
      className={cx(styles.furnace, className)}
      style={{ "--block-furnace-progress": `${pct}%`, "--block-furnace-flame": `${flame}%` } as CSSProperties}
      {...rest}
    >
      <div className={styles.layout}>
        <div className={styles.inputs}>
          <div role="group" aria-label="Input">
            <InventorySlot size="lg" label={present(input) ? undefined : "Input: empty"}>
              {input}
            </InventorySlot>
          </div>
          <span className={styles.flame} data-lit={burning || undefined} aria-hidden="true">
            <span className={styles.flameBase}>
              <FireIcon size={32} />
            </span>
            <span className={styles.flameFill}>
              <FireIcon size={32} />
            </span>
          </span>
          <div role="group" aria-label="Fuel">
            <InventorySlot size="lg" label={present(fuel) ? undefined : "Fuel: empty"}>
              {fuel}
            </InventorySlot>
          </div>
        </div>
        <div
          role="progressbar"
          aria-label="Smelting progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pct)}
          className={styles.arrow}
        >
          <span className={styles.arrowBase} aria-hidden="true">
            <ArrowIcon size={40} />
          </span>
          <span className={styles.arrowFill} aria-hidden="true">
            <ArrowIcon size={40} />
          </span>
        </div>
        <CraftingResult label="Result" onTake={onTakeResult}>
          {result}
        </CraftingResult>
      </div>
      <p className={styles.status} aria-live="polite">
        {statusText}
      </p>
    </div>
  );
});
