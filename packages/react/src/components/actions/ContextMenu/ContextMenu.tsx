import { forwardRef, useId, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { useBlockUIMessages } from "../../../provider/context";
import { useAnchoredPosition } from "../../../hooks/useAnchoredPosition";
import { cx } from "../../../utils/cx";
import { mergeRefs } from "../../../utils/refs";
import type { BlockMenuItem } from "../BlockMenu/BlockMenu.types";
import { enabledMenuIndexes } from "../BlockMenu/BlockMenu.utils";
import { MenuList, type MenuFocusTarget } from "../BlockMenu/MenuList";
import styles from "./ContextMenu.module.css";
import type { ContextMenuProps } from "./ContextMenu.types";

interface Point {
  x: number;
  y: number;
}

/**
 * Right-click menu for an area (an inventory slot, a list row). Opens at the
 * pointer, or at the focused element with Shift+F10 / the Menu key; keyboard
 * behaviour matches `BlockMenu` and focus returns to where it was.
 */
export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(function ContextMenu(
  { children, items, onSelect, label, disabled = false, onOpenChange, className, ...rest },
  ref,
) {
  const m = useBlockUIMessages();
  const menuId = useId();
  const areaRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  const point = useRef<Point>({ x: 0, y: 0 });
  const [open, setOpenState] = useState(false);
  const [focusTarget, setFocusTarget] = useState<MenuFocusTarget | null>(null);

  // A zero-size "element" at the pointer for the shared positioning hook.
  const virtualAnchor = useRef({
    getBoundingClientRect: () =>
      DOMRect.fromRect({ x: point.current.x, y: point.current.y, width: 0, height: 0 }),
  });
  const position = useAnchoredPosition(virtualAnchor, menuRef, open, {
    side: "bottom",
    align: "start",
    gap: 2,
  });

  const setOpen = (next: boolean) => {
    setOpenState(next);
    onOpenChange?.(next);
  };

  const openAt = (x: number, y: number) => {
    if (enabledMenuIndexes(items).length === 0) return;
    returnTo.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    point.current = { x, y };
    setOpen(true);
    setFocusTarget("first");
  };

  const close = (returnFocus: boolean) => {
    setOpen(false);
    setFocusTarget(null);
    if (returnFocus) returnTo.current?.focus();
  };

  const choose = (item: BlockMenuItem) => {
    close(true);
    item.onSelect?.();
    onSelect?.(item.id);
  };

  const onContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    event.preventDefault();
    // Right-clicking does not move focus; remember the clicked control instead when it is focusable.
    const target = (event.target as HTMLElement).closest<HTMLElement>(
      "button, a[href], input, [tabindex]",
    );
    target?.focus({ preventScroll: true });
    openAt(event.clientX, event.clientY);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (event.key === "ContextMenu" || (event.key === "F10" && event.shiftKey)) {
      event.preventDefault();
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      openAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  };

  const isInside = (node: Node | null) => Boolean(node && menuRef.current?.contains(node));

  return (
    // The area only listens for right-clicks and the Menu key bubbling up from the controls inside it.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={mergeRefs(ref, areaRef)}
      className={cx(styles.area, className)}
      data-open={open || undefined}
      onContextMenu={onContextMenu}
      onKeyDown={onKeyDown}
      {...rest}
    >
      {children}
      <MenuList
        id={menuId}
        items={items}
        open={open}
        focusTarget={focusTarget}
        menuRef={menuRef}
        position={position}
        label={label ?? m.contextMenu.label}
        isInside={isInside}
        onClose={close}
        onChoose={choose}
      />
    </div>
  );
});
