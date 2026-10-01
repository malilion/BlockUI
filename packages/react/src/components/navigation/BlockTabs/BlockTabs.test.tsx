import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BlockTabs } from "./BlockTabs";

const items = [
  { id: "blocks", label: "Blocks", content: "Blocks panel" },
  { id: "tools", label: "Tools", content: "Tools panel" },
  { id: "locked", label: "Locked", content: "Locked panel", disabled: true },
  { id: "food", label: "Food", content: "Food panel" },
];

describe("BlockTabs", () => {
  it("renders tabs with the first enabled tab active", () => {
    render(<BlockTabs items={items} label="Creative inventory" />);
    expect(screen.getByRole("tablist", { name: "Creative inventory" })).toBeInTheDocument();
    const blocks = screen.getByRole("tab", { name: "Blocks" });
    expect(blocks).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "Blocks" })).toHaveTextContent("Blocks panel");
    expect(screen.getByRole("tab", { name: "Locked" })).toBeDisabled();
  });

  it("activates on click", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<BlockTabs items={items} onValueChange={onValueChange} />);
    await user.click(screen.getByRole("tab", { name: "Tools" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Tools panel");
    expect(onValueChange).toHaveBeenCalledWith("tools");
  });

  it("supports arrow keys with wrap, Home/End and skips disabled tabs", async () => {
    const user = userEvent.setup();
    render(<BlockTabs items={items} />);
    await user.tab();
    expect(screen.getByRole("tab", { name: "Blocks" })).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Tools" })).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Food" })).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Blocks" })).toHaveFocus();
    await user.keyboard("{ArrowLeft}");
    expect(screen.getByRole("tab", { name: "Food" })).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{Home}");
    expect(screen.getByRole("tab", { name: "Blocks" })).toHaveFocus();
    await user.keyboard("{End}");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Food panel");
    await user.tab();
    expect(screen.getByRole("tabpanel")).toHaveFocus();
  });

  it("supports controlled value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<BlockTabs items={items} value="food" onValueChange={onValueChange} />);
    await user.click(screen.getByRole("tab", { name: "Tools" }));
    expect(onValueChange).toHaveBeenCalledWith("tools");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Food panel");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<BlockTabs items={items} label="Inventory tabs" />);
    await expectNoA11yViolations(container);
  });
});
