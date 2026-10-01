import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { HealthBar } from "./HealthBar";

const fills = (container: HTMLElement) =>
  Array.from(container.querySelectorAll("[data-fill]")).map((el) => el.getAttribute("data-fill"));

describe("HealthBar", () => {
  it("renders a meter with health points", () => {
    render(<HealthBar value={14} max={20} />);
    const meter = screen.getByRole("meter", { name: "Health" });
    expect(meter).toHaveAttribute("aria-valuenow", "14");
    expect(meter).toHaveAttribute("aria-valuemax", "20");
    expect(meter).toHaveAttribute("aria-valuetext", "14 of 20");
  });

  it("draws full, half and empty icons (2 points each)", () => {
    const { container } = render(<HealthBar value={5} max={10} />);
    expect(fills(container)).toEqual(["full", "full", "half", "empty", "empty"]);
  });

  it("clamps values and shows text", () => {
    render(<HealthBar value={99} max={20} showText />);
    expect(screen.getByRole("meter")).toHaveAttribute("aria-valuenow", "20");
    expect(screen.getByText("20 / 20")).toBeInTheDocument();
  });

  it("accepts a custom label, className and ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<HealthBar ref={ref} value={0} label="Pet health" className="custom" />);
    expect(ref.current).toBe(screen.getByRole("meter", { name: "Pet health" }));
    expect(ref.current).toHaveClass("custom");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<HealthBar value={7} />);
    await expectNoA11yViolations(container);
  });
});
