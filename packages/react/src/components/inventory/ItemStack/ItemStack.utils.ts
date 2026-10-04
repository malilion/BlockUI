import { enMessages, type BlockUIMessages } from "../../../locale/messages";
import { formatNumber } from "../../../utils/number";
import type { ItemStackProps } from "./ItemStack.types";

/** Accessible description of a stack, e.g. "Diamond Pickaxe, durability 126 of 1,561". */
export function describeItemStack(
  {
    name,
    amount,
    durability,
    maxDurability,
  }: Pick<ItemStackProps, "name" | "amount" | "durability" | "maxDurability">,
  messages: BlockUIMessages = enMessages,
): string {
  const parts: string[] = [];
  if (name) parts.push(name);
  if (amount !== undefined && amount > 1) parts.push(`× ${formatNumber(amount)}`);
  if (durability !== undefined && maxDurability !== undefined) {
    const m = typeof messages === "object" && messages !== null ? messages : enMessages;
    parts.push(m.durability.value(formatNumber(durability), formatNumber(maxDurability)));
  }
  return parts.join(", ");
}
