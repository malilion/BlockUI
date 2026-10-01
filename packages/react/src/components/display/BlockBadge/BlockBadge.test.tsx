import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BlockBadge } from "./BlockBadge";
import { badgeVariants } from "./BlockBadge.types";

describe("BlockBadge", () => {
  it("renders text with a stone material by default", () => {
    render(<BlockBadge>Admin</BlockBadge>);
    expect(screen.getByText("Admin").parentElement).toHaveAttribute("data-material", "stone");
  });

  it.each(badgeVariants)("supports the %s variant", (variant) => {
    render(<BlockBadge variant={variant}>{variant}</BlockBadge>);
    expect(screen.getByText(variant).parentElement).toHaveAttribute("data-material", variant);
  });

  it("renders a decorative dot and icon, size and ref", () => {
    const ref = createRef<HTMLSpanElement>();
    const { container } = render(
      <BlockBadge ref={ref} dot icon={<svg />} size="sm">
        Online
      </BlockBadge>,
    );
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2);
    expect(ref.current).toHaveAttribute("data-size", "sm");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <BlockBadge dot variant="emerald">
        Online
      </BlockBadge>,
    );
    await expectNoA11yViolations(container);
  });
});
