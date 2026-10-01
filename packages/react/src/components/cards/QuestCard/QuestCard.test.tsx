import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { QuestCard } from "./QuestCard";

const quest = {
  title: "Find Diamonds",
  description: "Mine 10 diamonds.",
  progress: 7,
  max: 10,
  xp: 120,
  coins: 500,
};

describe("QuestCard", () => {
  it("renders title, description, progress and rewards", () => {
    render(<QuestCard {...quest} />);
    const card = screen.getByRole("article", { name: "Quest" });
    expect(card).toHaveTextContent("Find Diamonds");
    expect(card).toHaveTextContent("Mine 10 diamonds.");
    const progress = screen.getByRole("progressbar", { name: "Progress" });
    expect(progress).toHaveAttribute("aria-valuenow", "7");
    expect(progress).toHaveAttribute("aria-valuetext", "7 / 10");
    expect(screen.getByRole("list")).toHaveTextContent("120 XP500 coins");
  });

  it("disables Claim until completed", async () => {
    const user = userEvent.setup();
    const onClaim = vi.fn();
    const { rerender } = render(<QuestCard {...quest} onClaim={onClaim} />);
    await user.click(screen.getByRole("button", { name: "In progress" }));
    expect(onClaim).not.toHaveBeenCalled();
    rerender(<QuestCard {...quest} progress={10} onClaim={onClaim} />);
    expect(screen.getByRole("article")).toHaveAttribute("data-completed", "true");
    await user.click(screen.getByRole("button", { name: "Claim" }));
    expect(onClaim).toHaveBeenCalledTimes(1);
  });

  it("honours completed and claimed flags", () => {
    render(<QuestCard {...quest} completed claimed onClaim={() => undefined} />);
    expect(screen.getByRole("button", { name: "Claimed" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<QuestCard {...quest} onClaim={() => undefined} />);
    await expectNoA11yViolations(container);
  });
});
