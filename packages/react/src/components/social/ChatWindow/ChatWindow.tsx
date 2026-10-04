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
import styles from "./ChatWindow.module.css";
import type { ChatWindowProps } from "./ChatWindow.types";
import { useBlockUIMessages } from "../../../provider/context";

/** Pixels from the bottom that still count as "following" the conversation. */
const STICK_THRESHOLD = 24;

/**
 * In-game chat: a scrolling message log (`role="log"`) above a text field.
 * Enter sends, ↑ / ↓ recall sent messages, and the log only auto-scrolls while
 * the reader is already at the bottom.
 */
export const ChatWindow = forwardRef<HTMLDivElement, ChatWindowProps>(function ChatWindow(
  {
    messages,
    onSend,
    placeholder,
    maxLength = 256,
    showTimestamps = false,
    size = "md",
    label: labelProp,
    className,
    ...rest
  },
  ref,
) {
  const m = useBlockUIMessages();
  const label = labelProp ?? m.chatWindow.label;
  const inputId = useId();
  const logRef = useRef<HTMLDivElement>(null);
  const stick = useRef(true);
  const [draft, setDraft] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    const log = logRef.current;
    if (log && stick.current) log.scrollTop = log.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const log = logRef.current;
    if (!log) return undefined;
    const onScroll = () => {
      stick.current = log.scrollHeight - log.scrollTop - log.clientHeight <= STICK_THRESHOLD;
    };
    log.addEventListener("scroll", onScroll);
    return () => log.removeEventListener("scroll", onScroll);
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    onSend?.(text);
    setHistory((previous) => [...previous, text]);
    setHistoryIndex(null);
    setDraft("");
    stick.current = true;
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (history.length === 0) return;
    if (event.key === "ArrowUp") {
      event.preventDefault();
      const next = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setDraft(history[next] ?? "");
    } else if (event.key === "ArrowDown" && historyIndex !== null) {
      event.preventDefault();
      const next = historyIndex + 1;
      if (next >= history.length) {
        setHistoryIndex(null);
        setDraft("");
      } else {
        setHistoryIndex(next);
        setDraft(history[next] ?? "");
      }
    }
  };

  return (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      data-size={size}
      className={cx(styles.chat, className)}
      {...rest}
    >
      <div
        ref={logRef}
        role="log"
        aria-label={m.chatWindow.messages(label)}
        // Scrollable log: keyboard users must be able to focus it to scroll.
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        className={styles.log}
      >
        <ol className={styles.list}>
          {messages.map((message) => {
            const type = message.type ?? "chat";
            return (
              <li key={message.id} className={styles.message} data-type={type}>
                {showTimestamps && message.time ? (
                  <span className={styles.time}>[{message.time}] </span>
                ) : null}
                {type === "chat" && message.author ? (
                  <span className={styles.author}>&lt;{message.author}&gt; </span>
                ) : null}
                {type === "whisper" && message.author ? (
                  <span className={styles.author}>{m.chatWindow.whispers(message.author)}</span>
                ) : null}
                <span className={styles.text}>{message.text}</span>
              </li>
            );
          })}
        </ol>
      </div>
      {onSend ? (
        <form className={styles.form} onSubmit={submit}>
          <label htmlFor={inputId} className="block-visually-hidden">
            {m.chatWindow.message}
          </label>
          <input
            id={inputId}
            type="text"
            value={draft}
            maxLength={maxLength}
            placeholder={placeholder ?? m.chatWindow.placeholder}
            autoComplete="off"
            className={styles.input}
            onChange={(event) => {
              setDraft(event.target.value);
              setHistoryIndex(null);
            }}
            onKeyDown={onKeyDown}
          />
          <button type="submit" className={styles.send}>
            {m.chatWindow.send}
          </button>
        </form>
      ) : null}
    </div>
  );
});
