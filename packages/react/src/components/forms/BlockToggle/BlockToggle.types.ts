import type { InputHTMLAttributes, ReactNode } from "react";

export interface BlockToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "role"> {
  label?: ReactNode;
  description?: ReactNode;
  /** Called with the new checked state. */
  onCheckedChange?: (checked: boolean) => void;
  /** @default "md" */
  size?: "sm" | "md";
  /** Put the label before the switch. */
  labelPosition?: "start" | "end";
}
