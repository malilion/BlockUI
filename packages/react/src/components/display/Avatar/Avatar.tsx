import { forwardRef, useState } from "react";
import { useBlockUIMessages } from "../../../provider/context";
import { cx } from "../../../utils/cx";
import styles from "./Avatar.module.css";
import type { AvatarProps } from "./Avatar.types";
import { avatarMaterial, initials } from "./Avatar.utils";

/**
 * Square block avatar: a pixelated face image, or initials on a material
 * colour picked from the name, with an optional presence dot.
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { name, src, icon, size = "md", status, decorative = false, className, ...rest },
  ref,
) {
  const m = useBlockUIMessages();
  const [failedSrc, setFailedSrc] = useState<string | undefined>(undefined);
  const showImage = src !== undefined && src !== failedSrc;
  const accessibleName = status ? `${name} (${m.avatar.statuses[status]})` : name;

  return (
    <span
      ref={ref}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : accessibleName}
      aria-hidden={decorative || undefined}
      data-size={size}
      data-material={avatarMaterial(name)}
      className={cx(styles.avatar, className)}
      {...rest}
    >
      {showImage ? (
        <img src={src} alt="" className={styles.image} onError={() => setFailedSrc(src)} />
      ) : icon ? (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      ) : (
        <span className={styles.initials} aria-hidden="true">
          {initials(name)}
        </span>
      )}
      {status ? <span className={styles.status} data-status={status} aria-hidden="true" /> : null}
    </span>
  );
});
