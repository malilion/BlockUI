import type { ReactNode } from "react";
import type { BlockButtonProps } from "../BlockButton/BlockButton.types";

export interface IconButtonProps extends Omit<BlockButtonProps, "startIcon" | "endIcon" | "fullWidth" | "children"> {
  /** The icon to render. Decorative — the accessible name comes from `label`. */
  icon: ReactNode;
  /** Accessible name (`aria-label`) and tooltip text. Required. */
  label: string;
}
