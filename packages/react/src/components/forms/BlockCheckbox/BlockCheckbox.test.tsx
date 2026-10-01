import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BlockCheckbox } from "./BlockCheckbox";

describe("BlockCheckbox", () => {
  it("renders a labelled checkbox", () => {
    render(<BlockCheckbox label="Enable PvP" />);
    expect(screen.getByRole("checkbox", { name: "Enable PvP" })).not.toBeChecked();
  });

  it("toggles on click and Space", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<BlockCheckbox label="Enable PvP" onChange={onChange} />);
    const checkbox = screen.getByRole("checkbox");
    await user.click(screen.getByText("Enable PvP"));
    expect(checkbox).toBeChecked();
    await user.keyboard(" ");
    expect(checkbox).not.toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("supports indeterminate", () => {
    render(<BlockCheckbox label="Select all" indeterminate />);
    const checkbox = screen.getByRole<HTMLInputElement>("checkbox");
    expect(checkbox.indeterminate).toBe(true);
    expect(checkbox).toBePartiallyChecked();
  });

  it("supports description, error and disabled", () => {
    render(
      <BlockCheckbox
        label="Hardcore"
        description="One life only."
        error="Not allowed here"
        disabled
      />,
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
    expect(checkbox).toHaveAccessibleDescription("Not allowed here One life only.");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLInputElement>();
    render(<BlockCheckbox ref={ref} label="Ref" defaultChecked />);
    expect(ref.current).toBeChecked();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <BlockCheckbox label="Enable PvP" description="Players can attack each other." />,
    );
    await expectNoA11yViolations(container);
  });
});
