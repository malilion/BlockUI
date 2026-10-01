import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BlockLoading } from "./BlockLoading";

describe("BlockLoading", () => {
  it("is a polite status with a label", () => {
    render(<BlockLoading />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading…");
  });

  it("supports the bar variant with progress", () => {
    const { container } = render(<BlockLoading variant="bar" label="Generating world…" progress={40} />);
    expect(screen.getByRole("status")).toHaveTextContent("Generating world…");
    expect(container.querySelector('[role="progressbar"]')).toHaveAttribute("aria-valuenow", "40");
  });

  it("can visually hide the label and forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<BlockLoading ref={ref} hideLabel size="lg" label="Saving" />);
    expect(screen.getByText("Saving")).toHaveClass("block-visually-hidden");
    expect(ref.current).toHaveAttribute("data-size", "lg");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<BlockLoading variant="bar" />);
    await expectNoA11yViolations(container);
  });
});
