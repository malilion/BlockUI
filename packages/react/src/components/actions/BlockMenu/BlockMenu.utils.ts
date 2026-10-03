import type { BlockMenuEntry, BlockMenuItem } from "./BlockMenu.types";

export function isMenuItem(entry: BlockMenuEntry): entry is BlockMenuItem {
  return !("type" in entry && entry.type === "separator");
}

/** Text an item answers to for type-ahead. */
export function itemText(item: BlockMenuItem): string {
  if (item.textValue !== undefined) return item.textValue;
  return typeof item.label === "string" || typeof item.label === "number" ? String(item.label) : "";
}

/**
 * Index of the next enabled item whose text starts with `char`, searching
 * forward from the item after `from` and wrapping around.
 */
export function typeaheadIndex(items: BlockMenuItem[], from: number, char: string): number {
  const needle = char.toLowerCase();
  for (let step = 1; step <= items.length; step += 1) {
    const index = (from + step) % items.length;
    const item = items[index];
    if (item && !item.disabled && itemText(item).toLowerCase().startsWith(needle)) return index;
  }
  return -1;
}
