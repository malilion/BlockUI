import { useRef } from "react";
import { BlockButton } from "../../actions/BlockButton/BlockButton";
import { BlockModal } from "../Modal/BlockModal";
import type { ConfirmDialogProps } from "./ConfirmDialog.types";

/**
 * Confirmation built on `BlockModal` with `role="alertdialog"`. For the
 * `danger` variant the safe action (Cancel) receives focus first.
 */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  onConfirm,
  onCancel,
  loading = false,
  icon,
  children,
  className,
}: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);
  const danger = variant === "danger";

  return (
    <BlockModal
      open={open}
      onClose={onCancel}
      title={title}
      description={description}
      role="alertdialog"
      size="sm"
      icon={icon}
      hideCloseButton
      closeOnOverlayClick={!loading}
      closeOnEscape={!loading}
      initialFocusRef={danger ? cancelRef : confirmRef}
      className={className}
      data-variant={variant}
      footer={
        <>
          <BlockButton ref={cancelRef} variant="stone" onClick={onCancel} disabled={loading}>
            {cancelText}
          </BlockButton>
          <BlockButton
            ref={confirmRef}
            variant={danger ? "redstone" : "grass"}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmText}
          </BlockButton>
        </>
      }
    >
      {children}
    </BlockModal>
  );
}
