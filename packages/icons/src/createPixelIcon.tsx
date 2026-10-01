import { forwardRef, useId, type ForwardRefExoticComponent, type RefAttributes, type SVGProps } from "react";

/** Transparent pixel. */
const EMPTY = ".";
/** Monochrome pixel — rendered with `currentColor`. */
const CURRENT = "x";

export type IconSize = 16 | 24 | 32 | (number & {});

export interface PixelIconProps extends Omit<SVGProps<SVGSVGElement>, "children" | "ref"> {
  /** Rendered size in px. The artwork is drawn on a 16 × 16 grid. @default 24 */
  size?: IconSize;
  /**
   * Accessible label. When omitted the icon is decorative (`aria-hidden`).
   */
  title?: string;
}

export interface PixelIconDefinition {
  /** Map of palette characters to fills. `x` defaults to `currentColor`, `.` is transparent. */
  palette?: Readonly<Record<string, string>>;
  /** 16 rows of 16 characters. */
  pixels: readonly string[];
}

export type PixelIcon = ForwardRefExoticComponent<PixelIconProps & RefAttributes<SVGSVGElement>> & {
  readonly definition: PixelIconDefinition;
};

export interface PixelPath {
  fill: string;
  d: string;
}

/** Converts a pixel grid into one `<path>` per fill, merging horizontal runs. */
export function pixelsToPaths({ pixels, palette = {} }: PixelIconDefinition): PixelPath[] {
  const byFill = new Map<string, string>();
  pixels.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const char = row[x] ?? EMPTY;
      let run = 1;
      while (row[x + run] === char) run += 1;
      if (char !== EMPTY) {
        const fill = palette[char] ?? (char === CURRENT ? "currentColor" : undefined);
        if (fill === undefined) {
          throw new Error(`Pixel icon uses "${char}" but the palette does not define it.`);
        }
        byFill.set(fill, `${byFill.get(fill) ?? ""}M${x} ${y}h${run}v1h-${run}z`);
      }
      x += run;
    }
  });
  return [...byFill.entries()].map(([fill, d]) => ({ fill, d }));
}

/** Creates a pixel-art icon component from a 16 × 16 character grid. */
export function createPixelIcon(displayName: string, definition: PixelIconDefinition): PixelIcon {
  const paths = pixelsToPaths(definition);
  const height = definition.pixels.length;
  const width = definition.pixels[0]?.length ?? height;

  const Icon = forwardRef<SVGSVGElement, PixelIconProps>(function PixelIconComponent(
    { size = 24, title, className, ...rest },
    ref,
  ) {
    const titleId = useId();
    const labelled = Boolean(title);
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={`0 0 ${width} ${height}`}
        shapeRendering="crispEdges"
        focusable="false"
        role={labelled ? "img" : undefined}
        aria-hidden={labelled ? undefined : true}
        aria-labelledby={labelled ? titleId : undefined}
        className={className ? `block-icon ${className}` : "block-icon"}
        data-icon={displayName}
        {...rest}
      >
        {labelled ? <title id={titleId}>{title}</title> : null}
        {paths.map((path) => (
          <path key={path.fill} fill={path.fill} d={path.d} />
        ))}
      </svg>
    );
  });
  Icon.displayName = displayName;
  return Object.assign(Icon, { definition });
}
