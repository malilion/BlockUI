import type { HTMLAttributes, ReactNode, RefObject } from "react";

export interface BlockModalProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  open: boolean;
  /** Called on Escape, overlay click or the close button. */
  onClose: () => void;
  title: ReactNode;
  /** Short text under the title, linked via `aria-describedby`. */
  description?: ReactNode;
  children?: ReactNode;
  /** Action row (buttons). */
  footer?: ReactNode;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** @default true */
  closeOnOverlayClick?: boolean;
  /** @default true */
  closeOnEscape?: boolean;
  /** Hide the × button in the header. */
  hideCloseButton?: boolean;
  /** Element focused when the modal opens. Defaults to the first focusable element. */
  initialFocusRef?: RefObject<HTMLElement | null>;
  /** `alertdialog` for confirmations. @default "dialog" */
  role?: "dialog" | "alertdialog";
  /** Icon shown above the title. */
  icon?: ReactNode;
}
