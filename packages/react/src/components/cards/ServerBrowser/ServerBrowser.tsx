import { PlusIcon, SearchIcon } from "@malilion/block-ui-icons";
import { forwardRef, useState } from "react";
import { cx } from "../../../utils/cx";
import { BlockButton } from "../../actions/BlockButton/BlockButton";
import { BlockInput } from "../../forms/BlockInput/BlockInput";
import { BlockSelect } from "../../forms/BlockSelect/BlockSelect";
import { BlockToggle } from "../../forms/BlockToggle/BlockToggle";
import styles from "../browser.module.css";
import { ServerCard } from "../ServerCard/ServerCard";
import type { ServerBrowserProps, ServerSort } from "./ServerBrowser.types";
import { browseServers } from "./ServerBrowser.utils";

const SORT_OPTIONS = [
  { value: "players", label: "Most players" },
  { value: "ping", label: "Lowest ping" },
  { value: "name", label: "Name" },
];

/**
 * Multiplayer server list: search, sort and an "online only" switch over
 * `ServerCard`s, with optional Refresh and Add server actions.
 */
export const ServerBrowser = forwardRef<HTMLDivElement, ServerBrowserProps>(function ServerBrowser(
  {
    servers,
    onJoin,
    onRefresh,
    onAddServer,
    defaultSort = "players",
    emptyText = "No servers found",
    label = "Server browser",
    className,
    ...rest
  },
  ref,
) {
  const [query, setQuery] = useState("");
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [sort, setSort] = useState<ServerSort>(defaultSort);
  const visible = browseServers(servers, { query, onlineOnly, sort });

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
          label="Search servers"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          startIcon={<SearchIcon size={16} />}
          wrapperClassName={styles.search}
        />
        <BlockSelect
          label="Sort by"
          value={sort}
          onChange={(event) => setSort(event.target.value as ServerSort)}
          options={SORT_OPTIONS}
          wrapperClassName={styles.filter}
        />
        <BlockToggle label="Online only" checked={onlineOnly} onCheckedChange={setOnlineOnly} />
        {onRefresh || onAddServer ? (
          <div className={styles.actions}>
            {onRefresh ? <BlockButton onClick={onRefresh}>Refresh</BlockButton> : null}
            {onAddServer ? (
              <BlockButton variant="grass" startIcon={<PlusIcon size={16} />} onClick={onAddServer}>
                Add server
              </BlockButton>
            ) : null}
          </div>
        ) : null}
      </div>
      <p className={styles.count} role="status">
        {visible.length === 1 ? "1 server" : `${visible.length} servers`}
      </p>
      {visible.length > 0 ? (
        <ul className={styles.list} aria-label="Servers">
          {visible.map(({ id, ...server }) => (
            <li key={id}>
              <ServerCard {...server} onJoin={onJoin ? () => onJoin(id) : undefined} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>{emptyText}</p>
      )}
    </div>
  );
});
