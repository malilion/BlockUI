import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BiomeIndicator } from "./BiomeIndicator";
import { biomeTypes } from "./BiomeIndicator.types";

describe("BiomeIndicator", () => {
  it.each(biomeTypes)("renders the %s biome with an icon and accent", (type) => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(<BiomeIndicator ref={ref} type={type} />);
    expect(ref.current).toHaveAttribute("data-biome", type);
    expect(ref.current?.getAttribute("data-material")).toBeTruthy();
    expect(container.querySelector('[aria-hidden="true"] svg')).not.toBeNull();
    expect(ref.current).toHaveTextContent(`Biome ${type.charAt(0).toUpperCase()}${type.slice(1)}`);
  });

  it("supports a custom name and icon", () => {
    render(<BiomeIndicator type="forest" name="Dark Forest" icon={<svg data-testid="custom" />} />);
    expect(screen.getByText("Dark Forest")).toBeInTheDocument();
    expect(screen.getByTestId("custom")).toBeInTheDocument();
  });

  it("is a polite status only when announcing", () => {
    const { rerender } = render(<BiomeIndicator type="desert" />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    rerender(<BiomeIndicator type="desert" announce />);
    expect(screen.getByRole("status")).toHaveTextContent("Biome Desert");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<BiomeIndicator type="ocean" announce />);
    await expectNoA11yViolations(container);
  });
});
