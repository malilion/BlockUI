import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BlockStepper } from "./BlockStepper";

const steps = [
  { id: "name", label: "Name", description: "Pick a world name" },
  { id: "mode", label: "Game mode" },
  { id: "seed", label: "Seed" },
  { id: "create", label: "Create" },
];

describe("BlockStepper", () => {
  it("renders a labelled ordered list with the current step marked", () => {
    const ref = createRef<HTMLElement>();
    render(<BlockStepper ref={ref} steps={steps} current={2} />);
    expect(screen.getByRole("navigation", { name: "Progress" })).toBe(ref.current);
    const items = screen.getAllByRole("listitem");
    expect(items.map((item) => item.getAttribute("data-state"))).toEqual([
      "complete",
      "complete",
      "current",
      "upcoming",
    ]);
    expect(items[2]).toHaveAttribute("aria-current", "step");
    expect(items[0]).toHaveTextContent("Name Pick a world name (completed)");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("makes completed steps clickable", async () => {
    const user = userEvent.setup();
    const onStepClick = vi.fn();
    render(
      <BlockStepper steps={steps} current={2} onStepClick={onStepClick} orientation="vertical" />,
    );
    expect(screen.getAllByRole("button")).toHaveLength(2);
    await user.click(screen.getByRole("button", { name: /Game mode/ }));
    expect(onStepClick).toHaveBeenCalledWith(1);
    expect(screen.getByRole("navigation")).toHaveAttribute("data-orientation", "vertical");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<BlockStepper steps={steps} current={1} onStepClick={() => {}} />);
    await expectNoA11yViolations(container);
  });
});
