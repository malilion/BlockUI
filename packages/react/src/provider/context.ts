import { createContext, useContext } from "react";
import type { BlockUIContextValue } from "./BlockUIProvider.types";

export const BlockUIContext = createContext<BlockUIContextValue | null>(null);

/** Current Block UI theme and portal container (null outside a provider). */
export function useBlockUI(): BlockUIContextValue | null {
  return useContext(BlockUIContext);
}

/**
 * Where overlays should portal to: the provider's layer (null until it has
 * mounted), or `document.body` outside a provider.
 */
export function usePortalContainer(): HTMLElement | null {
  const context = useContext(BlockUIContext);
  if (context) return context.portalContainer;
  return typeof document === "undefined" ? null : document.body;
}
