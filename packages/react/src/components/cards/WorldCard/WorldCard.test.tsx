import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { WorldCard } from "./WorldCard";

const world = { name: "My World", gameMode: "Survival", day: 128, seed: "123456789" };

describe("WorldCard", () => {
  it("renders name, mode, day and seed", () => {
    render(<WorldCard {...world} />);
    const card = screen.getByRole("article", { name: "World" });
    expect(card).toHaveTextContent("My World");
    expect(card).toHaveTextContent("Survival · Day 128");
    expect(card).toHaveTextContent("Seed: 123456789");
  });

  it("plays the world", async () => {
    const user = userEvent.setup();
    const onPlay = vi.fn();
    render(<WorldCard {...world} onPlay={onPlay} />);
    await user.click(screen.getByRole("button", { name: "Play My World" }));
    expect(onPlay).toHaveBeenCalledTimes(1);
  });

  it("renders a decorative image or the fallback landscape", () => {
    const { container, rerender } = render(<WorldCard {...world} image="/world.png" lastPlayed="today" />);
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
    expect(screen.getByText("Last played today")).toBeInTheDocument();
    rerender(<WorldCard {...world} />);
    expect(container.querySelector("img")).toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<WorldCard {...world} onPlay={() => undefined} />);
    await expectNoA11yViolations(container);
  });
});
