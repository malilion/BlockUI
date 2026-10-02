import { describe, expect, it } from "vitest";

/** PRD §57: every component documents these stories. */
const REQUIRED = [
  "Default",
  "Variants",
  "States",
  "Sizes",
  "Disabled",
  "Interactive",
  "Responsive",
];

const sources = import.meta.glob<string>("../components/**/*.stories.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
});

const entries = Object.entries(sources).map(
  ([path, source]) => [path.split("/").pop()!.replace(".stories.tsx", ""), source] as const,
);

describe("Storybook coverage (PRD §57)", () => {
  it("finds every component story file", () => {
    expect(entries.length).toBeGreaterThanOrEqual(40);
  });

  it.each(entries)(
    "%s has Default, Variants, States, Sizes, Disabled, Interactive and Responsive",
    (_name, source) => {
      const exported = [...source.matchAll(/^export const (\w+)/gm)].map((match) => match[1]);
      expect(REQUIRED.filter((name) => !exported.includes(name))).toEqual([]);
    },
  );

  it.each(entries)("%s documents accessibility", (_name, source) => {
    expect(source).toMatch(/\*\*Accessibility\*\*/);
  });

  it.each(entries)("%s Interactive story runs a play function", (_name, source) => {
    expect(source).toMatch(/export const Interactive[\s\S]*?play:/);
  });
});
