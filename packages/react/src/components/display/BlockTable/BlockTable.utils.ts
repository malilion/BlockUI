import type { BlockTableColumn, BlockTableSort } from "./BlockTable.types";

type SortableValue = string | number | null | undefined;

/** The property `key` of a row, when it is a renderable or sortable primitive. */
export function readField(row: unknown, key: string): string | number | undefined {
  if (row === null || typeof row !== "object") return undefined;
  const value = (row as Record<string, unknown>)[key];
  return typeof value === "string" || typeof value === "number" ? value : undefined;
}

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

function compare(a: SortableValue, b: SortableValue): number {
  // Empty values always sort last.
  if (a === null || a === undefined || a === "")
    return b === null || b === undefined || b === "" ? 0 : 1;
  if (b === null || b === undefined || b === "") return -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return collator.compare(String(a), String(b));
}

/** Returns a sorted copy of `rows` (stable; empty values last in both directions). */
export function sortRows<T>(
  rows: T[],
  columns: BlockTableColumn<T>[],
  sort: BlockTableSort | null,
): T[] {
  if (!sort) return rows;
  const column = columns.find((candidate) => candidate.key === sort.key);
  if (!column) return rows;
  const value = (row: T) => (column.sortValue ? column.sortValue(row) : readField(row, column.key));
  const sign = sort.direction === "asc" ? 1 : -1;
  return [...rows].sort((a, b) => {
    const va = value(a);
    const vb = value(b);
    const empty = (v: SortableValue) => v === null || v === undefined || v === "";
    if (empty(va) || empty(vb)) return compare(va, vb);
    return compare(va, vb) * sign;
  });
}

/** Clicking a header cycles: unsorted → ascending → descending → unsorted. */
export function nextSort(current: BlockTableSort | null, key: string): BlockTableSort | null {
  if (current?.key !== key) return { key, direction: "asc" };
  if (current.direction === "asc") return { key, direction: "desc" };
  return null;
}
