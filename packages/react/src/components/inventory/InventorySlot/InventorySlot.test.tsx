import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { ItemStack } from "../ItemStack/ItemStack";
import { ItemTooltip } from "../ItemTooltip/ItemTooltip";
import { InventorySlot } from "./InventorySlot";

const Diamond = () => <ItemStack icon={<svg />} amount={12} name="Diamond" />;

describe("InventorySlot", () => {
  it("renders a static well without onClick", () => {
    const { container } = render(
      <InventorySlot>
        <Diamond />
      </InventorySlot>,
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(container.firstChild).toHaveTextContent("Diamond, × 12");
  });

  it("is a toggle button when clickable", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <InventorySlot onClick={onClick} selected>
        <Diamond />
      </InventorySlot>,
    );
    const button = screen.getByRole("button", { name: "Diamond, × 12" });
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).toHaveAttribute("data-selected", "true");
    await user.click(button);
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("does not fire onClick when disabled or locked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <>
        <InventorySlot onClick={onClick} disabled label="Disabled slot" />
        <InventorySlot onClick={onClick} locked label="Locked slot" />
      </>,
    );
    await user.click(screen.getByRole("button", { name: "Disabled slot" }));
    await user.click(screen.getByRole("button", { name: "Locked slot" }));
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Locked slot" })).toHaveAttribute("data-locked", "true");
  });

  it("announces empty slots and rarity", () => {
    const { container } = render(<InventorySlot rarity="epic" />);
    expect(screen.getByText("Empty slot")).toBeInTheDocument();
    expect(container.firstChild).toHaveAttribute("data-rarity", "epic");
  });

  it("shows the tooltip on hover and focus, and Escape closes it", async () => {
    const user = userEvent.setup();
    render(
      <InventorySlot onClick={() => undefined} tooltip={<ItemTooltip name="Diamond Pickaxe" rarity="Rare" />}>
        <Diamond />
      </InventorySlot>,
    );
    const button = screen.getByRole("button");
    const tooltip = screen.getByRole("tooltip", { hidden: true });
    expect(tooltip).not.toBeVisible();
    expect(button).toHaveAccessibleDescription("Diamond Pickaxe Rare");

    await user.hover(button);
    expect(tooltip).toBeVisible();
    await user.unhover(button);
    expect(tooltip).not.toBeVisible();

    act(() => button.focus());
    expect(tooltip).toBeVisible();
    fireEvent.keyDown(button, { key: "Escape" });
    expect(tooltip).not.toBeVisible();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <InventorySlot onClick={() => undefined}>
          <Diamond />
        </InventorySlot>
        <InventorySlot />
      </div>,
    );
    await expectNoA11yViolations(container);
  });
});
