import type { HTMLAttributes, ReactNode } from "react";
import type { SlotSize } from "./context";

export interface InventoryGridProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** @default 9 */
  columns?: number;
  /** When set, empty slots are added until `columns × rows` slots exist. */
  rows?: number;
  /** Maximum slot size; slots shrink on narrow screens. @default "md" */
  slotSize?: SlotSize;
  /** `InventorySlot` elements. */
  children: ReactNode;
  /** Controlled selected slot (`null` for none). */
  selectedIndex?: number | null;
  /** Initially selected slot when uncontrolled. @default null */
  defaultSelectedIndex?: number | null;
  onSelectedIndexChange?: (index: number) => void;
  /** Move the selection together with keyboard focus (hotbar behaviour). */
  selectionFollowsFocus?: boolean;
  /** Arrow keys wrap around at row ends. */
  wrap?: boolean;
  /** Accessible name. @default "Inventory" */
  label?: string;
}
