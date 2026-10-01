import { forwardRef, type MouseEvent } from "react";
import { cx } from "../../../utils/cx";
import styles from "./BlockButton.module.css";
import type { BlockButtonProps } from "./BlockButton.types";

/**
 * Chunky block button with a pixel bevel. Disabled and loading buttons stay
 * focusable via `aria-disabled` but never fire `onClick`.
 */
export const BlockButton = forwardRef<HTMLButtonElement, BlockButtonProps>(function BlockButton(
  {
    variant = "stone",
    size = "md",
    loading = false,
    fullWidth = false,
    disabled = false,
    startIcon,
    endIcon,
    className,
    children,
    type = "button",
    onClick,
    ...rest
  },
  ref,
) {
  const inactive = disabled || loading;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (inactive) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onClick?.(event);
  };

  return (
    <button
      ref={ref}
      type={type}
      data-material={variant}
      data-size={size}
      data-loading={loading || undefined}
      aria-disabled={inactive || undefined}
      aria-busy={loading || undefined}
      className={cx(styles.button, styles[size], fullWidth && styles.fullWidth, className)}
      onClick={handleClick}
      {...rest}
    >
      <span className={styles.content}>
        {startIcon ? <span className={styles.icon}>{startIcon}</span> : null}
        {children !== undefined && children !== null ? (
          <span className={styles.label}>{children}</span>
        ) : null}
        {endIcon ? <span className={styles.icon}>{endIcon}</span> : null}
      </span>
      {loading ? (
        <span className={styles.loader} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      ) : null}
    </button>
  );
});
