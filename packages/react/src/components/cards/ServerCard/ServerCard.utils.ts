import type { PingQuality } from "./ServerCard.types";

export function pingQuality(ping: number | undefined, online = true): PingQuality {
  if (!online || ping === undefined) return "offline";
  if (ping < 80) return "good";
  if (ping < 200) return "fair";
  return "poor";
}
