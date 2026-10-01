import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { IconButton } from "./IconButton";

const Icon = () => <svg data-testid="icon" />;

describe("IconButton", () => {
  it("uses label as the accessible name and tooltip", () => {
    render(<IconButton icon={<Icon />} label="Settings" />);
    const button = screen.getByRole("button", { name: "Settings" });
    expect(button).toHaveAttribute("title", "Settings");
    expect(screen.getByTestId("icon").parentElement).toHaveAttribute("aria-hidden", "true");
  });

  it("supports variants, sizes and className", () => {
    render(<IconButton icon={<Icon />} label="Play" variant="grass" size="lg" className="x" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-material", "grass");
    expect(button).toHaveClass("lg", "x", "iconButton");
  });

  it("fires onClick and is keyboard operable", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<IconButton icon={<Icon />} label="Close" onClick={onClick} />);
    await user.tab();
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<IconButton icon={<Icon />} label="Close" disabled onClick={onClick} />);
    await user.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<IconButton ref={ref} icon={<Icon />} label="Ref" />);
    expect(ref.current).toBe(screen.getByRole("button"));
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<IconButton icon={<Icon />} label="Search" />);
    await expectNoA11yViolations(container);
  });
});
