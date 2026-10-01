import type { HTMLAttributes, ReactNode } from "react";

export interface HotbarNavigationItem {
  id: string;
  label: string;
  icon: ReactNode;
  href?: string;
  badge?: ReactNode;
}

export interface HotbarNavigationProps extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  items: HotbarNavigationItem[];
  /** Active item id (controlled). */
  value?: string;
  /** Initially active item id. */
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  /** Maximum visible items (PRD §48). @default 5 */
  maxItems?: number;
  /** Fix to the bottom of the viewport. @default false */
  fixed?: boolean;
  /** Only show below 768px (pair with a responsive `BlockSidebar`). @default false */
  mobileOnly?: boolean;
  /** Accessible name. @default "Quick navigation" */
  label?: string;
}
