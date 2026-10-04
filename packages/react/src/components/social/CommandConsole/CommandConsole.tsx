import {
  forwardRef,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { cx } from "../../../utils/cx";
import styles from "./CommandConsole.module.css";
import type { CommandConsoleProps } from "./CommandConsole.types";
import { suggestCommands } from "./CommandConsole.utils";

const STICK_THRESHOLD = 24;

/**
 * Command console: an output log above a "/" command line with suggestions
 * (WAI-ARIA combobox). Tab completes, ↑ / ↓ pick a suggestion or recall history.
 */
export const CommandConsole = forwardRef<HTMLDivElement, CommandConsoleProps>(
  function CommandConsole(
    { entries, commands = [], onRun, size = "md", label = "Console", className, ...rest },
    ref,
  ) {
    const baseId = useId();
    const listId = `${baseId}-suggestions`;
    const logRef = useRef<HTMLDivElement>(null);
    const stick = useRef(true);
    const [draft, setDraft] = useState("");
    const [active, setActive] = useState(0);
    const [dismissed, setDismissed] = useState(false);
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number | null>(null);

    const suggestions = dismissed ? [] : suggestCommands(draft, commands);
    const open = suggestions.length > 0;
    const activeIndex = Math.min(active, suggestions.length - 1);

    useLayoutEffect(() => {
      const log = logRef.current;
      if (log && stick.current) log.scrollTop = log.scrollHeight;
    }, [entries]);

    useEffect(() => {
      const log = logRef.current;
      if (!log) return undefined;
      const onScroll = () => {
        stick.current = log.scrollHeight - log.scrollTop - log.clientHeight <= STICK_THRESHOLD;
      };
      log.addEventListener("scroll", onScroll);
      return () => log.removeEventListener("scroll", onScroll);
    }, []);

    const update = (value: string) => {
      setDraft(value);
      setActive(0);
      setDismissed(false);
      setHistoryIndex(null);
    };

    const complete = (index: number) => {
      const command = suggestions[index];
      if (!command) return;
      setDraft(`/${command.name} `);
      setActive(0);
    };

    const submit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const command = draft.trim();
      if (!command) return;
      onRun?.(command);
      setHistory((previous) => [...previous, command]);
      update("");
      stick.current = true;
    };

    const recall = (direction: -1 | 1) => {
      if (history.length === 0) return;
      if (direction === -1) {
        const next = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(next);
        setDraft(history[next] ?? "");
      } else if (historyIndex !== null) {
        const next = historyIndex + 1;
        setHistoryIndex(next >= history.length ? null : next);
        setDraft(next >= history.length ? "" : (history[next] ?? ""));
      }
      setDismissed(true);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (open) {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault();
          const step = event.key === "ArrowDown" ? 1 : -1;
          setActive((activeIndex + step + suggestions.length) % suggestions.length);
          return;
        }
        if (event.key === "Tab" && !event.shiftKey) {
          event.preventDefault();
          complete(activeIndex);
          return;
        }
        if (event.key === "Escape") {
          event.preventDefault();
          setDismissed(true);
          return;
        }
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        recall(-1);
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        recall(1);
      }
    };

    return (
      <div
        ref={ref}
        role="region"
        aria-label={label}
        data-size={size}
        className={cx(styles.console, className)}
        {...rest}
      >
        <div
          ref={logRef}
          role="log"
          aria-label={`${label} output`}
          // Scrollable log: keyboard users must be able to focus it to scroll.
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          className={styles.log}
        >
          <ol className={styles.list}>
            {entries.map((entry) => (
              <li key={entry.id} className={styles.entry} data-kind={entry.kind ?? "output"}>
                {entry.text}
              </li>
            ))}
          </ol>
        </div>
        {onRun ? (
          <form className={styles.form} onSubmit={submit}>
            {open ? (
              <ul
                id={listId}
                role="listbox"
                aria-label="Command suggestions"
                className={styles.suggestions}
              >
                {suggestions.map((command, index) => (
                  <li
                    key={command.name}
                    id={`${listId}-${index}`}
                    role="option"
                    aria-selected={index === activeIndex}
                    className={styles.suggestion}
                    // Pointer users pick with a click; keyboard users use the input's arrow keys.
                    onMouseDown={(event) => {
                      event.preventDefault();
                      complete(index);
                    }}
                  >
                    <span className={styles.name}>/{command.name}</span>
                    {command.usage ? <span className={styles.usage}> {command.usage}</span> : null}
                    {command.description ? (
                      <span className={styles.description}> — {command.description}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : null}
            <label htmlFor={`${baseId}-input`} className="block-visually-hidden">
              Command
            </label>
            <span className={styles.prompt} aria-hidden="true">
              &gt;
            </span>
            <input
              id={`${baseId}-input`}
              type="text"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={open}
              aria-controls={open ? listId : undefined}
              aria-activedescendant={open ? `${listId}-${activeIndex}` : undefined}
              value={draft}
              placeholder="/help"
              autoComplete="off"
              spellCheck={false}
              className={styles.input}
              onChange={(event) => update(event.target.value)}
              onKeyDown={onKeyDown}
            />
          </form>
        ) : null}
      </div>
    );
  },
);
