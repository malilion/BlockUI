import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { ContextMenu } from "./ContextMenu";

const items = [
  { id: "split", label: "Split stack" },
  { id: "equip", label: "Equip", disabled: true },
  { type: "separator" as const },
  { id: "drop", label: "Drop", danger: true },
];

function setup(props: Partial<Parameters<typeof ContextMenu>[0]> = {}) {
  const onSelect = vi.fn();
  render(
    <ContextMenu items={items} onSelect={onSelect} label="Slot actions" {...props}>
      <button type="button">Diamond Sword</button>
    </ContextMenu>,
  );
  return { onSelect, target: screen.getByRole("button", { name: "Diamond Sword" }) };
}

describe("ContextMenu", () => {
  it("opens at the pointer on right-click and focuses the first item", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <ContextMenu ref={ref} items={items} label="Slot actions">
        <button type="button">Slot</button>
      </ContextMenu>,
    );
    const target = screen.getByRole("button", { name: "Slot" });
    const event = fireEvent.contextMenu(target, { clientX: 120, clientY: 80 });
    expect(event).toBe(false);
    expect(screen.getByRole("menu", { name: "Slot actions" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Split stack" })).toHaveFocus();
    expect(ref.current).toHaveAttribute("data-open");
  });

  it("opens with Shift+F10 and the Menu key, chooses and returns focus", async () => {
    const user = userEvent.setup();
    const { onSelect, target } = setup();
    target.focus();
    await user.keyboard("{Shift>}{F10}{/Shift}");
    expect(screen.getByRole("menuitem", { name: "Split stack" })).toHaveFocus();
    await user.keyboard("{ArrowDown}{Enter}");
    expect(onSelect).toHaveBeenCalledWith("drop");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(target).toHaveFocus();
    await user.keyboard("{ContextMenu}");
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(target).toHaveFocus();
  });

  it("closes on an outside click and keeps the browser menu when disabled", async () => {
    const user = userEvent.setup();
    const { target } = setup();
    fireEvent.contextMenu(target);
    await user.click(document.body);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("does nothing when disabled", () => {
    const { target } = setup({ disabled: true });
    const event = fireEvent.contextMenu(target);
    expect(event).toBe(true);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("has no accessibility violations when open", async () => {
    const { target } = setup();
    fireEvent.contextMenu(target);
    await expectNoA11yViolations(document.body);
  });
});
