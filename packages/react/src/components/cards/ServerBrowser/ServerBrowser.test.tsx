import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { ServerBrowser } from "./ServerBrowser";
import type { ServerEntry } from "./ServerBrowser.types";
import { browseServers } from "./ServerBrowser.utils";

const servers: ServerEntry[] = [
  {
    id: "smp",
    name: "BlockCraft SMP",
    motd: "Survival",
    onlinePlayers: 12,
    maxPlayers: 50,
    ping: 32,
  },
  {
    id: "parkour",
    name: "Pixel Parkour",
    motd: "Minigames",
    onlinePlayers: 88,
    maxPlayers: 100,
    ping: 120,
  },
  {
    id: "lab",
    name: "Redstone Lab",
    motd: "Creative builds",
    onlinePlayers: 4,
    maxPlayers: 20,
    ping: 18,
  },
  { id: "old", name: "Old Realm", online: false },
];

const names = () =>
  within(screen.getByRole("list", { name: "Servers" }))
    .getAllByRole("listitem")
    .map((item) => item.querySelector("p")?.textContent);

describe("ServerBrowser", () => {
  it("lists servers by player count with offline servers last", () => {
    const ref = createRef<HTMLDivElement>();
    render(<ServerBrowser ref={ref} servers={servers} />);
    expect(screen.getByRole("region", { name: "Server browser" })).toBe(ref.current);
    expect(screen.getByRole("status")).toHaveTextContent("4 servers");
    expect(names()).toEqual(["Pixel Parkour", "BlockCraft SMP", "Redstone Lab", "Old Realm"]);
  });

  it("searches name and MOTD, sorts and hides offline servers", async () => {
    const user = userEvent.setup();
    render(<ServerBrowser servers={servers} />);
    await user.selectOptions(screen.getByRole("combobox", { name: "Sort by" }), "ping");
    expect(names()).toEqual(["Redstone Lab", "BlockCraft SMP", "Pixel Parkour", "Old Realm"]);
    await user.click(screen.getByRole("switch", { name: "Online only" }));
    expect(screen.getByRole("status")).toHaveTextContent("3 servers");
    await user.type(screen.getByRole("searchbox", { name: "Search servers" }), "creative");
    expect(names()).toEqual(["Redstone Lab"]);
    await user.type(screen.getByRole("searchbox"), "zzz");
    expect(screen.getByText("No servers found")).toBeInTheDocument();
  });

  it("joins, refreshes and adds servers", async () => {
    const user = userEvent.setup();
    const onJoin = vi.fn();
    const onRefresh = vi.fn();
    const onAddServer = vi.fn();
    render(
      <ServerBrowser
        servers={servers}
        onJoin={onJoin}
        onRefresh={onRefresh}
        onAddServer={onAddServer}
        defaultSort="name"
      />,
    );
    const lab = screen.getByText("Redstone Lab").closest("li")!;
    await user.click(within(lab).getByRole("button", { name: "Join" }));
    expect(onJoin).toHaveBeenCalledWith("lab");
    await user.click(screen.getByRole("button", { name: "Refresh" }));
    await user.click(screen.getByRole("button", { name: "Add server" }));
    expect(onRefresh).toHaveBeenCalledOnce();
    expect(onAddServer).toHaveBeenCalledOnce();
  });

  it("sorts by name with the pure helper", () => {
    expect(
      browseServers(servers, { query: "", onlineOnly: false, sort: "name" }).map((s) => s.id),
    ).toEqual(["smp", "parkour", "lab", "old"]);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ServerBrowser servers={servers} onJoin={() => {}} onRefresh={() => {}} />,
    );
    await expectNoA11yViolations(container);
  });
});
