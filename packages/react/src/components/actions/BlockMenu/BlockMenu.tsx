import { ChevronDownIcon } from "@malilion/block-ui-icons";
import { forwardRef, useId, useRef, useState, type KeyboardEvent } from "react";
import { useAnchoredPosition } from "../../../hooks/useAnchoredPosition";
import { cx } from "../../../utils/cx";
import { mergeRefs } from "../../../utils/refs";
import { BlockButton } from "../BlockButton/BlockButton";
import iconButtonStyles from "../IconButton/IconButton.module.css";
import styles from "./BlockMenu.module.css";
import type { BlockMenuItem, BlockMenuProps } from "./BlockMenu.types";
import { enabledMenuIndexes } from "./BlockMenu.utils";
import { MenuList, type MenuFocusTarget } from "./MenuList";

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
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpenState] = useState(false);
  const [focusTarget, setFocusTarget] = useState<MenuFocusTarget | null>(null);

  const position = useAnchoredPosition(triggerRef, menuRef, open, {
    side: placement,
    align: align === "end" ? "end" : "start",
    gap: 4,
  });
  const isInside = (node: Node | null) =>
    Boolean(node && (rootRef.current?.contains(node) || menuRef.current?.contains(node)));

  const setOpen = (next: boolean) => {
    setOpenState(next);
    onOpenChange?.(next);
  };

  const openMenu = (target: MenuFocusTarget) => {
    if (disabled || enabledMenuIndexes(items).length === 0) return;
    setOpen(true);
    setFocusTarget(target);
  };

  const closeMenu = (returnFocus: boolean) => {
    setOpen(false);
    setFocusTarget(null);
    if (returnFocus) triggerRef.current?.focus();
  };

  const choose = (item: BlockMenuItem) => {
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
      <MenuList
        id={menuId}
        items={items}
        open={open}
        focusTarget={focusTarget}
        menuRef={menuRef}
        position={position}
        labelledBy={triggerId}
        align={align}
        placement={placement}
        isInside={isInside}
        onClose={closeMenu}
        onChoose={choose}
      />
    </div>
  );
});
