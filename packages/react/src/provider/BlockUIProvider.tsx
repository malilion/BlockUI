import { forwardRef, useMemo, useState } from "react";
import { cx } from "../utils/cx";
import { BlockToaster } from "../components/feedback/Toast/Toast";
import { enMessages, mergeMessages } from "../locale/messages";
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
    { theme = "grassland", toaster = true, messages, className, children, ...rest },
    ref,
  ) {
    const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(null);
    const resolved = useMemo(() => mergeMessages(enMessages, messages), [messages]);
    const value = useMemo<BlockUIContextValue>(
      () => ({ theme, portalContainer, messages: resolved }),
      [theme, portalContainer, resolved],
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
