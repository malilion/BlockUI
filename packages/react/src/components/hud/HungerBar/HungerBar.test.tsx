import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { HungerBar } from "./HungerBar";

const fills = (container: HTMLElement) =>
  Array.from(container.querySelectorAll("[data-fill]")).map((el) => el.getAttribute("data-fill"));

describe("HungerBar", () => {
  it("renders a meter with hunger points", () => {
    render(<HungerBar value={14} max={20} />);
    const meter = screen.getByRole("meter", { name: "Hunger" });
    expect(meter).toHaveAttribute("aria-valuenow", "14");
    expect(meter).toHaveAttribute("aria-valuemax", "20");
    expect(meter).toHaveAttribute("aria-valuetext", "14 of 20");
  });

  it("draws full, half and empty icons (2 points each)", () => {
    const { container } = render(<HungerBar value={5} max={10} />);
    expect(fills(container)).toEqual(["full", "full", "half", "empty", "empty"]);
  });

  it("clamps values and shows text", () => {
    render(<HungerBar value={99} max={20} showText />);
    expect(screen.getByRole("meter")).toHaveAttribute("aria-valuenow", "20");
    expect(screen.getByText("20 / 20")).toBeInTheDocument();
  });

  it("accepts a custom label, className and ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<HungerBar ref={ref} value={0} label="Pet hunger" className="custom" />);
    expect(ref.current).toBe(screen.getByRole("meter", { name: "Pet hunger" }));
    expect(ref.current).toHaveClass("custom");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<HungerBar value={7} />);
    await expectNoA11yViolations(container);
  });
});
