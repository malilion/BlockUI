# @block-ui/icons

50+ original 16 × 16 pixel-art React icons for [Block UI](https://github.com/malilion/BlockUI). Tree-shakable, crisp at 16 / 24 / 32 px, decorative by default and labelled with `title`.

```bash
pnpm add @block-ui/icons
```

```tsx
import { DiamondIcon, HeartIcon, SearchIcon } from "@block-ui/icons";

<DiamondIcon size={32} />
<SearchIcon size={16} title="Search" /> // role="img" with an accessible name
```

Monochrome UI glyphs (`SearchIcon`, `CloseIcon`, `CheckIcon`, …) use `currentColor`. Create your own with `createPixelIcon(name, { palette, pixels })`.

MIT License
