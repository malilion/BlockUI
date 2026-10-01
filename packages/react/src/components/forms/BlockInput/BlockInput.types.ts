import type { InputHTMLAttributes, ReactNode } from "react";

export interface BlockInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** Error message. Sets `aria-invalid` and is announced via `aria-describedby`. */
  error?: string;
  /** Marks the value as valid (green border). */
  success?: boolean;
  helperText?: string;
  /** Icon shown inside the field, before the text. */
  startIcon?: ReactNode;
  /** Element shown inside the field, after the text. */
  endAdornment?: ReactNode;
  /** Class name for the outer field wrapper. */
  wrapperClassName?: string;
}
