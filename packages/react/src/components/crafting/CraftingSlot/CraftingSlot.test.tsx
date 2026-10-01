import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { ItemStack } from "../../inventory/ItemStack/ItemStack";
import { CraftingSlot } from "./CraftingSlot";

describe("CraftingSlot", () => {
  it("renders an item and a crafting class", () => {
    render(
      <CraftingSlot onClick={() => undefined}>
        <ItemStack icon={<svg />} name="Oak Planks" />
      </CraftingSlot>,
    );
    expect(screen.getByRole("button", { name: "Oak Planks" })).toHaveClass("craftingSlot");
  });

  it("supports click, disabled and selection like InventorySlot", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <>
        <CraftingSlot onClick={onClick} label="A" selected />
        <CraftingSlot onClick={onClick} label="B" disabled />
      </>,
    );
    await user.click(screen.getByRole("button", { name: "A" }));
    await user.click(screen.getByRole("button", { name: "B" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "A" })).toHaveAttribute("aria-pressed", "true");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<CraftingSlot onClick={() => undefined} />);
    await expectNoA11yViolations(container);
  });
});
