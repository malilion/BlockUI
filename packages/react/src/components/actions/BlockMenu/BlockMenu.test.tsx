import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BlockUIProvider } from "../../../provider/BlockUIProvider";
import { BlockMenu } from "./BlockMenu";
import type { BlockMenuEntry } from "./BlockMenu.types";
import { typeaheadIndex } from "./BlockMenu.utils";

const items: BlockMenuEntry[] = [
  { id: "open", label: "Open world", shortcut: "Ctrl+O" },
  { id: "rename", label: "Rename" },
  { id: "backup", label: "Backup", disabled: true },
  { type: "separator" },
  { id: "delete", label: "Delete", danger: true },
];

function setup(props: Partial<Parameters<typeof BlockMenu>[0]> = {}) {
  const user = userEvent.setup();
  const onSelect = vi.fn();
  render(
    <>
      <BlockMenu label="World actions" items={items} onSelect={onSelect} {...props} />
      <button type="button">Outside</button>
    </>,
  );
  const trigger = screen.getByRole("button", { name: "World actions" });
  return { user, onSelect, trigger };
}

describe("BlockMenu", () => {
  it("renders a collapsed menu button", () => {
    const { trigger } = setup();
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens on click and focuses the first item", async () => {
    const { user, trigger } = setup();
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("menu", { name: "World actions" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Open world" })).toHaveFocus();
    expect(screen.getByRole("menuitem", { name: "Backup" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("supports arrow keys with wrap, Home/End, skipping disabled items", async () => {
    const { user, trigger } = setup();
    trigger.focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Open world" })).toHaveFocus();
    await user.keyboard("{ArrowDown}{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Open world" })).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();
    await user.keyboard("{Home}");
    expect(screen.getByRole("menuitem", { name: "Open world" })).toHaveFocus();
    await user.keyboard("{End}");
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();
  });

  it("opens on ArrowUp focusing the last item, and type-ahead jumps", async () => {
    const { user, trigger } = setup();
    trigger.focus();
    await user.keyboard("{ArrowUp}");
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();
    await user.keyboard("r");
    expect(screen.getByRole("menuitem", { name: "Rename" })).toHaveFocus();
  });

  it("chooses with Enter, calls callbacks and returns focus", async () => {
    const itemSelect = vi.fn();
    const onOpenChange = vi.fn();
    const { user, trigger, onSelect } = setup({
      items: [{ id: "open", label: "Open world", onSelect: itemSelect }],
      onOpenChange,
    });
    trigger.focus();
    await user.keyboard("{Enter}");
    await user.keyboard("{Enter}");
    expect(itemSelect).toHaveBeenCalledOnce();
    expect(onSelect).toHaveBeenCalledWith("open");
    expect(onOpenChange.mock.calls).toEqual([[true], [false]]);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("ignores disabled items", async () => {
    const { user, trigger, onSelect } = setup();
    await user.click(trigger);
    await user.click(screen.getByRole("menuitem", { name: "Backup" }));
    expect(onSelect).not.toHaveBeenCalled();
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("closes on Escape (focus returns), Tab and outside click", async () => {
    const { user, trigger } = setup();
    await user.click(trigger);
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();

    await user.keyboard("{Enter}");
    await user.tab();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Outside" })).toHaveFocus();

    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: "Outside" }));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("does not open when disabled", async () => {
    const { user, trigger } = setup({ disabled: true });
    await user.click(trigger);
    trigger.focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("supports an icon-only trigger, alignment and ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<BlockMenu ref={ref} label="More" icon={<svg />} iconOnly align="end" items={items} />);
    expect(screen.getByRole("button", { name: "More" })).toBeInTheDocument();
    expect(document.querySelector('[role="menu"]')).toHaveAttribute("data-align", "end");
  });

  it("renders the menu in the provider's overlay layer, outside scroll containers", async () => {
    const user = userEvent.setup();
    render(
      <BlockUIProvider>
        <div className="scroller">
          <BlockMenu label="Row actions" items={items} />
        </div>
      </BlockUIProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Row actions" }));
    const menu = screen.getByRole("menu");
    expect(menu.closest("[data-block-portal]")).not.toBeNull();
    expect(menu.closest(".scroller")).toBeNull();
    expect(menu.style.getPropertyValue("--block-float-x")).toMatch(/px$/);
    expect(screen.getByRole("menuitem", { name: "Open world" })).toHaveFocus();
    await user.click(screen.getByRole("menuitem", { name: "Rename" }));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("type-ahead wraps and skips disabled items", () => {
    const list = [
      { id: "a", label: "Bed" },
      { id: "b", label: "Bow", disabled: true },
      { id: "c", label: "Boat" },
    ];
    expect(typeaheadIndex(list, 0, "b")).toBe(2);
    expect(typeaheadIndex(list, 2, "B")).toBe(0);
    expect(typeaheadIndex(list, 0, "z")).toBe(-1);
  });

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup();
    const { container } = render(<BlockMenu label="World actions" items={items} />);
    await user.click(screen.getByRole("button"));
    await expectNoA11yViolations(container);
  });
});
