import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { NumberInput } from "./NumberInput";
import { normalizeNumber, parseNumber, stepPrecision } from "./NumberInput.utils";

describe("NumberInput", () => {
  it("renders a labelled spinbutton with range values", () => {
    const ref = createRef<HTMLInputElement>();
    render(<NumberInput ref={ref} label="Amount" defaultValue={8} min={1} max={64} />);
    const input = screen.getByRole("spinbutton", { name: "Amount" });
    expect(input).toBe(ref.current);
    expect(input).toHaveValue("8");
    expect(input).toHaveAttribute("aria-valuenow", "8");
    expect(input).toHaveAttribute("aria-valuemin", "1");
    expect(input).toHaveAttribute("aria-valuemax", "64");
  });

  it("steps with the buttons and keys, clamping to the range", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <NumberInput
        label="Amount"
        defaultValue={60}
        min={1}
        max={64}
        onValueChange={onValueChange}
      />,
    );
    const input = screen.getByRole("spinbutton");
    await user.click(screen.getByRole("button", { name: "Increase" }));
    expect(input).toHaveValue("61");
    await user.click(input);
    await user.keyboard("{ArrowUp}{PageUp}");
    expect(input).toHaveValue("64");
    expect(screen.getByRole("button", { name: "Increase" })).toBeDisabled();
    await user.keyboard("{PageDown}{ArrowDown}");
    expect(input).toHaveValue("53");
    await user.keyboard("{Home}");
    expect(input).toHaveValue("1");
    expect(screen.getByRole("button", { name: "Decrease" })).toBeDisabled();
    await user.keyboard("{End}");
    expect(onValueChange).toHaveBeenLastCalledWith(64);
  });

  it("commits typed text on Enter and blur, clamping and rounding", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<NumberInput label="Price" min={0} max={10} step={0.5} onValueChange={onValueChange} />);
    const input = screen.getByRole("spinbutton");
    expect(input).toHaveValue("");
    await user.type(input, "3.26{Enter}");
    expect(onValueChange).toHaveBeenLastCalledWith(3.3);
    expect(input).toHaveValue("3.3");
    await user.clear(input);
    await user.type(input, "99");
    await user.tab();
    expect(input).toHaveValue("10.0");
    await user.clear(input);
    await user.tab();
    expect(onValueChange).toHaveBeenLastCalledWith(null);
  });

  it("keeps step buttons out of the tab order and respects disabled", async () => {
    const user = userEvent.setup();
    render(<NumberInput label="Amount" defaultValue={1} disabled />);
    expect(screen.getByRole("button", { name: "Increase" })).toHaveAttribute("tabindex", "-1");
    expect(screen.getByRole("spinbutton")).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "Increase" }));
    expect(screen.getByRole("spinbutton")).toHaveValue("1");
  });

  it("parses, normalizes and measures precision", () => {
    expect(parseNumber(" 4 ")).toBe(4);
    expect(parseNumber("-3,5")).toBe(-3.5);
    expect(parseNumber("abc")).toBeNull();
    expect(parseNumber("-")).toBeNull();
    expect(stepPrecision(0.25)).toBe(2);
    expect(normalizeNumber(3.14159, { step: 0.01 })).toBe(3.14);
    expect(normalizeNumber(-5, { min: 0 })).toBe(0);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <NumberInput label="Amount" defaultValue={3} min={1} max={64} helperText="1–64" />,
    );
    await expectNoA11yViolations(container);
  });
});
