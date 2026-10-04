import type { AnchorHTMLAttributes, HTMLAttributes, MouseEvent, ReactNode } from "react";

export interface BlockSidebarProps extends HTMLAttributes<HTMLElement> {
  /** Brand / logo area at the top. */
  header?: ReactNode;
  /** Content pinned to the bottom. */
  footer?: ReactNode;
  /** Force the icon-only rail. */
  collapsed?: boolean;
  /**
   * Follow the PRD breakpoints: collapsed on tablet (768–1023px) and hidden on
   * mobile (< 768px, use `HotbarNavigation` there). @default true
   */
  responsive?: boolean;
  /** Accessible name of the `<nav>`. @default messages.sidebar.label ("Main") */
  label?: string;
  children?: ReactNode;
}

export interface SidebarItemProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "onClick" | "children"
> {
  icon?: ReactNode;
  /** Current page — sets `aria-current="page"`. */
  active?: boolean;
  /** Renders a link when set, otherwise a button. */
  href?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  /** Small count or label on the right (hidden when collapsed). */
  badge?: ReactNode;
  disabled?: boolean;
  children: ReactNode;
}
