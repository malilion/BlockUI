import type { AlertVariant } from "./BlockAlert.types";

/** Block material used by each alert variant. */
export const alertMaterial: Record<AlertVariant, string> = {
  success: "emerald",
  info: "water",
  warning: "gold",
  error: "redstone",
};
