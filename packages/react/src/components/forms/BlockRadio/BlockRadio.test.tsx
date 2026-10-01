import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BlockRadio, BlockRadioGroup } from "./BlockRadio";

const modes = [
  { value: "survival", label: "Survival" },
  { value: "creative", label: "Creative" },
  { value: "adventure", label: "Adventure", disabled: true },
];

describe("BlockRadioGroup", () => {
  it("renders a labelled group of radios", () => {
    render(<BlockRadioGroup label="Game mode" options={modes} defaultValue="survival" />);
    expect(screen.getByRole("group", { name: "Game mode" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Survival" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Adventure" })).toBeDisabled();
  });

  it("selects on click and with arrow keys", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<BlockRadioGroup label="Mode" options={modes} defaultValue="survival" onValueChange={onValueChange} />);
    await user.click(screen.getByText("Creative"));
    expect(screen.getByRole("radio", { name: "Creative" })).toBeChecked();
    expect(onValueChange).toHaveBeenLastCalledWith("creative");
    await user.keyboard("{ArrowUp}");
    expect(screen.getByRole("radio", { name: "Survival" })).toBeChecked();
  });

  it("supports controlled value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<BlockRadioGroup label="Mode" options={modes} value="survival" onValueChange={onValueChange} />);
    await user.click(screen.getByText("Creative"));
    expect(onValueChange).toHaveBeenCalledWith("creative");
    expect(screen.getByRole("radio", { name: "Survival" })).toBeChecked();
  });

  it("supports disabled and error", () => {
    render(<BlockRadioGroup label="Mode" options={modes} disabled error="Choose one" />);
    for (const radio of screen.getAllByRole("radio")) {
      expect(radio).toBeDisabled();
    }
    expect(screen.getByRole("group")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("group")).toHaveAccessibleDescription("Choose one");
  });

  it("works with BlockRadio children and forwards refs", () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <BlockRadioGroup label="Difficulty" defaultValue="hard">
        <BlockRadio ref={ref} value="easy" label="Easy" />
        <BlockRadio value="hard" label="Hard" description="Hunger drains faster." />
      </BlockRadioGroup>,
    );
    expect(ref.current).not.toBeChecked();
    expect(screen.getByRole("radio", { name: "Hard" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Hard" })).toHaveAccessibleDescription("Hunger drains faster.");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<BlockRadioGroup label="Mode" options={modes} orientation="horizontal" />);
    await expectNoA11yViolations(container);
  });
});
