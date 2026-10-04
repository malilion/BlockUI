import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { Kbd } from "./Kbd";

describe("Kbd", () => {
  it("renders a single key as <kbd>", () => {
    const ref = createRef<HTMLElement>();
    render(<Kbd ref={ref}>E</Kbd>);
    expect(ref.current?.tagName).toBe("KBD");
    expect(ref.current).toHaveTextContent("E");
  });

  it("renders combinations as nested keys with decorative plus signs", () => {
    const ref = createRef<HTMLElement>();
    render(<Kbd ref={ref} keys={["Ctrl", "Shift", "C"]} size="sm" />);
    expect(ref.current?.querySelectorAll("kbd")).toHaveLength(3);
    expect(ref.current?.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2);
    expect(ref.current).toHaveAttribute("data-size", "sm");
    expect(screen.getByText("Shift").tagName).toBe("KBD");
  });

  it("treats a one-item keys array as a single key", () => {
    const ref = createRef<HTMLElement>();
    render(<Kbd ref={ref} keys={["F3"]} />);
    expect(ref.current?.querySelectorAll("kbd")).toHaveLength(0);
    expect(ref.current).toHaveTextContent("F3");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <p>
        Press <Kbd>E</Kbd> or <Kbd keys={["Ctrl", "E"]} />
      </p>,
    );
    await expectNoA11yViolations(container);
  });
});
