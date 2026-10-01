import type { InputHTMLAttributes } from "react";

export type BlockSliderVariant =
  "grass" | "water" | "diamond" | "emerald" | "gold" | "redstone" | "primary";

export interface BlockSliderProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "defaultValue" | "size"
> {
  label?: string;
  value?: number;
  defaultValue?: number;
  /** Called with the numeric value. */
  onValueChange?: (value: number) => void;
  /** @default 0 */
  min?: number;
  /** @default 100 */
  max?: number;
  /** @default 1 */
  step?: number;
  /** Show the current value next to the label. @default true */
  showValue?: boolean;
  /** Formats the displayed value and `aria-valuetext`. */
  formatValue?: (value: number) => string;
  /** Fill material. @default "primary" */
  variant?: BlockSliderVariant;
  error?: string;
  helperText?: string;
  wrapperClassName?: string;
}
