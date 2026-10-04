import type { HTMLAttributes, MouseEvent, ReactNode } from "react";

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  icon?: ReactNode;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** Trail items. The last item is the current page. */
  items: BreadcrumbItem[];
  /** Separator between items. Defaults to a pixel chevron. */
  separator?: ReactNode;
  /** Accessible name. @default messages.breadcrumb.label ("Breadcrumb") */
  label?: string;
}
