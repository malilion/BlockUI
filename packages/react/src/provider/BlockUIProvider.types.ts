import type { BlockThemeName } from "@malilion/block-ui-themes";
import type { HTMLAttributes, ReactNode } from "react";
import type { BlockUIMessages, BlockUIMessagesOverride } from "../locale/messages";

export interface BlockUIProviderProps extends HTMLAttributes<HTMLDivElement> {
  /** Theme applied through `data-theme`. @default "grassland" */
  theme?: BlockThemeName;
  /** Render the toast region used by `toast.*()`. @default true */
  toaster?: boolean;
  /**
   * Built-in text of every component — a full locale such as `zhTWMessages`,
   * or a partial override merged onto English. Explicit props still win.
   * @default enMessages
   */
  messages?: BlockUIMessages | BlockUIMessagesOverride;
  children?: ReactNode;
}

export interface BlockUIContextValue {
  theme: BlockThemeName;
  /** Element portals (modals, toasts) render into, so they inherit the theme. */
  portalContainer: HTMLElement | null;
  /** Resolved built-in text (English unless the provider sets `messages`). */
  messages: BlockUIMessages;
}
