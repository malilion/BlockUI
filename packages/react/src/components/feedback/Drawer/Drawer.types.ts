import type { HTMLAttributes, ReactNode, RefObject } from "react";

export interface DrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  open: boolean;
  /** Called on Escape, overlay click or the close button. */
  onClose: () => void;
  title: ReactNode;
  children?: ReactNode;
  /** Action row pinned to the bottom. */
  footer?: ReactNode;
  /** Edge the drawer slides from. @default "right" */
  side?: "left" | "right" | "bottom";
  /** Width (or height for `bottom`). @default "md" */
  size?: "sm" | "md" | "lg";
  /** @default true */
  closeOnOverlayClick?: boolean;
  /** @default true */
  closeOnEscape?: boolean;
  /** Element focused when the drawer opens. Defaults to the first focusable element. */
  initialFocusRef?: RefObject<HTMLElement | null>;
}
