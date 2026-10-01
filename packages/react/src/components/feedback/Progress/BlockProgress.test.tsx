import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BlockProgress } from "./BlockProgress";
import { progressVariants } from "./BlockProgress.types";

describe("BlockProgress", () => {
  it("renders a labelled progressbar", () => {
    render(<BlockProgress value={70} max={100} label="Download" showValue />);
    const bar = screen.getByRole("progressbar", { name: "Download" });
    expect(bar).toHaveAttribute("aria-valuenow", "70");
    expect(bar).toHaveAttribute("aria-valuetext", "70%");
    expect(screen.getByText("70%")).toBeInTheDocument();
  });

  it.each(progressVariants)("supports the %s variant", (variant) => {
    render(<BlockProgress value={10} variant={variant} />);
    expect(screen.getByRole("progressbar", { name: "Progress" })).toHaveAttribute(
      "data-material",
      variant,
    );
  });

  it("is indeterminate without a value", () => {
    render(<BlockProgress aria-label="Generating world" />);
    const bar = screen.getByRole("progressbar", { name: "Generating world" });
    expect(bar).not.toHaveAttribute("aria-valuenow");
    expect(bar).toHaveAttribute("aria-busy", "true");
  });

  it("clamps and formats values, supports sizes and refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <BlockProgress
        ref={ref}
        value={30}
        max={20}
        size="lg"
        formatValue={(v, m) => `${v} of ${m}`}
        aria-label="Quest"
      />,
    );
    expect(ref.current).toHaveAttribute("aria-valuenow", "20");
    expect(ref.current).toHaveAttribute("aria-valuetext", "20 of 20");
    expect(ref.current).toHaveAttribute("data-size", "lg");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<BlockProgress value={50} label="Loading chunks" />);
    await expectNoA11yViolations(container);
  });
});
