import { forwardRef } from "react";
import { cx } from "../../../utils/cx";
import { BlockButton } from "../BlockButton/BlockButton";
import styles from "./IconButton.module.css";
import type { IconButtonProps } from "./IconButton.types";

/** Square block button that only shows an icon. `label` is required for screen readers. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, label, className, title, ...rest },
  ref,
) {
  return (
    <BlockButton
      ref={ref}
      aria-label={label}
      title={title ?? label}
      className={cx(styles.iconButton, className)}
      {...rest}
    >
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
    </BlockButton>
  );
});
