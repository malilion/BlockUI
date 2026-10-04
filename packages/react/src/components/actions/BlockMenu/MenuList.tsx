import { useEffect, useRef, type FocusEvent, type KeyboardEvent, type RefObject } from "react";
import { createPortal } from "react-dom";
import type { AnchoredPosition } from "../../../hooks/useAnchoredPosition";
import { usePortalContainer } from "../../../provider/context";
import styles from "./BlockMenu.module.css";
import type { BlockMenuEntry, BlockMenuItem } from "./BlockMenu.types";
import { enabledMenuIndexes, isMenuItem, typeaheadIndex } from "./BlockMenu.utils";

export type MenuFocusTarget = "first" | "last" | number;

export interface MenuListProps {
  id: string;
  items: BlockMenuEntry[];
  open: boolean;
  /** Item to focus once the menu is open and positioned. */
  focusTarget: MenuFocusTarget | null;
  menuRef: RefObject<HTMLDivElement | null>;
  position: AnchoredPosition | null;
  labelledBy?: string;
  label?: string;
  align?: "start" | "end";
  placement?: string;
  /** Whether a node belongs to the menu or its trigger (outside clicks / blur close the menu). */
  isInside: (node: Node | null) => boolean;
  onClose: (returnFocus: boolean) => void;
  onChoose: (item: BlockMenuItem) => void;
}

/**
 * Internal `role="menu"` shared by `BlockMenu` and `ContextMenu`: rendered in the
 * overlay layer, with roving focus, wrap-around arrows, Home / End, type-ahead,
 * Escape / Tab to close and outside clicks closing it.
 */
export function MenuList({
  id,
  items,
  open,
  focusTarget,
  menuRef,
  position,
  labelledBy,
  label,
  align,
  placement,
  isInside,
  onClose,
  onChoose,
}: MenuListProps) {
  const container = usePortalContainer();
  const itemRefs = useRef(new Map<string, HTMLButtonElement>());
  const menuItems = items.filter(isMenuItem);
  const enabledIndexes = enabledMenuIndexes(items);

  const focusItem = (index: number) => {
    const item = menuItems[index];
    if (item) itemRefs.current.get(item.id)?.focus();
  };

  useEffect(() => {
    if (!open || focusTarget === null || !position) return;
    const index =
      focusTarget === "first"
        ? enabledIndexes[0]
        : focusTarget === "last"
          ? enabledIndexes[enabledIndexes.length - 1]
          : focusTarget;
    if (index !== undefined) focusItem(index);
    // Focus once the menu is open and positioned, or when the target changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, focusTarget, position !== null]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!isInside(event.target as Node)) onClose(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = menuItems.findIndex(
      (item) => itemRefs.current.get(item.id) === document.activeElement,
    );
    const at = enabledIndexes.indexOf(current);
    const count = enabledIndexes.length;
    let next: number | undefined;

    switch (event.key) {
      case "ArrowDown":
        next = enabledIndexes[(at + 1) % count];
        break;
      case "ArrowUp":
        next = enabledIndexes[(at - 1 + count) % count];
        break;
      case "Home":
        next = enabledIndexes[0];
        break;
      case "End":
        next = enabledIndexes[count - 1];
        break;
      case "Escape":
        event.preventDefault();
        event.stopPropagation();
        onClose(true);
        return;
      case "Tab":
        // The menu lives in the overlay layer at the end of the page: hand focus back to the
        // opener first so the browser's Tab continues from the opener's place in the page.
        onClose(true);
        return;
      default:
        if (event.key.length === 1 && /\S/.test(event.key) && !event.ctrlKey && !event.metaKey) {
          const match = typeaheadIndex(menuItems, current, event.key);
          if (match >= 0) next = match;
        }
    }
    if (next === undefined) return;
    event.preventDefault();
    focusItem(next);
  };

  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!isInside(event.relatedTarget as Node | null)) onClose(false);
  };

  if (!container) return null;

  return createPortal(
    <div
      ref={menuRef}
      id={id}
      role="menu"
      tabIndex={-1}
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : label}
      hidden={!open}
      data-align={align}
      data-placement={position?.side ?? placement}
      className={styles.menu}
      style={position?.style}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    >
      {items.map((entry, index) => {
        if (!isMenuItem(entry)) {
          return (
            <div
              key={entry.id ?? `separator-${index}`}
              role="separator"
              className={styles.separator}
            />
          );
        }
        return (
          <button
            key={entry.id}
            ref={(element) => {
              if (element) itemRefs.current.set(entry.id, element);
              else itemRefs.current.delete(entry.id);
            }}
            type="button"
            role="menuitem"
            tabIndex={-1}
            aria-disabled={entry.disabled || undefined}
            data-danger={entry.danger || undefined}
            className={styles.item}
            onClick={() => {
              if (!entry.disabled) onChoose(entry);
            }}
          >
            <span className={styles.icon} aria-hidden="true">
              {entry.icon}
            </span>
            <span className={styles.label}>{entry.label}</span>
            {entry.shortcut ? (
              <kbd className={styles.shortcut} aria-hidden="true">
                {entry.shortcut}
              </kbd>
            ) : null}
          </button>
        );
      })}
    </div>,
    container,
  );
}
