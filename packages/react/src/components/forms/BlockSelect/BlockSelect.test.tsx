import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BlockSelect } from "./BlockSelect";

const modes = [
  { value: "survival", label: "Survival" },
  { value: "creative", label: "Creative" },
  { value: "hardcore", label: "Hardcore", disabled: true },
];

describe("BlockSelect", () => {
  it("renders options from the options prop", () => {
    render(<BlockSelect label="Game mode" options={modes} defaultValue="survival" />);
    const select = screen.getByLabelText("Game mode");
    expect(select).toHaveValue("survival");
    expect(screen.getAllByRole("option")).toHaveLength(3);
    expect(screen.getByRole("option", { name: "Hardcore" })).toBeDisabled();
  });

  it("supports a placeholder and option children", () => {
    render(
      <BlockSelect label="Difficulty" placeholder="Choose…">
        <option value="easy">Easy</option>
      </BlockSelect>,
    );
    expect(screen.getByLabelText("Difficulty")).toHaveValue("");
    expect(screen.getByRole("option", { name: "Choose…" })).toBeDisabled();
  });

  it("changes value and fires onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<BlockSelect label="Mode" options={modes} onChange={onChange} />);
    await user.selectOptions(screen.getByLabelText("Mode"), "creative");
    expect(screen.getByLabelText("Mode")).toHaveValue("creative");
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("supports error and disabled states", () => {
    render(<BlockSelect label="Mode" options={modes} error="Pick a mode" disabled />);
    const select = screen.getByLabelText("Mode");
    expect(select).toBeDisabled();
    expect(select).toHaveAttribute("aria-invalid", "true");
    expect(select).toHaveAccessibleDescription("Pick a mode");
  });

  it("is keyboard focusable and forwards refs", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLSelectElement>();
    render(<BlockSelect ref={ref} label="Mode" options={modes} />);
    await user.tab();
    expect(ref.current).toHaveFocus();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<BlockSelect label="Mode" options={modes} helperText="Can be changed later" />);
    await expectNoA11yViolations(container);
  });
});
