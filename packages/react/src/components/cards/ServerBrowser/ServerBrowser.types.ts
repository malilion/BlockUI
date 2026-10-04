import type { HTMLAttributes, ReactNode } from "react";
import type { ServerCardProps } from "../ServerCard/ServerCard.types";

export interface ServerEntry extends Omit<ServerCardProps, "onJoin" | "id"> {
  id: string;
}

export type ServerSort = "name" | "players" | "ping";

export interface ServerBrowserProps extends HTMLAttributes<HTMLDivElement> {
  servers: ServerEntry[];
  /** Called with the server id when its Join button is pressed. */
  onJoin?: (id: string) => void;
  /** Renders a Refresh button. */
  onRefresh?: () => void;
  /** Renders an "Add server" button. */
  onAddServer?: () => void;
  /** Initial sort. @default "players" */
  defaultSort?: ServerSort;
  /** Shown when no server matches. @default "No servers found" */
  emptyText?: ReactNode;
  /** Accessible name. @default "Server browser" */
  label?: string;
}
