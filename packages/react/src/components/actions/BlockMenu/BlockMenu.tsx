import { ChevronDownIcon } from "@malilion/block-ui-icons";
import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { useAnchoredPosition } from "../../../hooks/useAnchoredPosition";
import { usePortalContainer } from "../../../provider/context";
import { cx } from "../../../utils/cx";
import { mergeRefs } from "../../../utils/refs";
import { BlockButton } from "../BlockButton/BlockButton";
import iconButtonStyles from "../IconButton/IconButton.module.css";
import styles from "./BlockMenu.module.css";
import type { BlockMenuItem, BlockMenuProps } from "./BlockMenu.types";
import { isMenuItem, typeaheadIndex } from "./BlockMenu.utils";

type FocusTarget = "first" | "last" | number;

/**
 * Dropdown menu button following the WAI-ARIA menu button pattern: arrow keys
 * move with wrap-around, Home/End jump, letters type-ahead, Enter/Space choose
 * and Escape closes — focus always returns to the trigger. The menu renders in
 * the provider's overlay layer, so scroll containers (tables) never clip it.
 */
export const BlockMenu = forwardRef<HTMLDivElement, BlockMenuProps>(function BlockMenu(
  {
    label,
    items,
    onSelect,
    variant = "stone",
    size = "md",
    icon,
    iconOnly = false,
    align = "start",
    placement = "bottom",
    disabled = false,
    onOpenChange,
    className,
    ...rest
  },
  ref,
) {
  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const menuId = `${baseId}-menu`;
  const container = usePortalContainer();
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef(new Map<string, HTMLButtonElement>());
  const [open, setOpenState] = useState(false);
  const [focusTarget, setFocusTarget] = useState<FocusTarget | null>(null);

  const position = useAnchoredPosition(triggerRef, menuRef, open, {
    side: placement,
    align: align === "end" ? "end" : "start",
    gap: 4,
  });
  const isInside = (node: Node | null) =>
    Boolean(node && (rootRef.current?.contains(node) || menuRef.current?.contains(node)));

  const menuItems = items.filter(isMenuItem);
  const enabledIndexes = menuItems.flatMap((item, index) => (item.disabled ? [] : [index]));

  const setOpen = (next: boolean) => {
    setOpenState(next);
    onOpenChange?.(next);
  };

  const openMenu = (target: FocusTarget) => {
    if (disabled || enabledIndexes.length === 0) return;
    setOpen(true);
    setFocusTarget(target);
  };

  const closeMenu = (returnFocus: boolean) => {
    setOpen(false);
    setFocusTarget(null);
    if (returnFocus) triggerRef.current?.focus();
  };

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
      if (!isInside(event.target as Node)) closeMenu(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const choose = (item: BlockMenuItem) => {
    if (item.disabled) return;
    closeMenu(true);
    item.onSelect?.();
    onSelect?.(item.id);
  };

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openMenu("first");
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      openMenu("last");
    }
  };

  const onMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = menuItems.findIndex(
      (item) => itemRefs.current.get(item.id) === document.activeElement,
    );
    const position = enabledIndexes.indexOf(current);
    const count = enabledIndexes.length;
    let next: number | undefined;

    switch (event.key) {
      case "ArrowDown":
        next = enabledIndexes[(position + 1) % count];
        break;
      case "ArrowUp":
        next = enabledIndexes[(position - 1 + count) % count];
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
        closeMenu(true);
        return;
      case "Tab":
        // The menu lives in the overlay layer at the end of the page: hand focus back to the
        // trigger first so the browser's Tab continues from the trigger's place in the page.
        closeMenu(true);
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

  const onMenuBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!isInside(event.relatedTarget as Node | null)) closeMenu(false);
  };

  return (
    <div
      ref={mergeRefs(ref, rootRef)}
      className={cx(styles.root, className)}
      data-open={open || undefined}
      {...rest}
    >
      <BlockButton
        ref={triggerRef}
        id={triggerId}
        variant={variant}
        size={size}
        disabled={disabled}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={iconOnly ? label : undefined}
        title={iconOnly ? label : undefined}
        startIcon={iconOnly ? undefined : icon}
        endIcon={
          iconOnly ? undefined : (
            <span className={styles.chevron} aria-hidden="true">
              <ChevronDownIcon size={16} />
            </span>
          )
        }
        className={cx(iconOnly && iconButtonStyles.iconButton)}
        onClick={() => (open ? closeMenu(false) : openMenu("first"))}
        onKeyDown={onTriggerKeyDown}
      >
        {iconOnly ? (
          <span className={iconButtonStyles.icon} aria-hidden="true">
            {icon}
          </span>
        ) : (
          label
        )}
      </BlockButton>
      {container
        ? createPortal(
            <div
              ref={menuRef}
              id={menuId}
              role="menu"
              tabIndex={-1}
              aria-labelledby={triggerId}
              hidden={!open}
              data-align={align}
              data-placement={position?.side ?? placement}
              className={styles.menu}
              style={position?.style}
              onKeyDown={onMenuKeyDown}
              onBlur={onMenuBlur}
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
                    onClick={() => choose(entry)}
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
          )
        : null}
    </div>
  );
});
