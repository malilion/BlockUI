import type { HTMLAttributes, ReactNode } from "react";

export const chatMessageTypes = ["chat", "system", "whisper", "join", "death"] as const;

export type ChatMessageType = (typeof chatMessageTypes)[number];

export interface ChatMessage {
  id: string;
  /** Sender; omitted for system lines. */
  author?: string;
  text: ReactNode;
  /** Display time, e.g. "14:02". */
  time?: string;
  /** @default "chat" */
  type?: ChatMessageType;
}

export interface ChatWindowProps extends HTMLAttributes<HTMLDivElement> {
  messages: ChatMessage[];
  /** Renders the input; called with the trimmed text on Enter. */
  onSend?: (text: string) => void;
  /** @default "Type a message…" */
  placeholder?: string;
  /** @default 256 */
  maxLength?: number;
  /** Show each message's time. */
  showTimestamps?: boolean;
  /** Log height. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Accessible name. @default "Chat" */
  label?: string;
}
