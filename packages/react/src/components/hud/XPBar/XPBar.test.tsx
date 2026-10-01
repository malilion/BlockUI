import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { XPBar } from "./XPBar";

describe("XPBar", () => {
  it("renders a progressbar with level and XP text", () => {
    render(<XPBar value={1240} max={2000} level={28} showValue />);
    const bar = screen.getByRole("progressbar", { name: "Experience" });
    expect(bar).toHaveAttribute("aria-valuenow", "1240");
    expect(bar).toHaveAttribute("aria-valuemax", "2000");
    expect(bar).toHaveAttribute("aria-valuetext", "Level 28, 1,240 / 2,000 XP");
    expect(screen.getByText("28")).toBeInTheDocument();
    expect(screen.getByText("1,240 / 2,000 XP")).toBeInTheDocument();
  });

  it("works without level and clamps the value", () => {
    render(<XPBar value={5000} max={100} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "100");
    expect(bar).toHaveAttribute("aria-valuetext", "100 / 100 XP");
  });

  it("supports custom label and ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<XPBar ref={ref} value={1} max={2} label="Pet XP" />);
    expect(ref.current).toBe(screen.getByRole("progressbar", { name: "Pet XP" }));
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<XPBar value={10} max={20} level={3} />);
    await expectNoA11yViolations(container);
  });
});
