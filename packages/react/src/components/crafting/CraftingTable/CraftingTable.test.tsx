import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { ItemStack } from "../../inventory/ItemStack/ItemStack";
import { CraftingGrid } from "../CraftingGrid/CraftingGrid";
import { CraftingResult } from "../CraftingResult/CraftingResult";
import { CraftingTable } from "./CraftingTable";

describe("CraftingTable", () => {
  it("lays out input, arrow and result", () => {
    render(
      <CraftingTable
        input={<CraftingGrid size={3}>{null}</CraftingGrid>}
        result={<ItemStack icon={<svg />} amount={1} name="Chest" />}
      />,
    );
    const table = screen.getByRole("group", { name: "Crafting table" });
    expect(within(table).getByRole("grid", { name: "Crafting grid" })).toBeInTheDocument();
    expect(within(table).getByRole("group", { name: "Crafting result" })).toHaveTextContent(
      "Chest",
    );
  });

  it("wraps a bare ItemStack result and calls onTake", async () => {
    const user = userEvent.setup();
    const onTake = vi.fn();
    render(
      <CraftingTable
        input={<CraftingGrid>{null}</CraftingGrid>}
        result={<ItemStack icon={<svg />} name="Chest" />}
        onTake={onTake}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Chest" }));
    expect(onTake).toHaveBeenCalledTimes(1);
  });

  it("keeps a provided CraftingResult as-is", () => {
    render(
      <CraftingTable
        input={<CraftingGrid>{null}</CraftingGrid>}
        result={<CraftingResult label="Output" />}
      />,
    );
    expect(screen.getByRole("group", { name: "Output" })).toBeInTheDocument();
  });

  it("renders a Craft button that is disabled without a result", async () => {
    const user = userEvent.setup();
    const onCraft = vi.fn();
    const { rerender } = render(
      <CraftingTable input={<CraftingGrid>{null}</CraftingGrid>} onCraft={onCraft} />,
    );
    const craft = screen.getByRole("button", { name: "Craft" });
    expect(craft).toHaveAttribute("aria-disabled", "true");
    await user.click(craft);
    expect(onCraft).not.toHaveBeenCalled();
    rerender(
      <CraftingTable input={<CraftingGrid>{null}</CraftingGrid>} onCraft={onCraft} canCraft />,
    );
    await user.click(screen.getByRole("button", { name: "Craft" }));
    expect(onCraft).toHaveBeenCalledTimes(1);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <CraftingTable
        input={<CraftingGrid>{null}</CraftingGrid>}
        onCraft={() => undefined}
        canCraft
      />,
    );
    await expectNoA11yViolations(container);
  });
});
