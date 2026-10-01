import type { ReactNode } from "react";

export interface ConfirmDialogProps {
  open: boolean;
  title: ReactNode;
  description?: ReactNode;
  /** @default "Confirm" */
  confirmText?: string;
  /** @default "Cancel" */
  cancelText?: string;
  /** `danger` uses a redstone confirm button and focuses Cancel first. @default "default" */
  variant?: "default" | "danger";
  onConfirm: () => void;
  /** Called on Cancel, Escape or overlay click. */
  onCancel: () => void;
  /** Shows a loading state on the confirm button. */
  loading?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}
