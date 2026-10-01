import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { Breadcrumb } from "./Breadcrumb";

describe("Breadcrumb", () => {
  it("renders an ordered trail with the current page", () => {
    render(
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Worlds", href: "/worlds" }, { label: "My World" }]}
      />,
    );
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(nav).getAllByRole("listitem")).toHaveLength(3);
    expect(within(nav).getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(within(nav).getByText("My World").parentElement).toHaveAttribute("aria-current", "page");
  });

  it("supports onClick items, plain items and a custom separator", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Breadcrumb
        separator="/"
        items={[{ label: "Home", onClick }, { label: "Section" }, { label: "Page" }]}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Home" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getAllByText("/")).toHaveLength(2);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Inventory" }]} />);
    await expectNoA11yViolations(container);
  });
});
