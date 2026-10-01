# @block-ui/tokens

Design tokens for [Block UI](https://github.com/malilion/BlockUI): block-material colors (each with an AA-compliant `on*` text color), a 4px spacing grid, typography, radius (max 6px), pixel bevel shadows, snappy motion, sizes, z-index, breakpoints and procedural pixel textures.

```bash
pnpm add @block-ui/tokens
```

```ts
import { colors, spacing, motion, contrastRatio } from "@block-ui/tokens";
import "@block-ui/tokens/tokens.css"; // --block-* CSS variables + [data-material] rules
```

`@block-ui/react` already includes this stylesheet in `@block-ui/react/styles.css`.

MIT License
