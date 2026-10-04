import type { HTMLAttributes, ReactNode } from "react";

export interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue"> {
  items: AccordionItem[];
  /** `single` keeps at most one section open. @default "single" */
  type?: "single" | "multiple";
  /** Controlled open section ids. */
  value?: string[];
  /** Initially open section ids. @default [] */
  defaultValue?: string[];
  onValueChange?: (open: string[]) => void;
  /** Heading level wrapping each trigger. @default 3 */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}
