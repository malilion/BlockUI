import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { HotbarNavigation } from "./HotbarNavigation";

const items = ["Home", "Inventory", "Craft", "Quest", "Settings", "Extra"].map((label) => ({
  id: label.toLowerCase(),
  label,
  icon: <svg />,
}));

describe("HotbarNavigation", () => {
  it("shows at most 5 items and marks the first as current", () => {
    render(<HotbarNavigation items={items} />);
    const nav = screen.getByRole("navigation", { name: "Quick navigation" });
    expect(within(nav).getAllByRole("listitem")).toHaveLength(5);
    expect(screen.queryByText("Extra")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Home" })).toHaveAttribute("aria-current", "page");
  });

  it("changes the active item on tap / click and Enter", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<HotbarNavigation items={items} onValueChange={onValueChange} />);
    await user.click(screen.getByRole("button", { name: "Craft" }));
    expect(screen.getByRole("button", { name: "Craft" })).toHaveAttribute("aria-current", "page");
    screen.getByRole("button", { name: "Quest" }).focus();
    await user.keyboard("{Enter}");
    expect(onValueChange.mock.calls).toEqual([["craft"], ["quest"]]);
  });

  it("supports links, badges, maxItems, fixed and mobileOnly", () => {
    render(
      <HotbarNavigation
        items={[{ id: "a", label: "A", icon: <svg />, href: "#a", badge: 2 }, ...items]}
        maxItems={3}
        fixed
        mobileOnly
        value="a"
      />,
    );
    expect(screen.getByRole("link", { name: "A (2)" })).toHaveAttribute("aria-current", "page");
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("data-fixed", "true");
    expect(nav).toHaveAttribute("data-mobile-only", "true");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<HotbarNavigation items={items} />);
    await expectNoA11yViolations(container);
  });
});
