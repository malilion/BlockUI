import type { Key, ReactNode, TableHTMLAttributes } from "react";

export type BlockTableSortDirection = "asc" | "desc";

export interface BlockTableSort {
  key: string;
  direction: BlockTableSortDirection;
}

export interface BlockTableColumn<T> {
  /** Column id; also the default property read from each row. */
  key: string;
  header: ReactNode;
  /** Custom cell content. Defaults to `row[key]`. */
  cell?: (row: T, index: number) => ReactNode;
  /** @default "start" */
  align?: "start" | "center" | "end";
  /** CSS width, e.g. `"120px"` or `"20%"`. */
  width?: string;
  sortable?: boolean;
  /** Value used for sorting. Defaults to `row[key]`. */
  sortValue?: (row: T) => string | number | null | undefined;
  /** Render this column's cells as row headers (`<th scope="row">`). */
  rowHeader?: boolean;
}

export interface BlockTableProps<T> extends Omit<
  TableHTMLAttributes<HTMLTableElement>,
  "children"
> {
  columns: BlockTableColumn<T>[];
  rows: T[];
  /** Stable key for each row. @default the row index */
  getRowKey?: (row: T, index: number) => Key;
  /** Table caption — required as the table's accessible name. */
  caption: ReactNode;
  /** Keep the caption for screen readers only. */
  hideCaption?: boolean;
  /** Controlled sort; `null` means unsorted. */
  sort?: BlockTableSort | null;
  defaultSort?: BlockTableSort | null;
  onSortChange?: (sort: BlockTableSort | null) => void;
  /** Turn off built-in sorting (e.g. when rows are sorted on the server). */
  manualSort?: boolean;
  /** Alternate row shading. */
  striped?: boolean;
  /** @default "md" */
  size?: "sm" | "md";
  /** Keep the header visible while the page scrolls. */
  stickyHeader?: boolean;
  /** Shown in place of rows when `rows` is empty. @default messages.blockTable.empty ("No data") */
  emptyState?: ReactNode;
  /** Class for the scroll container around the table. */
  wrapperClassName?: string;
}
