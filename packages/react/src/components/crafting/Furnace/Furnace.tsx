import { ArrowIcon, FireIcon } from "@malilion/block-ui-icons";
import { forwardRef, type CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import { clamp } from "../../../utils/number";
import { useBlockUIMessages } from "../../../provider/context";
import { InventorySlot } from "../../inventory/InventorySlot/InventorySlot";
import { CraftingResult } from "../CraftingResult/CraftingResult";
import styles from "./Furnace.module.css";
import type { FurnaceProps } from "./Furnace.types";
import { getFurnaceState, isPresent } from "./Furnace.utils";

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
    label,
    className,
    ...rest
  },
  ref,
) {
  const m = useBlockUIMessages();
  const current = state ?? getFurnaceState({ input, fuel, result, progress, burning });
  const pct = clamp(progress, 0, 100);
  const flame = burning ? clamp(fuelLevel ?? 100, 0, 100) : 0;
  const labels = { ...m.furnace.status, ...statusLabels };
  const statusText =
    current === "processing" ? `${labels.processing} ${Math.round(pct)}%` : labels[current];

  return (
    <div
      ref={ref}
      role="group"
      aria-label={label ?? m.furnace.label}
      data-state={current}
      className={cx(styles.furnace, className)}
      style={
        {
          "--block-furnace-progress": `${pct}%`,
          "--block-furnace-flame": `${flame}%`,
        } as CSSProperties
      }
      {...rest}
    >
      <div className={styles.layout}>
        <div className={styles.inputs}>
          <div role="group" aria-label={m.common.input}>
            <InventorySlot
              size="lg"
              label={isPresent(input) ? undefined : m.common.emptyNamed(m.common.input)}
            >
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
          <div role="group" aria-label={m.common.fuel}>
            <InventorySlot
              size="lg"
              label={isPresent(fuel) ? undefined : m.common.emptyNamed(m.common.fuel)}
            >
              {fuel}
            </InventorySlot>
          </div>
        </div>
        <div
          role="progressbar"
          aria-label={m.furnace.progress}
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
        <CraftingResult label={m.common.result} onTake={onTakeResult}>
          {result}
        </CraftingResult>
      </div>
      <p className={styles.status} aria-live="polite">
        {statusText}
      </p>
    </div>
  );
});
