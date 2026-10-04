import type { HTMLAttributes, ReactNode } from "react";
import type { BlockMenuEntry } from "../BlockMenu/BlockMenu.types";

export interface ContextMenuProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** Area that opens the menu on right-click, Shift+F10 or the Menu key. */
  children: ReactNode;
  items: BlockMenuEntry[];
  /** Called with the item id after any item is chosen. */
  onSelect?: (id: string) => void;
  /** Accessible name of the menu. @default messages.contextMenu.label ("Context menu") */
  label?: string;
  /** Keep the browser's own menu. */
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
}
