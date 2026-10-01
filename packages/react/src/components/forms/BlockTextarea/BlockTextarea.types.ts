import type { TextareaHTMLAttributes } from "react";

export interface BlockTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  /** Show a live `count / maxLength` counter when `maxLength` is set. @default true */
  showCount?: boolean;
  wrapperClassName?: string;
}
