import type { HTMLAttributes, ReactNode } from "react";
import type { BlockPanelProps } from "../../layout/BlockPanel/BlockPanel.types";

export interface InventoryProps extends Omit<BlockPanelProps, "variant"> {
  /** @default "Inventory" */
  title?: ReactNode;
  /** `chest` renders a wooden chest container. @default "default" */
  variant?: "default" | "chest";
}

export interface InventorySectionProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Small pixel heading (e.g. "Hotbar"). */
  title?: ReactNode;
  children?: ReactNode;
}
