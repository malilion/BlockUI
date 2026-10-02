import { CheckIcon, CloseIcon, ErrorIcon, InfoIcon, WarningIcon } from "@malilion/block-ui-icons";
import { forwardRef, useId, type ReactNode } from "react";
import { cx } from "../../../utils/cx";
import styles from "./BlockAlert.module.css";
import type { AlertVariant, BlockAlertProps } from "./BlockAlert.types";
import { alertMaterial } from "./BlockAlert.utils";

const defaultIcons: Record<AlertVariant, ReactNode> = {
  success: <CheckIcon size={20} />,
  info: <InfoIcon size={20} />,
  warning: <WarningIcon size={20} />,
  error: <ErrorIcon size={20} />,
};

/**
 * Inline status message. `warning`/`error` use `role="alert"`; `success`/`info`
 * use `role="status"` so screen readers announce them politely.
 */
export const BlockAlert = forwardRef<HTMLDivElement, BlockAlertProps>(function BlockAlert(
  {
    variant = "info",
    title,
    children,
    icon,
    onClose,
    closeLabel = "Dismiss",
    action,
    className,
    role,
    ...rest
  },
  ref,
) {
  const titleId = useId();
  const assertive = variant === "warning" || variant === "error";
  return (
    <div
      ref={ref}
      role={role ?? (assertive ? "alert" : "status")}
      aria-labelledby={title ? titleId : undefined}
      data-variant={variant}
      data-material={alertMaterial[variant]}
      className={cx(styles.alert, className)}
      {...rest}
    >
      {icon !== false ? (
        <span className={styles.icon} aria-hidden="true">
          {icon ?? defaultIcons[variant]}
        </span>
      ) : null}
      <div className={styles.body}>
        {title ? (
          <p id={titleId} className={styles.title}>
            {title}
          </p>
        ) : null}
        {children ? <div className={styles.description}>{children}</div> : null}
      </div>
      {action ? <div className={styles.action}>{action}</div> : null}
      {onClose ? (
        <button type="button" className={styles.close} aria-label={closeLabel} onClick={onClose}>
          <CloseIcon size={16} />
        </button>
      ) : null}
    </div>
  );
});
