import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BlockButton } from "./BlockButton";
import { blockButtonVariants } from "./BlockButton.types";

describe("BlockButton", () => {
  it("renders a stone md button by default", () => {
    render(<BlockButton>Start</BlockButton>);
    const button = screen.getByRole("button", { name: "Start" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-material", "stone");
    expect(button).toHaveAttribute("data-size", "md");
    expect(button).not.toHaveAttribute("aria-disabled");
  });

  it.each(blockButtonVariants)("supports the %s variant", (variant) => {
    render(<BlockButton variant={variant}>{variant}</BlockButton>);
    expect(screen.getByRole("button")).toHaveAttribute("data-material", variant);
  });

  it.each(["sm", "md", "lg"] as const)("supports the %s size", (size) => {
    render(<BlockButton size={size}>Size</BlockButton>);
    expect(screen.getByRole("button")).toHaveClass(size);
  });

  it("fires onClick on click, Enter and Space", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<BlockButton onClick={onClick}>Craft</BlockButton>);
    const button = screen.getByRole("button");
    await user.click(button);
    button.focus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it("does not fire onClick when disabled, but stays focusable", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <BlockButton disabled onClick={onClick}>
        Delete
      </BlockButton>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-disabled", "true");
    await user.tab();
    expect(button).toHaveFocus();
    await user.click(button);
    await user.keyboard("{Enter}");
    expect(onClick).not.toHaveBeenCalled();
  });

  it("shows a loading state and blocks repeated clicks", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <BlockButton loading onClick={onClick}>
        Saving
      </BlockButton>,
    );
    const button = screen.getByRole("button", { name: "Saving" });
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).toHaveAttribute("data-loading", "true");
    await user.click(button);
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders icons, fullWidth and custom className", () => {
    render(
      <BlockButton fullWidth className="custom" startIcon={<svg data-testid="start" />} endIcon={<svg data-testid="end" />}>
        Go
      </BlockButton>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("fullWidth", "custom");
    expect(screen.getByTestId("start")).toBeInTheDocument();
    expect(screen.getByTestId("end")).toBeInTheDocument();
  });

  it("forwards refs and native attributes", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <BlockButton ref={ref} type="submit" aria-label="Submit form">
        OK
      </BlockButton>,
    );
    expect(ref.current).toBe(screen.getByRole("button", { name: "Submit form" }));
    expect(ref.current).toHaveAttribute("type", "submit");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <BlockButton variant="grass">Start</BlockButton>
        <BlockButton disabled>Disabled</BlockButton>
        <BlockButton loading>Loading</BlockButton>
      </div>,
    );
    await expectNoA11yViolations(container);
  });
});
