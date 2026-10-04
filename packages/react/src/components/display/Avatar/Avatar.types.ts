import type { HTMLAttributes, ReactNode } from "react";

export const avatarStatuses = ["online", "away", "busy", "offline"] as const;

export type AvatarStatus = (typeof avatarStatuses)[number];

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Player name: the accessible name and the source of the initials. */
  name: string;
  /** Skin / face image URL (rendered pixelated). Falls back to initials if it fails. */
  src?: string;
  /** Icon instead of initials when there is no image. */
  icon?: ReactNode;
  /** 24 / 32 / 48 / 64 px. @default "md" */
  size?: "sm" | "md" | "lg" | "xl";
  /** Presence dot in the corner. */
  status?: AvatarStatus;
  /** Hide from assistive technology when the name is already shown next to it. */
  decorative?: boolean;
}
