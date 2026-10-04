import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders a heading, description, default icon and action", () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <EmptyState
        ref={ref}
        title="No worlds yet"
        description="Create one to start playing."
        action={<button type="button">Create world</button>}
      />,
    );
    expect(screen.getByRole("heading", { level: 3, name: "No worlds yet" })).toBeInTheDocument();
    expect(screen.getByText("Create one to start playing.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create world" })).toBeInTheDocument();
    expect(container.querySelector('[aria-hidden="true"] svg')).not.toBeNull();
    expect(ref.current).toHaveAttribute("data-size", "md");
  });

  it("supports a custom icon, heading level and size", () => {
    render(
      <EmptyState title="Empty" icon={<svg data-testid="icon" />} headingLevel={2} size="sm" />,
    );
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<EmptyState title="No servers" description="Add one." />);
    await expectNoA11yViolations(container);
  });
});
