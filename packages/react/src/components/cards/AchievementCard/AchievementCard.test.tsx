import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { AchievementCard } from "./AchievementCard";

describe("AchievementCard", () => {
  it("renders an unlocked achievement with its date", () => {
    render(
      <AchievementCard
        title="Diamond Hunter"
        description="Find your first diamond."
        unlocked
        unlockedAt="2024/05/20"
        icon={<svg data-testid="icon" />}
      />,
    );
    const card = screen.getByRole("article", { name: "Achievement" });
    expect(card).toHaveAttribute("data-unlocked", "true");
    expect(card).toHaveTextContent("Unlocked on 2024/05/20");
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("shows a locked state and disables View", async () => {
    const user = userEvent.setup();
    const onView = vi.fn();
    render(<AchievementCard title="The End?" icon={<svg data-testid="icon" />} onView={onView} />);
    expect(screen.getByText("Locked")).toBeInTheDocument();
    expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "View" }));
    expect(onView).not.toHaveBeenCalled();
  });

  it("calls onView when unlocked", async () => {
    const user = userEvent.setup();
    const onView = vi.fn();
    render(<AchievementCard title="Stone Age" unlocked onView={onView} />);
    await user.click(screen.getByRole("button", { name: "View" }));
    expect(onView).toHaveBeenCalledTimes(1);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <AchievementCard title="Stone Age" unlocked onView={() => undefined} />,
    );
    await expectNoA11yViolations(container);
  });
});
