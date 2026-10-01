import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { ItemTooltip, normalizeRarity } from "./ItemTooltip";

describe("ItemTooltip", () => {
  it("renders name, rarity, enchantments and stats", () => {
    render(
      <ItemTooltip
        name="Diamond Pickaxe"
        rarity="Rare"
        enchantments={["Efficiency IV", "Unbreaking III"]}
        stats={[
          { label: "Attack Damage", value: "+5" },
          { label: "Durability", value: "126 / 1561" },
        ]}
      />,
    );
    expect(screen.getByText("Diamond Pickaxe")).toBeInTheDocument();
    expect(screen.getByText("Rare")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("Attack Damage")).toBeInTheDocument();
    expect(screen.getByText("126 / 1561")).toBeInTheDocument();
    expect(screen.getByText("Diamond Pickaxe").parentElement).toHaveAttribute("data-rarity", "rare");
  });

  it("normalizes rarity names", () => {
    expect(normalizeRarity("EPIC")).toBe("epic");
    expect(normalizeRarity("Mythic")).toBeUndefined();
    expect(normalizeRarity(undefined)).toBeUndefined();
  });

  it("renders a minimal tooltip with description", () => {
    render(<ItemTooltip name="Bread" description="Restores 5 hunger." role="tooltip" />);
    expect(screen.getByRole("tooltip")).toHaveTextContent("BreadRestores 5 hunger.");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ItemTooltip name="Sword" rarity="Epic" enchantments={["Sharpness V"]} stats={[{ label: "Damage", value: 7 }]} />,
    );
    await expectNoA11yViolations(container);
  });
});
