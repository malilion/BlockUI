import type { ReactNode } from "react";
import type { InventoryGridProps } from "../InventoryGrid/InventoryGrid.types";

export interface HotbarProps
  extends Omit<
    InventoryGridProps,
    | "columns"
    | "rows"
    | "children"
    | "selectedIndex"
    | "defaultSelectedIndex"
    | "onSelectedIndexChange"
    | "selectionFollowsFocus"
    | "wrap"
    | "onSelect"
  > {
  /** Controlled selected slot. */
  selectedIndex?: number;
  /** @default 0 */
  defaultSelectedIndex?: number;
  children: ReactNode;
  onSelect?: (index: number) => void;
  /** Number of slots (empty ones are added). @default 9 */
  slots?: number;
  /** Listen to number keys `1`–`9` on the whole page. @default true */
  hotkeys?: boolean;
  /** Show key numbers under the slots. @default true */
  showKeys?: boolean;
}
