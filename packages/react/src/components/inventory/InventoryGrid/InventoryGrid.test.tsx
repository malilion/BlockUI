import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { InventorySlot } from "../InventorySlot/InventorySlot";
import { ItemStack } from "../ItemStack/ItemStack";
import { InventoryGrid } from "./InventoryGrid";

function renderGrid(props: Partial<React.ComponentProps<typeof InventoryGrid>> = {}) {
  return render(
    <InventoryGrid columns={3} rows={2} {...props}>
      <InventorySlot>
        <ItemStack icon={<svg />} name="Planks" amount={64} />
      </InventorySlot>
      <InventorySlot>
        <ItemStack icon={<svg />} name="Stone" amount={32} />
      </InventorySlot>
      <InventorySlot locked>
        <ItemStack icon={<svg />} name="Diamond" amount={12} />
      </InventorySlot>
      <InventorySlot>
        <ItemStack icon={<svg />} name="Apple" amount={8} />
      </InventorySlot>
    </InventoryGrid>,
  );
}

describe("InventoryGrid", () => {
  it("renders an ARIA grid with rows and padded empty slots", () => {
    renderGrid();
    const grid = screen.getByRole("grid", { name: "Inventory" });
    expect(within(grid).getAllByRole("row")).toHaveLength(2);
    expect(within(grid).getAllByRole("gridcell")).toHaveLength(6);
    expect(within(grid).getAllByText("Empty slot")).toHaveLength(2);
    expect(grid).toHaveAttribute("aria-colcount", "3");
  });

  it("uses a single tab stop (roving tabindex)", async () => {
    const user = userEvent.setup();
    renderGrid();
    const cells = screen.getAllByRole("gridcell");
    expect(cells.filter((cell) => cell.tabIndex === 0)).toHaveLength(1);
    await user.tab();
    expect(cells[0]).toHaveFocus();
  });

  it("moves focus with arrow keys, Home and End", async () => {
    const user = userEvent.setup();
    renderGrid();
    const cells = screen.getAllByRole("gridcell");
    await user.tab();
    await user.keyboard("{ArrowRight}");
    expect(cells[1]).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(cells[4]).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(cells[4]).toHaveFocus();
    await user.keyboard("{Home}");
    expect(cells[3]).toHaveFocus();
    await user.keyboard("{End}");
    expect(cells[5]).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(cells[2]).toHaveFocus();
    await user.keyboard("{Control>}{Home}{/Control}");
    expect(cells[0]).toHaveFocus();
    await user.keyboard("{ArrowLeft}");
    expect(cells[0]).toHaveFocus();
    expect(cells[0]).toHaveAttribute("tabindex", "0");
  });

  it("selects with Enter and click, skipping locked slots", async () => {
    const user = userEvent.setup();
    const onSelectedIndexChange = vi.fn();
    renderGrid({ onSelectedIndexChange });
    const cells = screen.getAllByRole("gridcell");
    await user.tab();
    await user.keyboard("{ArrowRight}{Enter}");
    expect(cells[1]).toHaveAttribute("aria-selected", "true");
    expect(onSelectedIndexChange).toHaveBeenLastCalledWith(1);
    await user.click(cells[2]!);
    expect(cells[2]).toHaveAttribute("aria-selected", "false");
    expect(cells[2]).toHaveAttribute("aria-disabled", "true");
    await user.click(cells[3]!);
    expect(cells[3]).toHaveAttribute("aria-selected", "true");
    expect(cells[1]).toHaveAttribute("aria-selected", "false");
  });

  it("supports controlled selection and selectionFollowsFocus with wrap", async () => {
    const user = userEvent.setup();
    const onSelectedIndexChange = vi.fn();
    renderGrid({
      selectedIndex: 0,
      onSelectedIndexChange,
      selectionFollowsFocus: true,
      wrap: true,
    });
    await user.tab();
    await user.keyboard("{ArrowLeft}");
    expect(screen.getAllByRole("gridcell")[2]).toHaveFocus();
    expect(onSelectedIndexChange).not.toHaveBeenCalled();
    await user.keyboard("{ArrowLeft}");
    expect(onSelectedIndexChange).toHaveBeenLastCalledWith(1);
  });

  it("has no accessibility violations", async () => {
    const { container } = renderGrid({ defaultSelectedIndex: 0 });
    await expectNoA11yViolations(container);
  });
});
