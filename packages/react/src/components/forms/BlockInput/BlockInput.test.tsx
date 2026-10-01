import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BlockInput } from "./BlockInput";

describe("BlockInput", () => {
  it("associates the label with the input", () => {
    render(<BlockInput label="Player Name" placeholder="Steve" />);
    const input = screen.getByLabelText("Player Name");
    expect(input).toHaveAttribute("placeholder", "Steve");
    expect(input).toHaveAttribute("type", "text");
  });

  it("accepts typing and fires onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<BlockInput label="Name" onChange={onChange} />);
    await user.type(screen.getByLabelText("Name"), "Alex");
    expect(screen.getByLabelText("Name")).toHaveValue("Alex");
    expect(onChange).toHaveBeenCalledTimes(4);
  });

  it("announces errors with aria-invalid and aria-describedby", () => {
    render(<BlockInput label="Seed" error="Seed must be numeric" helperText="Leave empty for random" />);
    const input = screen.getByLabelText("Seed");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Seed must be numeric Leave empty for random");
  });

  it("marks success", () => {
    const { container } = render(<BlockInput label="Server" success />);
    expect(container.firstChild).toHaveAttribute("data-success", "true");
    expect(screen.getByLabelText("Server")).not.toHaveAttribute("aria-invalid");
  });

  it("can be disabled", async () => {
    const user = userEvent.setup();
    render(<BlockInput label="Locked" disabled />);
    const input = screen.getByLabelText("Locked");
    expect(input).toBeDisabled();
    await user.type(input, "x");
    expect(input).toHaveValue("");
  });

  it("is reachable with the keyboard and forwards refs", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLInputElement>();
    render(<BlockInput ref={ref} label="Focus me" startIcon={<svg />} endAdornment={<span>⌘K</span>} />);
    await user.tab();
    expect(ref.current).toHaveFocus();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<BlockInput label="Player Name" error="Required" helperText="3–16 characters" />);
    await expectNoA11yViolations(container);
  });
});
