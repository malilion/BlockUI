import { render } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { Skeleton } from "./Skeleton";
import { skeletonVariants } from "./Skeleton.types";

describe("Skeleton", () => {
  it("is decorative and renders text lines with a shorter last line", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Skeleton ref={ref} lines={3} width="200px" />);
    expect(ref.current).toHaveAttribute("aria-hidden", "true");
    const bones = ref.current!.children;
    expect(bones).toHaveLength(3);
    expect(bones[2]).toHaveAttribute("data-last");
    expect(ref.current!.style.getPropertyValue("--block-skeleton-width")).toBe("200px");
  });

  it.each(skeletonVariants)("supports the %s variant with a single bone", (variant) => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <Skeleton ref={ref} variant={variant} lines={variant === "text" ? 1 : 4} height="80px" />,
    );
    expect(ref.current).toHaveAttribute("data-variant", variant);
    expect(ref.current!.children).toHaveLength(1);
    expect(ref.current!.style.getPropertyValue("--block-skeleton-height")).toBe("80px");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div aria-busy="true">
        <Skeleton lines={2} />
      </div>,
    );
    await expectNoA11yViolations(container);
  });
});
