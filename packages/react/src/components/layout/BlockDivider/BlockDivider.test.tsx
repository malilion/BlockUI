import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BlockDivider } from "./BlockDivider";
import { dividerVariants } from "./BlockDivider.types";

describe("BlockDivider", () => {
  it("renders a horizontal <hr> separator by default", () => {
    const ref = createRef<HTMLElement>();
    render(<BlockDivider ref={ref} />);
    const separator = screen.getByRole("separator");
    expect(separator.tagName).toBe("HR");
    expect(separator).toHaveAttribute("data-variant", "bevel");
    expect(ref.current).toBe(separator);
  });

  it("renders a vertical separator", () => {
    render(<BlockDivider orientation="vertical" />);
    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "vertical");
  });

  it.each(dividerVariants)("supports the %s variant", (variant) => {
    render(<BlockDivider variant={variant} />);
    expect(screen.getByRole("separator")).toHaveAttribute("data-variant", variant);
  });

  it("reads a label as text instead of a separator", () => {
    render(<BlockDivider label="or" />);
    expect(screen.queryByRole("separator")).not.toBeInTheDocument();
    expect(screen.getByText("or")).toBeInTheDocument();
  });

  it("hides decorative dividers", () => {
    const { rerender } = render(<BlockDivider decorative />);
    expect(screen.queryByRole("separator")).not.toBeInTheDocument();
    rerender(<BlockDivider decorative orientation="vertical" />);
    expect(screen.queryByRole("separator")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <BlockDivider />
        <BlockDivider label="or" />
        <BlockDivider orientation="vertical" />
      </div>,
    );
    await expectNoA11yViolations(container);
  });
});
