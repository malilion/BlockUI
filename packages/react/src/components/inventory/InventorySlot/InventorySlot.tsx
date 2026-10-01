import { LockIcon } from "@block-ui/icons";
import {
  forwardRef,
  useCallback,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type Ref,
} from "react";
import { cx } from "../../../utils/cx";
import { mergeRefs } from "../../../utils/refs";
import { useInventoryGrid, useSlotIndex } from "../InventoryGrid/context";
import styles from "./InventorySlot.module.css";
import type { InventorySlotProps } from "./InventorySlot.types";

type Placement = "right" | "left";

/**
 * A single inventory slot. Inside an `InventoryGrid` it becomes a roving-focus
 * grid cell; standalone it is a toggle button (when `onClick` is set) or a
 * static well.
 */
export const InventorySlot = forwardRef<HTMLElement, InventorySlotProps>(function InventorySlot(
  {
    selected,
    disabled = false,
    locked = false,
    rarity,
    children,
    onClick,
    tooltip,
    label,
    size = "md",
    className,
    onKeyDown,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    ...rest
  },
  ref,
) {
  const grid = useInventoryGrid();
  const index = useSlotIndex();
  const inGrid = grid !== null && index >= 0;
  const inactive = disabled || locked;
  const isSelected = selected ?? (inGrid ? grid.selectedIndex === index : false);
  const empty = children === undefined || children === null || children === false;
  /** Non-interactive wells cannot carry aria-label, so their label is rendered as hidden text. */
  const staticWell = !inGrid && !onClick;

  const tooltipId = useId();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [placement, setPlacement] = useState<Placement>("right");
  const tooltipRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!tooltipOpen || !tooltipRef.current) return;
    const rect = tooltipRef.current.getBoundingClientRect();
    if (placement === "right" && rect.right > window.innerWidth - 8) setPlacement("left");
  }, [tooltipOpen, placement]);

  const register = useCallback(
    (element: HTMLElement | null) => {
      if (inGrid) grid.registerCell(index, element);
    },
    [grid, inGrid, index],
  );

  const openTooltip = () => {
    if (tooltip) setTooltipOpen(true);
  };
  const closeTooltip = () => {
    setTooltipOpen(false);
    setPlacement("right");
  };

  const handleClick = () => {
    if (inGrid) {
      grid.setFocusedIndex(index);
      if (!inactive) grid.select(index);
    }
    if (!inactive) onClick?.();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape" && tooltipOpen) {
      event.stopPropagation();
      closeTooltip();
    }
    if (inGrid && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      handleClick();
    }
    onKeyDown?.(event);
  };

  const content = (
    <>
      <span className={styles.content}>{children}</span>
      {empty && !label ? <span className="block-visually-hidden">Empty slot</span> : null}
      {label && staticWell ? <span className="block-visually-hidden">{label}</span> : null}
      {locked ? (
        <span className={styles.lock} aria-hidden="true">
          <LockIcon size={16} />
        </span>
      ) : null}
      {tooltip ? (
        <div
          ref={tooltipRef}
          id={tooltipId}
          role="tooltip"
          aria-hidden="true"
          hidden={!tooltipOpen}
          className={styles.tooltip}
          data-placement={placement}
        >
          {tooltip}
        </div>
      ) : null}
    </>
  );

  const shared = {
    className: cx(styles.slot, !inGrid && styles[size], className),
    "data-selected": isSelected || undefined,
    "data-disabled": disabled || undefined,
    "data-locked": locked || undefined,
    "data-rarity": rarity,
    "data-empty": empty || undefined,
    "aria-label": staticWell ? undefined : label,
    "aria-describedby": tooltip ? tooltipId : undefined,
    onKeyDown: handleKeyDown,
    onMouseEnter: (event: MouseEvent<HTMLElement>) => {
      openTooltip();
      onMouseEnter?.(event);
    },
    onMouseLeave: (event: MouseEvent<HTMLElement>) => {
      closeTooltip();
      onMouseLeave?.(event);
    },
    onFocus: (event: FocusEvent<HTMLElement>) => {
      openTooltip();
      onFocus?.(event);
    },
    onBlur: (event: FocusEvent<HTMLElement>) => {
      closeTooltip();
      onBlur?.(event);
    },
    ...rest,
  };

  if (inGrid) {
    return (
      <div
        ref={mergeRefs(ref, register)}
        role="gridcell"
        tabIndex={grid.focusedIndex === index ? 0 : -1}
        aria-selected={isSelected}
        aria-disabled={inactive || undefined}
        onClick={handleClick}
        {...shared}
        onKeyDown={handleKeyDown}
      >
        {content}
      </div>
    );
  }

  if (onClick) {
    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        type="button"
        aria-pressed={isSelected}
        aria-disabled={inactive || undefined}
        onClick={handleClick}
        {...shared}
      >
        {content}
      </button>
    );
  }

  return (
    // Non-interactive slots with tooltips must be focusable so keyboard users can trigger the tooltip
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <div ref={ref as Ref<HTMLDivElement>} tabIndex={tooltip ? 0 : undefined} {...shared}>
      {content}
    </div>
  );
});
