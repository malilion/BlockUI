import type { HTMLAttributes, ReactNode } from "react";

export const alertVariants = ["success", "info", "warning", "error"] as const;

export type AlertVariant = (typeof alertVariants)[number];

export interface BlockAlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** @default "info" */
  variant?: AlertVariant;
  title?: ReactNode;
  /** Description content. */
  children?: ReactNode;
  /** Custom icon, or `false` to hide it. Defaults to the variant icon. */
  icon?: ReactNode | false;
  /** Renders a dismiss button when provided. */
  onClose?: () => void;
  /** Accessible label for the dismiss button. @default messages.common.dismiss ("Dismiss") */
  closeLabel?: string;
  /** Extra actions (e.g. a button) shown after the text. */
  action?: ReactNode;
}
