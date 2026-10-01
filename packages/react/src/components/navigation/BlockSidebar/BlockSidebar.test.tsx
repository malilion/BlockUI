import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BlockSidebar, SidebarItem } from "./BlockSidebar";

describe("BlockSidebar", () => {
  it("renders a labelled nav with a list of items", () => {
    render(
      <BlockSidebar header={<strong>Block UI</strong>} footer={<span>v0.1</span>}>
        <SidebarItem icon={<svg />} active href="#dashboard">
          Dashboard
        </SidebarItem>
        <SidebarItem icon={<svg />} href="#inventory" badge={3}>
          Inventory
        </SidebarItem>
      </BlockSidebar>,
    );
    const nav = screen.getByRole("navigation", { name: "Main" });
    expect(within(nav).getAllByRole("listitem")).toHaveLength(2);
    expect(within(nav).getByRole("link", { name: "Dashboard" })).toHaveAttribute("aria-current", "page");
    expect(within(nav).getByRole("link", { name: "Inventory 3" })).not.toHaveAttribute("aria-current");
    expect(nav).toHaveTextContent("v0.1");
  });

  it("renders buttons without href and handles clicks", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <BlockSidebar>
        <SidebarItem onClick={onClick}>Crafting</SidebarItem>
        <SidebarItem onClick={onClick} disabled>
          Locked
        </SidebarItem>
      </BlockSidebar>,
    );
    await user.click(screen.getByRole("button", { name: "Crafting" }));
    await user.click(screen.getByRole("button", { name: "Locked" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Locked" })).toHaveAttribute("aria-disabled", "true");
  });

  it("is keyboard navigable", async () => {
    const user = userEvent.setup();
    render(
      <BlockSidebar>
        <SidebarItem href="#a">A</SidebarItem>
        <SidebarItem href="#b">B</SidebarItem>
      </BlockSidebar>,
    );
    await user.tab();
    expect(screen.getByRole("link", { name: "A" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("link", { name: "B" })).toHaveFocus();
  });

  it("collapses to icons and keeps labels accessible", () => {
    render(
      <BlockSidebar collapsed label="Game">
        <SidebarItem icon={<svg />} href="#q">
          Quests
        </SidebarItem>
      </BlockSidebar>,
    );
    expect(screen.getByRole("navigation", { name: "Game" })).toHaveAttribute("data-collapsed", "true");
    const link = screen.getByRole("link", { name: "Quests" });
    expect(link).toHaveAttribute("title", "Quests");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <BlockSidebar>
        <SidebarItem href="#a" active icon={<svg />}>
          Dashboard
        </SidebarItem>
        <SidebarItem onClick={() => undefined}>Settings</SidebarItem>
      </BlockSidebar>,
    );
    await expectNoA11yViolations(container);
  });
});
