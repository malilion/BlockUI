import { createContext, useContext } from "react";

export type SlotSize = "sm" | "md" | "lg";

export interface InventoryGridContextValue {
  focusedIndex: number;
  selectedIndex: number | null;
  setFocusedIndex: (index: number) => void;
  select: (index: number) => void;
  registerCell: (index: number, element: HTMLElement | null) => void;
}

export const InventoryGridContext = createContext<InventoryGridContextValue | null>(null);

/** Index of the slot inside its grid; -1 outside a grid. */
export const SlotIndexContext = createContext<number>(-1);

export function useInventoryGrid(): InventoryGridContextValue | null {
  return useContext(InventoryGridContext);
}

export function useSlotIndex(): number {
  return useContext(SlotIndexContext);
}
