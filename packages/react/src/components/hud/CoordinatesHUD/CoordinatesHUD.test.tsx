import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { CoordinatesHUD } from "./CoordinatesHUD";
import { coordinatesText, formatCoordinate } from "./CoordinatesHUD.utils";

describe("CoordinatesHUD", () => {
  it("renders a labelled group with X / Y / Z and facing", () => {
    const ref = createRef<HTMLDivElement>();
    render(<CoordinatesHUD ref={ref} x={120} y={64} z={-340} facing="north" />);
    const group = screen.getByRole("group", { name: "Coordinates" });
    expect(group).toBe(ref.current);
    expect(group).toHaveTextContent("X 120");
    expect(group).toHaveTextContent("Y 64");
    expect(group).toHaveTextContent("Z −340");
    expect(group).toHaveTextContent("Facing north (−Z)");
  });

  it("formats decimals and never shows −0", () => {
    expect(formatCoordinate(-3.456, 1)).toBe("−3.5");
    expect(formatCoordinate(-0.2, 0)).toBe("0");
    expect(formatCoordinate(12, 2)).toBe("12.00");
    expect(coordinatesText(1.5, -2, 3, 1)).toBe("1.5 -2.0 3.0");
  });

  it("copies plain coordinates and announces it", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    render(<CoordinatesHUD x={120} y={64} z={-340} copyable size="sm" label="Position" />);
    await user.click(screen.getByRole("button", { name: "Copy coordinates" }));
    expect(writeText).toHaveBeenCalledWith("120 64 -340");
    expect(screen.getByRole("status")).toHaveTextContent("Coordinates copied");
    expect(screen.getByRole("button", { name: "Coordinates copied" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Position" })).toHaveAttribute("data-size", "sm");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<CoordinatesHUD x={1} y={2} z={3} facing="east" copyable />);
    await expectNoA11yViolations(container);
  });
});
