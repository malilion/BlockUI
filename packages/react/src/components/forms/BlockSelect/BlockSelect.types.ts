import type { ReactNode, SelectHTMLAttributes } from "react";

export interface BlockSelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface BlockSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  /** Options. Alternatively pass `<option>` children. */
  options?: BlockSelectOption[];
  /** Adds a disabled, empty first option. */
  placeholder?: string;
  wrapperClassName?: string;
}
