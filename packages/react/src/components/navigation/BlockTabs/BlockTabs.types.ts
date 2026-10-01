import type { HTMLAttributes, ReactNode } from "react";

export interface BlockTabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface BlockTabsProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> {
  items: BlockTabItem[];
  /** Controlled active tab id. */
  value?: string;
  /** Initially active tab id. Defaults to the first enabled tab. */
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  /** Accessible name of the tab list. */
  label?: string;
  /** Stretch tabs to fill the width. */
  fullWidth?: boolean;
}
