import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { Avatar } from "./Avatar";
import { avatarStatuses } from "./Avatar.types";
import { avatarMaterial, initials } from "./Avatar.utils";

describe("Avatar", () => {
  it("shows initials on a stable material and is named by the player", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Avatar ref={ref} name="Block Master" size="lg" />);
    const avatar = screen.getByRole("img", { name: "Block Master" });
    expect(avatar).toBe(ref.current);
    expect(avatar).toHaveTextContent("BM");
    expect(avatar).toHaveAttribute("data-size", "lg");
    expect(avatar).toHaveAttribute("data-material", avatarMaterial("Block Master"));
  });

  it("renders an image and falls back to initials when it fails", () => {
    const { container } = render(<Avatar name="Steve" src="/steve.png" />);
    const img = container.querySelector("img")!;
    expect(img).toHaveAttribute("alt", "");
    fireEvent.error(img);
    expect(container.querySelector("img")).toBeNull();
    expect(screen.getByRole("img", { name: "Steve" })).toHaveTextContent("ST");
  });

  it.each(avatarStatuses)("announces the %s status", (status) => {
    render(<Avatar name="Alex" status={status} />);
    expect(screen.getByRole("img", { name: `Alex (${status})` })).toBeInTheDocument();
  });

  it("supports an icon and decorative use", () => {
    const { container } = render(
      <Avatar name="Bot" icon={<svg data-testid="icon" />} decorative />,
    );
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("derives initials", () => {
    expect(initials("BlockMaster_42")).toBe("B4");
    expect(initials("notch")).toBe("NO");
    expect(initials("jeb_")).toBe("JE");
    expect(initials("  ")).toBe("?");
    expect(avatarMaterial("Steve")).toBe(avatarMaterial("Steve"));
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Avatar name="Alex" status="online" />);
    await expectNoA11yViolations(container);
  });
});
