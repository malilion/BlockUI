import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BlockSlider } from "./BlockSlider";

describe("BlockSlider", () => {
  it("renders a labelled range input with the value", () => {
    render(<BlockSlider label="Render distance" defaultValue={50} />);
    const slider = screen.getByRole("slider", { name: "Render distance" });
    expect(slider).toHaveValue("50");
    expect(slider).toHaveAttribute("aria-valuetext", "50");
    expect(screen.getByText("50")).toBeInTheDocument();
  });

  it("changes with keyboard arrows and reports numbers", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<BlockSlider label="Volume" defaultValue={10} step={5} onValueChange={onValueChange} />);
    const slider = screen.getByRole("slider");
    slider.focus();
    fireEvent.change(slider, { target: { value: "15" } });
    expect(onValueChange).toHaveBeenLastCalledWith(15);
    await user.keyboard("{ArrowRight}");
    expect(slider).toHaveFocus();
  });

  it("clamps out-of-range values and formats text", () => {
    render(<BlockSlider label="FOV" value={200} min={30} max={110} formatValue={(v) => `${v}°`} />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveValue("110");
    expect(slider).toHaveAttribute("aria-valuetext", "110°");
  });

  it("supports disabled, error and refs", () => {
    const ref = createRef<HTMLInputElement>();
    render(<BlockSlider ref={ref} label="Locked" disabled error="Server enforced" />);
    expect(ref.current).toBeDisabled();
    expect(ref.current).toHaveAttribute("aria-invalid", "true");
    expect(ref.current).toHaveAccessibleDescription("Server enforced");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <BlockSlider label="Volume" defaultValue={40} variant="diamond" />,
    );
    await expectNoA11yViolations(container);
  });
});
