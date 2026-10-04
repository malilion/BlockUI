import { CloseIcon } from "@malilion/block-ui-icons";
import { forwardRef, useId, useRef, type KeyboardEvent, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "../../../hooks/useFocusTrap";
import { useScrollLock } from "../../../hooks/useScrollLock";
import { useBlockUIMessages, usePortalContainer } from "../../../provider/context";
import { cx } from "../../../utils/cx";
import { mergeRefs } from "../../../utils/refs";
import styles from "./Drawer.module.css";
import type { DrawerProps } from "./Drawer.types";

/**
 * Panel that slides in from an edge (inventory, settings, mobile menu). Modal
 * like `BlockModal`: focus trap, Escape, overlay click and focus restoration.
 */
export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(function Drawer(
  {
    open,
    onClose,
    title,
    children,
    footer,
    side = "right",
    size = "md",
    closeOnOverlayClick = true,
    closeOnEscape = true,
    initialFocusRef,
    className,
    ...rest
  },
  ref,
) {
  const m = useBlockUIMessages();
  const container = usePortalContainer();
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useFocusTrap(panelRef, open && container !== null, { initialFocus: initialFocusRef });
  useScrollLock(open);

  if (!open || !container) return null;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && closeOnEscape) {
      event.stopPropagation();
      onClose();
    }
  };

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) onClose();
  };

  return createPortal(
    <div
      role="presentation"
      className={styles.overlay}
      data-side={side}
      onMouseDown={handleOverlayClick}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={mergeRefs(panelRef, ref)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        data-side={side}
        data-size={size}
        className={cx(styles.drawer, className)}
        {...rest}
      >
        <div className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          <button
            type="button"
            className={styles.close}
            aria-label={m.common.close}
            onClick={onClose}
          >
            <CloseIcon size={16} />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </div>
    </div>,
    container,
  );
});
