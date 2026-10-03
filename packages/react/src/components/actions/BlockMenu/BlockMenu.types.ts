import type { HTMLAttributes, ReactNode } from "react";
import type { BlockButtonSize, BlockButtonVariant } from "../BlockButton/BlockButton.types";

export interface BlockMenuItem {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  /** Keyboard shortcut hint shown on the right (display only). */
  shortcut?: string;
  disabled?: boolean;
  /** Redstone-colored destructive action. */
  danger?: boolean;
  onSelect?: () => void;
  /** Text used for type-ahead when `label` is not a string. */
  textValue?: string;
}

export interface BlockMenuSeparator {
  type: "separator";
  id?: string;
}

export type BlockMenuEntry = BlockMenuItem | BlockMenuSeparator;

export interface BlockMenuProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** Trigger button text — also the menu's accessible name. */
  label: string;
  items: BlockMenuEntry[];
  /** Called with the item id after any item is chosen. */
  onSelect?: (id: string) => void;
  /** Trigger material. @default "stone" */
  variant?: BlockButtonVariant;
  /** Trigger size. @default "md" */
  size?: BlockButtonSize;
  /** Icon before the trigger text, or the whole trigger when `iconOnly`. */
  icon?: ReactNode;
  /** Square icon trigger; `label` becomes its `aria-label`. */
  iconOnly?: boolean;
  /** Align the menu with the trigger's start or end edge. @default "start" */
  align?: "start" | "end";
  /** Open below or above the trigger. @default "bottom" */
  placement?: "bottom" | "top";
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
}
