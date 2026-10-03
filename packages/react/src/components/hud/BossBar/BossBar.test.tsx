import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BossBar } from "./BossBar";
import { bossBarColors } from "./BossBar.types";

describe("BossBar", () => {
  it("renders a meter named by the boss", () => {
    render(<BossBar name="Ender Dragon" value={150} max={200} />);
    const meter = screen.getByRole("meter", { name: "Ender Dragon" });
    expect(meter).toHaveAttribute("aria-valuenow", "150");
    expect(meter).toHaveAttribute("aria-valuemax", "200");
    expect(meter).toHaveAttribute("aria-valuetext", "75%");
    expect(meter.style.getPropertyValue("--block-boss-fill")).toBe("75%");
  });

  it("clamps the value, defaults max to 100 and shows the percentage", () => {
    render(<BossBar name="Wither" value={140} showPercent />);
    expect(screen.getByRole("meter")).toHaveAttribute("aria-valuenow", "100");
    expect(screen.getByText("100%")).toHaveAttribute("aria-hidden", "true");
  });

  it.each(bossBarColors)("supports the %s color", (color) => {
    const ref = createRef<HTMLDivElement>();
    render(<BossBar ref={ref} name="Boss" value={1} color={color} />);
    expect(ref.current).toHaveAttribute("data-material", color);
  });

  it("draws notches only when segments are set", () => {
    const { rerender } = render(<BossBar name="Boss" value={50} />);
    expect(screen.getByRole("meter")).not.toHaveAttribute("data-segments");
    rerender(<BossBar name="Boss" value={50} segments={10} icon={<svg />} />);
    expect(screen.getByRole("meter")).toHaveAttribute("data-segments", "10");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <BossBar name="Ender Dragon" value={60} segments={6} showPercent />,
    );
    await expectNoA11yViolations(container);
  });
});
