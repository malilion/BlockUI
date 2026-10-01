import type { BlockThemeName } from "@block-ui/themes";
import type { HTMLAttributes, ReactNode } from "react";

export interface BlockUIProviderProps extends HTMLAttributes<HTMLDivElement> {
  /** Theme applied through `data-theme`. @default "grassland" */
  theme?: BlockThemeName;
  /** Render the toast region used by `toast.*()`. @default true */
  toaster?: boolean;
  children?: ReactNode;
}

export interface BlockUIContextValue {
  theme: BlockThemeName;
  /** Element portals (modals, toasts) render into, so they inherit the theme. */
  portalContainer: HTMLElement | null;
}
