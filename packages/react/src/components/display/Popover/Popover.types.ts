import type { HTMLAttributes, ReactElement, ReactNode } from "react";

export interface PopoverProps extends Omit<HTMLAttributes<HTMLSpanElement>, "content" | "title"> {
  /** Panel content — may contain buttons, links and form fields. */
  content: ReactNode;
  /** A single button that toggles the popover. It receives `aria-expanded` / `aria-controls`. */
  children: ReactElement<{
    "aria-expanded"?: boolean;
    "aria-controls"?: string;
    "aria-haspopup"?: "dialog";
    onClick?: (event: never) => void;
  }>;
  /** Heading of the panel and its accessible name. */
  title?: ReactNode;
  /** Accessible name when there is no `title`. */
  label?: string;
  /** Preferred side; flips when there is no room. @default "bottom" */
  placement?: "top" | "bottom" | "left" | "right";
  /** Alignment along the trigger edge. @default "center" */
  align?: "start" | "center" | "end";
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. @default false */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}
