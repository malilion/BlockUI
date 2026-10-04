import type { HTMLAttributes, ReactNode } from "react";

export const consoleEntryKinds = ["input", "output", "success", "error"] as const;

export type ConsoleEntryKind = (typeof consoleEntryKinds)[number];

export interface ConsoleEntry {
  id: string;
  /** `input` echoes a command; the others are responses. @default "output" */
  kind?: ConsoleEntryKind;
  text: ReactNode;
}

export interface ConsoleCommand {
  /** Command name without the slash, e.g. "gamemode". */
  name: string;
  /** Argument hint, e.g. "<mode> [player]". */
  usage?: string;
  description?: string;
}

export interface CommandConsoleProps extends HTMLAttributes<HTMLDivElement> {
  entries: ConsoleEntry[];
  /** Commands offered as suggestions after typing "/". */
  commands?: ConsoleCommand[];
  /** Called with the trimmed command line (including the leading "/") on Enter. */
  onRun?: (command: string) => void;
  /** Log height. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Accessible name. @default "Console" */
  label?: string;
}
