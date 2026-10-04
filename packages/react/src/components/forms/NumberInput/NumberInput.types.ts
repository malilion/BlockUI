import type { InputHTMLAttributes } from "react";

export interface NumberInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "defaultValue" | "onChange" | "type" | "min" | "max" | "step" | "size"
> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  /** Controlled value; `null` is empty. */
  value?: number | null;
  /** Initial value when uncontrolled. @default null */
  defaultValue?: number | null;
  /** Called with the committed value (on step, Enter or blur). */
  onValueChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  /** Amount per step; its decimals set the precision. @default 1 */
  step?: number;
  /** Class name for the outer field wrapper. */
  wrapperClassName?: string;
}
