/** Up to two letters: first letters of the first two words, or the first two characters. */
export function initials(name: string): string {
  const words = name
    .replace(/[_\-.]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return (words[0] ?? "").slice(0, 2).toUpperCase();
  return `${words[0]?.[0] ?? ""}${words[1]?.[0] ?? ""}`.toUpperCase();
}

const MATERIALS = [
  "grass",
  "diamond",
  "gold",
  "redstone",
  "amethyst",
  "emerald",
  "wood",
  "water",
] as const;

/** Stable block material for a name, so a player always gets the same colour. */
export function avatarMaterial(name: string): (typeof MATERIALS)[number] {
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return MATERIALS[hash % MATERIALS.length] ?? "grass";
}
