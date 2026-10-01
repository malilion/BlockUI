import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { PlayerCard } from "./PlayerCard";

describe("PlayerCard", () => {
  it("renders name, level, status and XP", () => {
    render(<PlayerCard name="Alex" level={42} status="Online" xp={600} maxXp={1000} />);
    const card = screen.getByRole("article", { name: "Player" });
    expect(card).toHaveTextContent("Alex");
    expect(card).toHaveTextContent("Level 42");
    expect(screen.getByText("Online").parentElement).toHaveAttribute("data-material", "emerald");
    expect(screen.getByRole("progressbar", { name: "Experience" })).toHaveAttribute(
      "aria-valuenow",
      "600",
    );
  });

  it("maps status colors and renders stats", () => {
    render(
      <PlayerCard
        name="Steve"
        status="Offline"
        stats={[
          { label: "Achievements", value: "28 / 126" },
          { label: "Last Online", value: "2 hours ago" },
        ]}
      />,
    );
    expect(screen.getByText("Offline").parentElement).toHaveAttribute("data-material", "redstone");
    expect(screen.getByText("Achievements")).toBeInTheDocument();
    expect(screen.getByText("28 / 126")).toBeInTheDocument();
  });

  it("uses a decorative avatar image and the profile action", async () => {
    const user = userEvent.setup();
    const onViewProfile = vi.fn();
    const { container } = render(
      <PlayerCard name="Alex" avatar="/alex.png" onViewProfile={onViewProfile} />,
    );
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
    await user.click(screen.getByRole("button", { name: "Profile" }));
    expect(onViewProfile).toHaveBeenCalledTimes(1);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <PlayerCard
        name="Alex"
        level={42}
        status="AFK"
        xp={1}
        maxXp={2}
        stats={[{ label: "Mode", value: "Survival" }]}
      />,
    );
    await expectNoA11yViolations(container);
  });
});
