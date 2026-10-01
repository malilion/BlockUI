import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BlockToggle } from "./BlockToggle";

describe("BlockToggle", () => {
  it("renders a switch", () => {
    render(<BlockToggle label="Music" />);
    expect(screen.getByRole("switch", { name: "Music" })).not.toBeChecked();
  });

  it("toggles with click and Space and reports the state", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<BlockToggle label="Music" onCheckedChange={onCheckedChange} />);
    const toggle = screen.getByRole("switch");
    await user.click(toggle);
    expect(toggle).toBeChecked();
    await user.keyboard(" ");
    expect(toggle).not.toBeChecked();
    expect(onCheckedChange.mock.calls).toEqual([[true], [false]]);
  });

  it("can be disabled", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<BlockToggle label="Locked" disabled onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("switch"));
    expect(screen.getByRole("switch")).toBeDisabled();
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("supports controlled usage, description and refs", () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <BlockToggle
        ref={ref}
        label="Weather"
        description="Rain and thunder"
        checked
        readOnly
        size="sm"
      />,
    );
    expect(ref.current).toBeChecked();
    expect(screen.getByRole("switch")).toHaveAccessibleDescription("Rain and thunder");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<BlockToggle label="Music" defaultChecked />);
    await expectNoA11yViolations(container);
  });
});
