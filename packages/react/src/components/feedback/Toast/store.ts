import type { ReactNode } from "react";
import type { ToastOptions, ToastRecord, ToastVariant } from "./Toast.types";

export const DEFAULT_TOAST_DURATION = 4000;
export const DEFAULT_TOAST_LIMIT = 5;

type Listener = () => void;

let records: ToastRecord[] = [];
const listeners = new Set<Listener>();
let counter = 0;

function emit() {
  for (const listener of listeners) listener();
}

export function subscribeToasts(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getToasts(): ToastRecord[] {
  return records;
}

function show(variant: ToastVariant, message: ReactNode, options: ToastOptions = {}): string {
  counter += 1;
  const id = options.id ?? `block-toast-${counter}`;
  const record: ToastRecord = {
    id,
    variant,
    message,
    title: options.title,
    duration: options.duration ?? DEFAULT_TOAST_DURATION,
    action: options.action,
  };
  const existing = records.some((toast) => toast.id === id);
  records = existing
    ? records.map((toast) => (toast.id === id ? record : toast))
    : [...records, record].slice(-DEFAULT_TOAST_LIMIT * 4);
  emit();
  return id;
}

function dismiss(id?: string): void {
  records = id === undefined ? [] : records.filter((toast) => toast.id !== id);
  emit();
}

type ToastFn = (message: ReactNode, options?: ToastOptions) => string;

export interface ToastApi extends ToastFn {
  success: ToastFn;
  info: ToastFn;
  warning: ToastFn;
  error: ToastFn;
  /** Dismiss one toast, or all when called without an id. */
  dismiss: (id?: string) => void;
}

/**
 * Imperative toast API (PRD §44). Requires a `<BlockToaster />` — rendered
 * automatically by `<BlockUIProvider>`.
 *
 * ```ts
 * toast.success("World saved.");
 * toast.error("Connection failed.", { duration: 0 });
 * ```
 */
export const toast: ToastApi = Object.assign(
  (message: ReactNode, options?: ToastOptions) => show("info", message, options),
  {
    success: (message: ReactNode, options?: ToastOptions) => show("success", message, options),
    info: (message: ReactNode, options?: ToastOptions) => show("info", message, options),
    warning: (message: ReactNode, options?: ToastOptions) => show("warning", message, options),
    error: (message: ReactNode, options?: ToastOptions) => show("error", message, options),
    dismiss,
  },
);
