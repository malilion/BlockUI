import { PlusIcon, SearchIcon } from "@malilion/block-ui-icons";
import { forwardRef, useState } from "react";
import { useBlockUIMessages } from "../../../provider/context";
import { cx } from "../../../utils/cx";
import { BlockButton } from "../../actions/BlockButton/BlockButton";
import { BlockInput } from "../../forms/BlockInput/BlockInput";
import { BlockSelect } from "../../forms/BlockSelect/BlockSelect";
import styles from "../browser.module.css";
import { WorldCard } from "../WorldCard/WorldCard";
import type { WorldBrowserProps, WorldSort } from "./WorldBrowser.types";
import { ALL_MODES, browseWorlds, gameModes } from "./WorldBrowser.utils";

/** Singleplayer world list: search, game-mode filter and sort over `WorldCard`s. */
export const WorldBrowser = forwardRef<HTMLDivElement, WorldBrowserProps>(function WorldBrowser(
  { worlds, onPlay, onCreate, defaultSort = "recent", emptyText, label, className, ...rest },
  ref,
) {
  const m = useBlockUIMessages();
  const sortOptions = [
    { value: "recent", label: m.worldBrowser.lastPlayed },
    { value: "name", label: m.common.name },
  ];
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState(ALL_MODES);
  const [sort, setSort] = useState<WorldSort>(defaultSort);
  const modes = gameModes(worlds);
  const visible = browseWorlds(worlds, { query, mode, sort });

  return (
    <div
      ref={ref}
      role="region"
      aria-label={label ?? m.worldBrowser.label}
      className={cx(styles.browser, className)}
      {...rest}
    >
      <div className={styles.toolbar}>
        <BlockInput
          type="search"
          label={m.worldBrowser.search}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          startIcon={<SearchIcon size={16} />}
          wrapperClassName={styles.search}
        />
        {modes.length > 1 ? (
          <BlockSelect
            label={m.worldBrowser.gameMode}
            value={mode}
            onChange={(event) => setMode(event.target.value)}
            options={[
              { value: ALL_MODES, label: m.worldBrowser.allModes },
              ...modes.map((value) => ({ value, label: value })),
            ]}
            wrapperClassName={styles.filter}
          />
        ) : null}
        <BlockSelect
          label={m.common.sortBy}
          value={sort}
          onChange={(event) => setSort(event.target.value as WorldSort)}
          options={sortOptions}
          wrapperClassName={styles.filter}
        />
        {onCreate ? (
          <div className={styles.actions}>
            <BlockButton variant="grass" startIcon={<PlusIcon size={16} />} onClick={onCreate}>
              {m.worldBrowser.createWorld}
            </BlockButton>
          </div>
        ) : null}
      </div>
      <p className={styles.count} role="status">
        {m.worldBrowser.count(visible.length)}
      </p>
      {visible.length > 0 ? (
        <ul className={styles.list} aria-label={m.worldBrowser.worlds}>
          {visible.map(({ id, lastPlayedAt: _lastPlayedAt, ...world }) => (
            <li key={id}>
              <WorldCard {...world} onPlay={onPlay ? () => onPlay(id) : undefined} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>{emptyText === undefined ? m.worldBrowser.empty : emptyText}</p>
      )}
    </div>
  );
});
