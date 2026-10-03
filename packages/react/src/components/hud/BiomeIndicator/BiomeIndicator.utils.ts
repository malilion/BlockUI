import {
  DirtIcon,
  FireIcon,
  GrassBlockIcon,
  ObsidianIcon,
  SandIcon,
  SnowIcon,
  StoneIcon,
  TorchIcon,
  TreeIcon,
  WaveIcon,
  type PixelIcon,
} from "@malilion/block-ui-icons";
import type { BiomeType } from "./BiomeIndicator.types";

export const BIOMES: Record<BiomeType, { icon: PixelIcon; material: string }> = {
  plains: { icon: GrassBlockIcon, material: "grass" },
  forest: { icon: TreeIcon, material: "grass" },
  desert: { icon: SandIcon, material: "sand" },
  snowy: { icon: SnowIcon, material: "diamond" },
  ocean: { icon: WaveIcon, material: "water" },
  jungle: { icon: TreeIcon, material: "emerald" },
  mountains: { icon: StoneIcon, material: "stone" },
  swamp: { icon: DirtIcon, material: "dirt" },
  cave: { icon: TorchIcon, material: "deepslate" },
  nether: { icon: FireIcon, material: "nether" },
  end: { icon: ObsidianIcon, material: "amethyst" },
};

export function biomeLabel(type: BiomeType): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}
