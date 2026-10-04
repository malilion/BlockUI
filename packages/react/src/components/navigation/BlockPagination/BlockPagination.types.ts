import type { HTMLAttributes } from "react";

export interface BlockPaginationProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "onChange" | "defaultValue"
> {
  /** Total number of pages. */
  pageCount: number;
  /** Controlled current page (1-based). */
  page?: number;
  /** Initial page when uncontrolled. @default 1 */
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  /** Pages shown on each side of the current page. @default 1 */
  siblingCount?: number;
  /** Pages always shown at the start and end. @default 1 */
  boundaryCount?: number;
  /** `full` lists page numbers; `compact` shows "Page 3 of 10" between the arrows. @default "full" */
  variant?: "full" | "compact";
  /** @default "md" */
  size?: "sm" | "md";
  disabled?: boolean;
  /** Accessible name of the navigation landmark. @default messages.pagination.label ("Pagination") */
  label?: string;
}
