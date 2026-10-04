import { PlusIcon, SearchIcon } from "@malilion/block-ui-icons";
import { forwardRef, useState } from "react";
import { useBlockUIMessages } from "../../../provider/context";
import { cx } from "../../../utils/cx";
import { BlockButton } from "../../actions/BlockButton/BlockButton";
import { BlockInput } from "../../forms/BlockInput/BlockInput";
import { BlockSelect } from "../../forms/BlockSelect/BlockSelect";
import { BlockToggle } from "../../forms/BlockToggle/BlockToggle";
import styles from "../browser.module.css";
import { ServerCard } from "../ServerCard/ServerCard";
import type { ServerBrowserProps, ServerSort } from "./ServerBrowser.types";
import { browseServers } from "./ServerBrowser.utils";

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
    emptyText,
    label,
    className,
    ...rest
  },
  ref,
) {
  const m = useBlockUIMessages();
  const sortOptions = [
    { value: "players", label: m.serverBrowser.mostPlayers },
    { value: "ping", label: m.serverBrowser.lowestPing },
    { value: "name", label: m.common.name },
  ];
  const [query, setQuery] = useState("");
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [sort, setSort] = useState<ServerSort>(defaultSort);
  const visible = browseServers(servers, { query, onlineOnly, sort });

  return (
    <div
      ref={ref}
      role="region"
      aria-label={label ?? m.serverBrowser.label}
      className={cx(styles.browser, className)}
      {...rest}
    >
      <div className={styles.toolbar}>
        <BlockInput
          type="search"
          label={m.serverBrowser.search}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          startIcon={<SearchIcon size={16} />}
          wrapperClassName={styles.search}
        />
        <BlockSelect
          label={m.common.sortBy}
          value={sort}
          onChange={(event) => setSort(event.target.value as ServerSort)}
          options={sortOptions}
          wrapperClassName={styles.filter}
        />
        <BlockToggle
          label={m.serverBrowser.onlineOnly}
          checked={onlineOnly}
          onCheckedChange={setOnlineOnly}
        />
        {onRefresh || onAddServer ? (
          <div className={styles.actions}>
            {onRefresh ? (
              <BlockButton onClick={onRefresh}>{m.serverBrowser.refresh}</BlockButton>
            ) : null}
            {onAddServer ? (
              <BlockButton variant="grass" startIcon={<PlusIcon size={16} />} onClick={onAddServer}>
                {m.serverBrowser.addServer}
              </BlockButton>
            ) : null}
          </div>
        ) : null}
      </div>
      <p className={styles.count} role="status">
        {m.serverBrowser.count(visible.length)}
      </p>
      {visible.length > 0 ? (
        <ul className={styles.list} aria-label={m.serverBrowser.servers}>
          {visible.map(({ id, ...server }) => (
            <li key={id}>
              <ServerCard {...server} onJoin={onJoin ? () => onJoin(id) : undefined} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>
          {emptyText === undefined ? m.serverBrowser.empty : emptyText}
        </p>
      )}
    </div>
  );
});
