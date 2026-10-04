import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { WorldBrowser } from "./WorldBrowser";
import type { WorldEntry } from "./WorldBrowser.types";
import { gameModes } from "./WorldBrowser.utils";

const worlds: WorldEntry[] = [
  {
    id: "a",
    name: "Emerald Valley",
    gameMode: "Survival",
    lastPlayed: "2 hours ago",
    lastPlayedAt: 300,
  },
  { id: "b", name: "Build Plot", gameMode: "Creative", lastPlayed: "yesterday", lastPlayedAt: 200 },
  { id: "c", name: "Abyss", gameMode: "Hardcore", lastPlayed: "last week", lastPlayedAt: 100 },
  { id: "d", name: "Coastline", gameMode: "Survival" },
];

const names = () =>
  within(screen.getByRole("list", { name: "Worlds" }))
    .getAllByRole("listitem")
    .map((item) => item.querySelector("p")?.textContent);

describe("WorldBrowser", () => {
  it("lists worlds by last played", () => {
    const ref = createRef<HTMLDivElement>();
    render(<WorldBrowser ref={ref} worlds={worlds} />);
    expect(screen.getByRole("region", { name: "World browser" })).toBe(ref.current);
    expect(screen.getByRole("status")).toHaveTextContent("4 worlds");
    expect(names()).toEqual(["Emerald Valley", "Build Plot", "Abyss", "Coastline"]);
  });

  it("filters by game mode and search, sorts by name", async () => {
    const user = userEvent.setup();
    render(<WorldBrowser worlds={worlds} />);
    await user.selectOptions(screen.getByRole("combobox", { name: "Sort by" }), "name");
    expect(names()).toEqual(["Abyss", "Build Plot", "Coastline", "Emerald Valley"]);
    await user.selectOptions(screen.getByRole("combobox", { name: "Game mode" }), "Survival");
    expect(names()).toEqual(["Coastline", "Emerald Valley"]);
    await user.type(screen.getByRole("searchbox", { name: "Search worlds" }), "coast");
    expect(screen.getByRole("status")).toHaveTextContent("1 world");
  });

  it("plays and creates worlds, hides the mode filter for one mode", async () => {
    const user = userEvent.setup();
    const onPlay = vi.fn();
    const onCreate = vi.fn();
    const { rerender } = render(
      <WorldBrowser worlds={worlds} onPlay={onPlay} onCreate={onCreate} />,
    );
    const abyss = screen.getByText("Abyss").closest("li")!;
    await user.click(within(abyss).getByRole("button", { name: "Play Abyss" }));
    expect(onPlay).toHaveBeenCalledWith("c");
    await user.click(screen.getByRole("button", { name: "Create world" }));
    expect(onCreate).toHaveBeenCalledOnce();
    rerender(<WorldBrowser worlds={[worlds[0]!]} />);
    expect(screen.queryByRole("combobox", { name: "Game mode" })).not.toBeInTheDocument();
    rerender(<WorldBrowser worlds={[]} emptyText="Create your first world" />);
    expect(screen.getByText("Create your first world")).toBeInTheDocument();
  });

  it("collects unique game modes", () => {
    expect(gameModes(worlds)).toEqual(["Survival", "Creative", "Hardcore"]);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <WorldBrowser worlds={worlds} onPlay={() => {}} onCreate={() => {}} />,
    );
    await expectNoA11yViolations(container);
  });
});
