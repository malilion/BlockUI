import type { Trade } from "./TradingUI.types";

export function isSoldOut(trade: Trade): boolean {
  return trade.maxUses !== undefined && (trade.uses ?? 0) >= trade.maxUses;
}
