import { CloseIcon } from "@block-ui/icons";
import { forwardRef, useEffect, useId, useRef, type KeyboardEvent, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "../../../hooks/useFocusTrap";
import { usePortalContainer } from "../../../provider/context";
import { cx } from "../../../utils/cx";
import { mergeRefs } from "../../../utils/refs";
import styles from "./BlockModal.module.css";
import type { BlockModalProps } from "./BlockModal.types";

let openModals = 0;

/**
 * Accessible modal dialog: focus trap, `Escape` to close, overlay, focus
 * restoration and `aria-modal` dialog semantics (PRD §45).
 */
export const BlockModal = forwardRef<HTMLDivElement, BlockModalProps>(function BlockModal(
  {
    open,
    onClose,
    title,
    description,
    children,
    footer,
    size = "md",
    closeOnOverlayClick = true,
    closeOnEscape = true,
    hideCloseButton = false,
    initialFocusRef,
    role = "dialog",
    icon,
    className,
    ...rest
  },
  ref,
) {
  const container = usePortalContainer();
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useFocusTrap(dialogRef, open && container !== null, { initialFocus: initialFocusRef });

  useEffect(() => {
    if (!open) return undefined;
    openModals += 1;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      openModals -= 1;
      if (openModals === 0) document.body.style.overflow = previous;
    };
  }, [open]);

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
      onMouseDown={handleOverlayClick}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={mergeRefs(dialogRef, ref)}
        role={role}
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        data-size={size}
        className={cx(styles.dialog, className)}
        {...rest}
      >
        <div className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          {hideCloseButton ? null : (
            <button type="button" className={styles.close} aria-label="Close" onClick={onClose}>
              <CloseIcon size={16} />
            </button>
          )}
        </div>
        <div className={styles.body}>
          {icon ? (
            <div className={styles.icon} aria-hidden="true">
              {icon}
            </div>
          ) : null}
          {description ? (
            <div id={descriptionId} className={styles.description}>
              {description}
            </div>
          ) : null}
          {children}
        </div>
        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </div>
    </div>,
    container,
  );
});
