import type { FieldsetHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

export interface BlockRadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: ReactNode;
  description?: ReactNode;
  value: string;
}

export interface BlockRadioOption {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export interface BlockRadioGroupProps
  extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, "onChange" | "defaultValue"> {
  /** Group label rendered as the `<legend>`. */
  label?: ReactNode;
  /** Shared `name` for the native radios. Generated when omitted. */
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options?: BlockRadioOption[];
  /** @default "vertical" */
  orientation?: "horizontal" | "vertical";
  error?: string;
  helperText?: string;
  required?: boolean;
  children?: ReactNode;
}
