import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { InventorySlot } from "../InventorySlot/InventorySlot";
import { ItemStack } from "../ItemStack/ItemStack";
import { Hotbar } from "./Hotbar";

function renderHotbar(props: Partial<React.ComponentProps<typeof Hotbar>> = {}) {
  return render(
    <>
      <input aria-label="Chat" />
      <Hotbar {...props}>
        <InventorySlot>
          <ItemStack icon={<svg />} name="Sword" />
        </InventorySlot>
        <InventorySlot>
          <ItemStack icon={<svg />} name="Pickaxe" />
        </InventorySlot>
        <InventorySlot>
          <ItemStack icon={<svg />} name="Torch" amount={17} />
        </InventorySlot>
      </Hotbar>
    </>,
  );
}

const selectedName = () =>
  screen
    .getAllByRole("gridcell")
    .findIndex((cell) => cell.getAttribute("aria-selected") === "true");

describe("Hotbar", () => {
  it("renders 9 slots with key hints and selects the first by default", () => {
    renderHotbar();
    expect(screen.getByRole("grid", { name: "Hotbar" })).toHaveAttribute(
      "aria-keyshortcuts",
      "1 2 3 4 5 6 7 8 9",
    );
    expect(screen.getAllByRole("gridcell")).toHaveLength(9);
    expect(selectedName()).toBe(0);
    expect(screen.getByText("9")).toBeInTheDocument();
  });

  it("selects slots with number keys 1–9", () => {
    const onSelect = vi.fn();
    renderHotbar({ onSelect });
    fireEvent.keyDown(document.body, { key: "3" });
    expect(selectedName()).toBe(2);
    fireEvent.keyDown(document.body, { key: "9" });
    expect(selectedName()).toBe(8);
    expect(onSelect.mock.calls).toEqual([[2], [8]]);
  });

  it("ignores number keys while typing or with modifiers", async () => {
    const user = userEvent.setup();
    renderHotbar();
    await user.click(screen.getByLabelText("Chat"));
    await user.keyboard("5");
    expect(selectedName()).toBe(0);
    fireEvent.keyDown(document.body, { key: "5", ctrlKey: true });
    expect(selectedName()).toBe(0);
  });

  it("moves the selection with arrow keys and wraps", async () => {
    const user = userEvent.setup();
    renderHotbar();
    await user.click(screen.getAllByRole("gridcell")[0]!);
    await user.keyboard("{ArrowLeft}");
    expect(selectedName()).toBe(8);
    await user.keyboard("{ArrowRight}{ArrowRight}");
    expect(selectedName()).toBe(1);
  });

  it("supports touch / click selection and controlled mode", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    renderHotbar({ selectedIndex: 4, onSelect, hotkeys: false, showKeys: false });
    expect(selectedName()).toBe(4);
    await user.click(screen.getAllByRole("gridcell")[1]!);
    expect(onSelect).toHaveBeenCalledWith(1);
    expect(selectedName()).toBe(4);
    fireEvent.keyDown(document.body, { key: "2" });
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("9")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = renderHotbar();
    await expectNoA11yViolations(container);
  });
});
