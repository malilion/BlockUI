import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { pingQuality, ServerCard } from "./ServerCard";

describe("ServerCard", () => {
  it("renders players, version and ping", () => {
    render(<ServerCard name="BlockCraft SMP" onlinePlayers={12} maxPlayers={50} version="1.20.4" ping={32} />);
    const card = screen.getByRole("article", { name: "Server" });
    expect(card).toHaveTextContent("BlockCraft SMP");
    expect(card).toHaveTextContent("12 / 50");
    expect(card).toHaveTextContent("1.20.4");
    expect(screen.getByRole("img", { name: "Ping: 32 ms" })).toHaveAttribute("data-quality", "good");
  });

  it("classifies ping quality", () => {
    expect(pingQuality(30)).toBe("good");
    expect(pingQuality(120)).toBe("fair");
    expect(pingQuality(500)).toBe("poor");
    expect(pingQuality(30, false)).toBe("offline");
    expect(pingQuality(undefined)).toBe("offline");
  });

  it("joins when online and disables Join when offline", async () => {
    const user = userEvent.setup();
    const onJoin = vi.fn();
    const { rerender } = render(<ServerCard name="SMP" ping={40} onJoin={onJoin} />);
    await user.click(screen.getByRole("button", { name: "Join" }));
    expect(onJoin).toHaveBeenCalledTimes(1);
    rerender(<ServerCard name="SMP" online={false} onJoin={onJoin} />);
    await user.click(screen.getByRole("button", { name: "Join" }));
    expect(onJoin).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("img", { name: "Ping: Offline" })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ServerCard name="SMP" onlinePlayers={1} ping={10} onJoin={() => undefined} />);
    await expectNoA11yViolations(container);
  });
});
