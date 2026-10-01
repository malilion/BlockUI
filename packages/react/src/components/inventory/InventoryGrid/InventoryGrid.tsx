import {
  Children,
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { useControllableState } from "../../../hooks/useControllableState";
import { cx } from "../../../utils/cx";
import { InventorySlot } from "../InventorySlot/InventorySlot";
import {
  InventoryGridContext,
  SlotIndexContext,
  type InventoryGridContextValue,
} from "./context";
import styles from "./InventoryGrid.module.css";
import type { InventoryGridProps } from "./InventoryGrid.types";

function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size));
  return rows;
}

/**
 * CSS-grid inventory with ARIA grid semantics and roving focus.
 *
 * Keyboard: arrows move, Home/End jump within a row (Ctrl for the whole grid),
 * Enter/Space selects, Escape closes a slot tooltip.
 */
export const InventoryGrid = forwardRef<HTMLDivElement, InventoryGridProps>(function InventoryGrid(
  {
    columns = 9,
    rows,
    slotSize = "md",
    children,
    selectedIndex,
    defaultSelectedIndex = null,
    onSelectedIndexChange,
    selectionFollowsFocus = false,
    wrap = false,
    label = "Inventory",
    className,
    onKeyDown,
    ...rest
  },
  ref,
) {
  const cols = Math.max(1, Math.floor(columns));
  const items: ReactNode[] = Children.toArray(children);
  if (rows !== undefined) {
    for (let i = items.length; i < cols * rows; i += 1) {
      items.push(<InventorySlot key={`block-empty-${i}`} />);
    }
  }
  const count = items.length;

  const [selected, setSelected] = useControllableState<number | null>({
    value: selectedIndex,
    defaultValue: defaultSelectedIndex,
    onChange: (index) => {
      if (index !== null) onSelectedIndexChange?.(index);
    },
  });

  const [focusedIndex, setFocusedIndex] = useState(selected ?? 0);
  const [previousSelected, setPreviousSelected] = useState(selected);
  if (selected !== previousSelected) {
    setPreviousSelected(selected);
    if (selected !== null) setFocusedIndex(selected);
  }
  const tabStop = Math.min(focusedIndex, Math.max(0, count - 1));

  const cells = useRef(new Map<number, HTMLElement>());
  const registerCell = useCallback((index: number, element: HTMLElement | null) => {
    if (element) cells.current.set(index, element);
    else cells.current.delete(index);
  }, []);

  const context = useMemo<InventoryGridContextValue>(
    () => ({
      focusedIndex: tabStop,
      selectedIndex: selected,
      setFocusedIndex,
      select: setSelected,
      registerCell,
    }),
    [tabStop, selected, setSelected, registerCell],
  );

  const moveTo = (index: number) => {
    setFocusedIndex(index);
    cells.current.get(index)?.focus();
    if (selectionFollowsFocus) {
      const cell = cells.current.get(index);
      if (cell?.getAttribute("aria-disabled") !== "true") setSelected(index);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || count === 0) return;
    const current = tabStop;
    const rowStart = current - (current % cols);
    const rowEnd = Math.min(rowStart + cols - 1, count - 1);
    let next: number | null = null;

    switch (event.key) {
      case "ArrowRight":
        next = current < rowEnd ? current + 1 : wrap ? rowStart : current;
        break;
      case "ArrowLeft":
        next = current > rowStart ? current - 1 : wrap ? rowEnd : current;
        break;
      case "ArrowDown":
        next = current + cols < count ? current + cols : current;
        break;
      case "ArrowUp":
        next = current - cols >= 0 ? current - cols : current;
        break;
      case "Home":
        next = event.ctrlKey ? 0 : rowStart;
        break;
      case "End":
        next = event.ctrlKey ? count - 1 : rowEnd;
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        cells.current.get(current)?.click();
        return;
      default:
        return;
    }

    event.preventDefault();
    if (next !== current) moveTo(next);
  };

  return (
    <div
      ref={ref}
      role="grid"
      tabIndex={-1}
      aria-label={label}
      aria-rowcount={Math.ceil(count / cols)}
      aria-colcount={cols}
      data-size={slotSize}
      className={cx(styles.grid, className)}
      style={{ "--block-columns": cols } as CSSProperties}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <InventoryGridContext.Provider value={context}>
        {chunk(items, cols).map((row, rowIndex) => (
          <div key={rowIndex} role="row" className={styles.row}>
            {row.map((item, colIndex) => (
              <SlotIndexContext.Provider key={colIndex} value={rowIndex * cols + colIndex}>
                {item}
              </SlotIndexContext.Provider>
            ))}
          </div>
        ))}
      </InventoryGridContext.Provider>
    </div>
  );
});
