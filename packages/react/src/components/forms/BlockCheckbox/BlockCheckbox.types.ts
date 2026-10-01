import type { InputHTMLAttributes, ReactNode } from "react";

export interface BlockCheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> {
  label?: ReactNode;
  /** Secondary text under the label. */
  description?: ReactNode;
  /** Shows a dash and sets the native `indeterminate` state. */
  indeterminate?: boolean;
  error?: string;
}
