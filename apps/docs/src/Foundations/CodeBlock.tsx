import { BlockButton } from "@malilion/block-ui-react";
import styles from "./foundations.module.css";
import { useCopy } from "./useCopy";

/** A code sample with a Copy button, for Foundations pages. */
export function CodeBlock({ code, label = "Copy code" }: { code: string; label?: string }) {
  const { copied, copy } = useCopy();
  return (
    <div className={styles.codeBlock}>
      <pre className={styles.code}>
        <code>{code}</code>
      </pre>
      <BlockButton size="sm" className={styles.copyButton} onClick={() => copy(code)}>
        {copied === code ? "Copied" : "Copy"}
        <span className="block-visually-hidden"> — {label}</span>
      </BlockButton>
    </div>
  );
}
