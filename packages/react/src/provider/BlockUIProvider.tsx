import { forwardRef, useMemo, useState } from "react";
import { cx } from "../utils/cx";
import { BlockToaster } from "../components/feedback/Toast/Toast";
import { BlockUIContext } from "./context";
import type { BlockUIContextValue, BlockUIProviderProps } from "./BlockUIProvider.types";

/**
 * Applies a Block UI theme (`data-theme`) to its subtree and hosts the overlay
 * layer that modals and toasts portal into.
 *
 * ```tsx
 * <BlockUIProvider theme="deepslate">
 *   <App />
 * </BlockUIProvider>
 * ```
 */
export const BlockUIProvider = forwardRef<HTMLDivElement, BlockUIProviderProps>(
  function BlockUIProvider(
    { theme = "grassland", toaster = true, className, children, ...rest },
    ref,
  ) {
    const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(null);
    const value = useMemo<BlockUIContextValue>(
      () => ({ theme, portalContainer }),
      [theme, portalContainer],
    );

    return (
      <BlockUIContext.Provider value={value}>
        <div ref={ref} data-theme={theme} className={cx("block-ui-root", className)} {...rest}>
          {children}
          <div ref={setPortalContainer} data-block-portal="" />
          {toaster ? <BlockToaster /> : null}
        </div>
      </BlockUIContext.Provider>
    );
  },
);
