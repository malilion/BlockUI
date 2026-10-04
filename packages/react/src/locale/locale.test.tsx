import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BlockUIProvider } from "../provider/BlockUIProvider";
import { useBlockUIMessages } from "../provider/context";
import { enMessages, mergeMessages, type BlockUIMessages } from "./messages";
import { zhTWMessages } from "./zhTW";

function Probe() {
  const m = useBlockUIMessages();
  return (
    <p>
      {m.questCard.claim} · {m.recipeBook.craft} · {m.worldCard.day("3")}
    </p>
  );
}

/** Lists every leaf path so locales can be compared key by key. */
function leafPaths(value: unknown, prefix = ""): string[] {
  if (typeof value !== "object" || value === null) return [prefix];
  return Object.entries(value).flatMap(([key, child]) =>
    leafPaths(child, prefix ? `${prefix}.${key}` : key),
  );
}

describe("locale messages", () => {
  it("uses English outside a provider", () => {
    render(<Probe />);
    expect(screen.getByText("Claim · Craft · Day 3")).toBeInTheDocument();
  });

  it("uses English in a provider without messages", () => {
    render(
      <BlockUIProvider toaster={false}>
        <Probe />
      </BlockUIProvider>,
    );
    expect(screen.getByText("Claim · Craft · Day 3")).toBeInTheDocument();
  });

  it("applies a full locale", () => {
    render(
      <BlockUIProvider toaster={false} messages={zhTWMessages}>
        <Probe />
      </BlockUIProvider>,
    );
    expect(screen.getByText("領取 · 合成 · 第 3 天")).toBeInTheDocument();
  });

  it("merges a partial override onto English", () => {
    render(
      <BlockUIProvider toaster={false} messages={{ questCard: { claim: "Collect" } }}>
        <Probe />
      </BlockUIProvider>,
    );
    expect(screen.getByText("Collect · Craft · Day 3")).toBeInTheDocument();
  });

  it("zhTW defines every key that English does", () => {
    expect(leafPaths(zhTWMessages).sort()).toEqual(leafPaths(enMessages).sort());
  });

  it("mergeMessages keeps untouched sections and returns the base without an override", () => {
    expect(mergeMessages(enMessages)).toBe(enMessages);
    const merged: BlockUIMessages = mergeMessages(enMessages, { common: { close: "X" } });
    expect(merged.common.close).toBe("X");
    expect(merged.common.dismiss).toBe("Dismiss");
    expect(merged.furnace).toBe(enMessages.furnace);
  });
});
