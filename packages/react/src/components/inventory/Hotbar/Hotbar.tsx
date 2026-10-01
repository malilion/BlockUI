import { forwardRef, type CSSProperties } from "react";
import { useControllableState } from "../../../hooks/useControllableState";
import { useDigitHotkeys } from "../../../hooks/useDigitHotkeys";
import { cx } from "../../../utils/cx";
import { InventoryGrid } from "../InventoryGrid/InventoryGrid";
import styles from "./Hotbar.module.css";
import type { HotbarProps } from "./Hotbar.types";

/**
 * Nine-slot quick bar. Number keys `1`–`9` select a slot from anywhere on the
 * page (ignored while typing); arrow keys move the selection and wrap around.
 */
export const Hotbar = forwardRef<HTMLDivElement, HotbarProps>(function Hotbar(
  {
    selectedIndex,
    defaultSelectedIndex = 0,
    onSelect,
    children,
    slots = 9,
    hotkeys = true,
    showKeys = true,
    slotSize = "md",
    label = "Hotbar",
    className,
    ...rest
  },
  ref,
) {
  const [current, setCurrent] = useControllableState({
    value: selectedIndex,
    defaultValue: defaultSelectedIndex,
    onChange: onSelect,
  });

  useDigitHotkeys(hotkeys, slots, setCurrent);

  return (
    <div
      className={cx(styles.hotbar, className)}
      data-size={slotSize}
      style={{ "--block-columns": slots } as CSSProperties}
    >
      <InventoryGrid
        ref={ref}
        columns={slots}
        rows={1}
        slotSize={slotSize}
        selectedIndex={current}
        onSelectedIndexChange={setCurrent}
        selectionFollowsFocus
        wrap
        label={label}
        aria-keyshortcuts={hotkeys ? Array.from({ length: Math.min(slots, 9) }, (_, i) => i + 1).join(" ") : undefined}
        {...rest}
      >
        {children}
      </InventoryGrid>
      {showKeys ? (
        <div className={styles.keys} aria-hidden="true">
          {Array.from({ length: slots }, (_, index) => (
            <span key={index} className={styles.key} data-selected={index === current || undefined}>
              {index < 9 ? index + 1 : ""}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
});
