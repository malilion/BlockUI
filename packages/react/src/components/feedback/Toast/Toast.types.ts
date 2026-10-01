import type { ReactNode } from "react";
import type { AlertVariant } from "../Alert/BlockAlert.types";

export type ToastVariant = AlertVariant;

export interface ToastOptions {
  /** Stable id — showing a toast with an existing id replaces it. */
  id?: string;
  /** Bold first line. */
  title?: ReactNode;
  /** Auto-close delay in ms. `0` or `Infinity` keeps it open. @default 4000 */
  duration?: number;
  /** Optional action element (e.g. an "Undo" button). */
  action?: ReactNode;
}

export interface ToastRecord {
  id: string;
  variant: ToastVariant;
  message: ReactNode;
  title?: ReactNode;
  duration: number;
  action?: ReactNode;
}

export interface BlockToasterProps {
  /** Maximum toasts kept on screen; older ones are dropped. @default 5 */
  limit?: number;
  /** Accessible name of the notification region. @default "Notifications" */
  label?: string;
  className?: string;
}
