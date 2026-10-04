import { PlusIcon, SearchIcon } from "@malilion/block-ui-icons";
import { forwardRef, useState } from "react";
import { cx } from "../../../utils/cx";
import { BlockButton } from "../../actions/BlockButton/BlockButton";
import { BlockInput } from "../../forms/BlockInput/BlockInput";
import { BlockSelect } from "../../forms/BlockSelect/BlockSelect";
import styles from "../browser.module.css";
import { WorldCard } from "../WorldCard/WorldCard";
import type { WorldBrowserProps, WorldSort } from "./WorldBrowser.types";
import { ALL_MODES, browseWorlds, gameModes } from "./WorldBrowser.utils";

const SORT_OPTIONS = [
  { value: "recent", label: "Last played" },
  { value: "name", label: "Name" },
];

/** Singleplayer world list: search, game-mode filter and sort over `WorldCard`s. */
export const WorldBrowser = forwardRef<HTMLDivElement, WorldBrowserProps>(function WorldBrowser(
  {
    worlds,
    onPlay,
    onCreate,
    defaultSort = "recent",
    emptyText = "No worlds yet",
    label = "World browser",
    className,
    ...rest
  },
  ref,
) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState(ALL_MODES);
  const [sort, setSort] = useState<WorldSort>(defaultSort);
  const modes = gameModes(worlds);
  const visible = browseWorlds(worlds, { query, mode, sort });

  return (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      className={cx(styles.browser, className)}
      {...rest}
    >
      <div className={styles.toolbar}>
        <BlockInput
          type="search"
          label="Search worlds"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          startIcon={<SearchIcon size={16} />}
          wrapperClassName={styles.search}
        />
        {modes.length > 1 ? (
          <BlockSelect
            label="Game mode"
            value={mode}
            onChange={(event) => setMode(event.target.value)}
            options={[
              { value: ALL_MODES, label: "All modes" },
              ...modes.map((value) => ({ value, label: value })),
            ]}
            wrapperClassName={styles.filter}
          />
        ) : null}
        <BlockSelect
          label="Sort by"
          value={sort}
          onChange={(event) => setSort(event.target.value as WorldSort)}
          options={SORT_OPTIONS}
          wrapperClassName={styles.filter}
        />
        {onCreate ? (
          <div className={styles.actions}>
            <BlockButton variant="grass" startIcon={<PlusIcon size={16} />} onClick={onCreate}>
              Create world
            </BlockButton>
          </div>
        ) : null}
      </div>
      <p className={styles.count} role="status">
        {visible.length === 1 ? "1 world" : `${visible.length} worlds`}
      </p>
      {visible.length > 0 ? (
        <ul className={styles.list} aria-label="Worlds">
          {visible.map(({ id, lastPlayedAt: _lastPlayedAt, ...world }) => (
            <li key={id}>
              <WorldCard {...world} onPlay={onPlay ? () => onPlay(id) : undefined} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>{emptyText}</p>
      )}
    </div>
  );
});
