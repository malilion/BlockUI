import { useSyncExternalStore } from "react";
import { getToasts, subscribeToasts } from "./store";
import type { ToastRecord } from "./Toast.types";

/** Subscribe to the live toast list. */
export function useToasts(): ToastRecord[] {
  return useSyncExternalStore(subscribeToasts, getToasts, getToasts);
}
