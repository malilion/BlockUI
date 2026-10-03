import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BlockTable } from "./BlockTable";
import type { BlockTableColumn } from "./BlockTable.types";
import { nextSort, sortRows } from "./BlockTable.utils";

interface Player {
  name: string;
  level: number;
  world?: string;
}

const rows: Player[] = [
  { name: "Steve", level: 12, world: "Overworld" },
  { name: "alex", level: 30, world: "Nether" },
  { name: "Notch", level: 2 },
];

const columns: BlockTableColumn<Player>[] = [
  { key: "name", header: "Player", sortable: true, rowHeader: true },
  { key: "level", header: "Level", sortable: true, align: "end", width: "80px" },
  { key: "world", header: "World", cell: (row) => row.world ?? "—" },
];

const firstColumn = () => screen.getAllByRole("rowheader").map((cell) => cell.textContent);

describe("BlockTable", () => {
  it("renders a captioned table with headers, row headers and cells", () => {
    const ref = createRef<HTMLTableElement>();
    render(<BlockTable ref={ref} caption="Players" columns={columns} rows={rows} />);
    const table = screen.getByRole("table", { name: "Players" });
    expect(table).toBe(ref.current);
    expect(screen.getByRole("region", { name: "Players" })).toHaveAttribute("tabindex", "0");
    expect(screen.getAllByRole("columnheader")).toHaveLength(3);
    expect(firstColumn()).toEqual(["Steve", "alex", "Notch"]);
    const notch = screen.getByRole("rowheader", { name: "Notch" }).closest("tr")!;
    expect(
      within(notch)
        .getAllByRole("cell")
        .map((cell) => cell.textContent),
    ).toEqual(["2", "—"]);
    const cols = table.querySelectorAll("col");
    expect(cols).toHaveLength(3);
    expect(cols[1]?.style.getPropertyValue("--block-table-col-width")).toBe("80px");
  });

  it("cycles sorting ascending → descending → unsorted with aria-sort", async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();
    render(
      <BlockTable caption="Players" columns={columns} rows={rows} onSortChange={onSortChange} />,
    );
    const level = screen.getByRole("button", { name: "Level" });
    const header = screen.getByRole("columnheader", { name: "Level" });
    expect(header).not.toHaveAttribute("aria-sort");

    await user.click(level);
    expect(header).toHaveAttribute("aria-sort", "ascending");
    expect(firstColumn()).toEqual(["Notch", "Steve", "alex"]);
    expect(onSortChange).toHaveBeenLastCalledWith({ key: "level", direction: "asc" });

    await user.click(level);
    expect(header).toHaveAttribute("aria-sort", "descending");
    expect(firstColumn()).toEqual(["alex", "Steve", "Notch"]);

    await user.click(level);
    expect(header).not.toHaveAttribute("aria-sort");
    expect(firstColumn()).toEqual(["Steve", "alex", "Notch"]);
    expect(onSortChange).toHaveBeenLastCalledWith(null);
  });

  it("sorts strings case-insensitively and supports controlled / manual sort", async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();
    const { rerender } = render(
      <BlockTable
        caption="Players"
        columns={columns}
        rows={rows}
        sort={{ key: "name", direction: "asc" }}
        onSortChange={onSortChange}
      />,
    );
    expect(firstColumn()).toEqual(["alex", "Notch", "Steve"]);
    await user.click(screen.getByRole("button", { name: "Level" }));
    expect(onSortChange).toHaveBeenCalledWith({ key: "level", direction: "asc" });
    expect(firstColumn()).toEqual(["alex", "Notch", "Steve"]);

    rerender(
      <BlockTable
        caption="Players"
        columns={columns}
        rows={rows}
        sort={{ key: "name", direction: "asc" }}
        manualSort
      />,
    );
    expect(firstColumn()).toEqual(["Steve", "alex", "Notch"]);
    expect(screen.getByRole("columnheader", { name: "Player" })).toHaveAttribute(
      "aria-sort",
      "ascending",
    );
  });

  it("shows an empty state and supports hidden captions, striping and size", () => {
    render(
      <BlockTable
        caption="Players"
        hideCaption
        columns={columns}
        rows={[]}
        emptyState="No players online"
        striped
        size="sm"
      />,
    );
    expect(screen.getByRole("cell")).toHaveTextContent("No players online");
    expect(screen.getByRole("cell")).toHaveAttribute("colspan", "3");
    expect(screen.getByText("Players")).toHaveClass("block-visually-hidden");
    const table = screen.getByRole("table");
    expect(table).toHaveAttribute("data-striped");
    expect(table).toHaveAttribute("data-size", "sm");
  });

  it("sorts empty values last in both directions and uses sortValue", () => {
    const withWorld: BlockTableColumn<Player>[] = [
      { key: "world", header: "World", sortValue: (row) => row.world?.length },
    ];
    const asc = sortRows(rows, withWorld, { key: "world", direction: "asc" });
    const desc = sortRows(rows, withWorld, { key: "world", direction: "desc" });
    expect(asc.map((row) => row.name)).toEqual(["alex", "Steve", "Notch"]);
    expect(desc.map((row) => row.name)).toEqual(["Steve", "alex", "Notch"]);
    expect(sortRows(rows, withWorld, { key: "missing", direction: "asc" })).toBe(rows);
  });

  it("computes the next sort", () => {
    expect(nextSort(null, "a")).toEqual({ key: "a", direction: "asc" });
    expect(nextSort({ key: "a", direction: "asc" }, "a")).toEqual({ key: "a", direction: "desc" });
    expect(nextSort({ key: "a", direction: "desc" }, "a")).toBeNull();
    expect(nextSort({ key: "a", direction: "desc" }, "b")).toEqual({ key: "b", direction: "asc" });
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <BlockTable
        caption="Players"
        columns={columns}
        rows={rows}
        defaultSort={{ key: "level", direction: "asc" }}
      />,
    );
    await expectNoA11yViolations(container);
  });
});
