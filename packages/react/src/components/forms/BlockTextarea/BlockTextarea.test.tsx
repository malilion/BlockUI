import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BlockTextarea } from "./BlockTextarea";

describe("BlockTextarea", () => {
  it("renders a labelled textarea", () => {
    render(<BlockTextarea label="Description" placeholder="Write something…" />);
    const textarea = screen.getByLabelText("Description");
    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea).toHaveAttribute("rows", "4");
  });

  it("types, fires onChange and updates the counter", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<BlockTextarea label="Bio" maxLength={20} onChange={onChange} />);
    expect(screen.getByText("0 / 20")).toBeInTheDocument();
    await user.type(screen.getByLabelText("Bio"), "Miner");
    expect(onChange).toHaveBeenCalledTimes(5);
    expect(screen.getByText("5 / 20")).toBeInTheDocument();
  });

  it("supports error state", () => {
    render(<BlockTextarea label="Notes" error="Too long" />);
    const textarea = screen.getByLabelText("Notes");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAccessibleDescription("Too long");
  });

  it("can be disabled", () => {
    render(<BlockTextarea label="Notes" disabled />);
    expect(screen.getByLabelText("Notes")).toBeDisabled();
  });

  it("is keyboard focusable and forwards refs", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLTextAreaElement>();
    render(<BlockTextarea ref={ref} label="Notes" />);
    await user.tab();
    expect(ref.current).toHaveFocus();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <BlockTextarea label="Notes" helperText="Optional" maxLength={100} />,
    );
    await expectNoA11yViolations(container);
  });
});
