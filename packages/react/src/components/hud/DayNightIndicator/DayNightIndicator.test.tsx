import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { DayNightIndicator } from "./DayNightIndicator";
import { arcPosition, dayPhase, formatClock, normalizeTime } from "./DayNightIndicator.utils";

describe("DayNightIndicator", () => {
  it("renders the day, clock and phase in a labelled group", () => {
    const ref = createRef<HTMLDivElement>();
    render(<DayNightIndicator ref={ref} time={14.5} day={156} />);
    const group = screen.getByRole("group", { name: "Time of day" });
    expect(group).toBe(ref.current);
    expect(group).toHaveTextContent("Day 156");
    expect(group).toHaveTextContent("14:30");
    expect(group).toHaveAttribute("data-phase", "day");
  });

  it("shows the moon at night and can hide the dial", () => {
    const { container, rerender } = render(<DayNightIndicator time={23} format="12h" />);
    expect(screen.getByRole("group")).toHaveTextContent("11:00 PM");
    expect(screen.getByRole("group")).toHaveTextContent("Night");
    expect(container.querySelector('[data-body="moon"]')).not.toBeNull();
    rerender(<DayNightIndicator time={23} showDial={false} />);
    expect(container.querySelector("[data-body]")).toBeNull();
  });

  it("computes phases, clocks and arc positions", () => {
    expect(normalizeTime(-1)).toBe(23);
    expect(normalizeTime(25)).toBe(1);
    expect([4, 5, 7, 16.9, 17, 19].map(dayPhase)).toEqual([
      "night",
      "dawn",
      "day",
      "day",
      "dusk",
      "night",
    ]);
    expect(formatClock(0, "12h")).toBe("12:00 AM");
    expect(formatClock(12.25, "12h")).toBe("12:15 PM");
    expect(formatClock(9.999, "24h")).toBe("10:00");
    expect(arcPosition(6)).toEqual({ body: "sun", progress: 0, height: 0 });
    expect(arcPosition(12).height).toBeCloseTo(1);
    expect(arcPosition(18)).toMatchObject({ body: "moon", progress: 0 });
    expect(arcPosition(3).progress).toBeCloseTo(0.75);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<DayNightIndicator time={18} day={3} />);
    await expectNoA11yViolations(container);
  });
});
