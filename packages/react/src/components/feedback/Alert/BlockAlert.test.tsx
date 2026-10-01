import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BlockAlert } from "./BlockAlert";
import { alertVariants } from "./BlockAlert.types";

describe("BlockAlert", () => {
  it.each([
    ["success", "status"],
    ["info", "status"],
    ["warning", "alert"],
    ["error", "alert"],
  ] as const)("%s uses role=%s", (variant, role) => {
    render(
      <BlockAlert variant={variant} title={variant}>
        Message
      </BlockAlert>,
    );
    const alert = screen.getByRole(role, { name: variant });
    expect(alert).toHaveAttribute("data-variant", variant);
    expect(alert).toHaveTextContent("Message");
  });

  it("maps variants to materials", () => {
    const materials = alertVariants.map((variant) => {
      const { container } = render(<BlockAlert variant={variant}>x</BlockAlert>);
      return (container.firstChild as HTMLElement).getAttribute("data-material");
    });
    expect(materials).toEqual(["emerald", "water", "gold", "redstone"]);
  });

  it("renders a dismiss button when onClose is set", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <BlockAlert title="Warning" variant="warning" onClose={onClose} closeLabel="Hide warning">
        Low hunger!
      </BlockAlert>,
    );
    await user.click(screen.getByRole("button", { name: "Hide warning" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("supports custom icon, no icon, action and ref", () => {
    const ref = createRef<HTMLDivElement>();
    const { rerender, container } = render(
      <BlockAlert
        ref={ref}
        icon={<svg data-testid="custom" />}
        action={<button type="button">Retry</button>}
      >
        x
      </BlockAlert>,
    );
    expect(screen.getByTestId("custom")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
    rerender(<BlockAlert icon={false}>x</BlockAlert>);
    expect(container.querySelector("svg")).toBeNull();
    expect(ref.current).toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <BlockAlert variant="success" title="Success!" onClose={() => undefined}>
          Your world has been saved.
        </BlockAlert>
        <BlockAlert variant="error" title="Error">
          Failed to connect to server.
        </BlockAlert>
      </div>,
    );
    await expectNoA11yViolations(container);
  });
});
