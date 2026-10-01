import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { ItemStack } from "../../inventory/ItemStack/ItemStack";
import { CraftingSlot } from "../CraftingSlot/CraftingSlot";
import { CraftingGrid } from "./CraftingGrid";

describe("CraftingGrid", () => {
  it("renders a 3 × 3 grid by default and pads empty slots", () => {
    render(
      <CraftingGrid>
        <CraftingSlot>
          <ItemStack icon={<svg />} name="Planks" />
        </CraftingSlot>
      </CraftingGrid>,
    );
    const grid = screen.getByRole("grid", { name: "Crafting grid" });
    expect(grid).toHaveAttribute("aria-colcount", "3");
    expect(screen.getAllByRole("row")).toHaveLength(3);
    expect(screen.getAllByRole("gridcell")).toHaveLength(9);
  });

  it("supports 2 × 2", () => {
    render(<CraftingGrid size={2}>{null}</CraftingGrid>);
    expect(screen.getAllByRole("gridcell")).toHaveLength(4);
    expect(screen.getByRole("grid")).toHaveAttribute("data-crafting-size", "2");
  });

  it("is keyboard navigable", async () => {
    const user = userEvent.setup();
    render(<CraftingGrid size={2}>{null}</CraftingGrid>);
    const cells = screen.getAllByRole("gridcell");
    await user.tab();
    await user.keyboard("{ArrowDown}{ArrowRight}");
    expect(cells[3]).toHaveFocus();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<CraftingGrid>{null}</CraftingGrid>);
    await expectNoA11yViolations(container);
  });
});
