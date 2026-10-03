import {
  CloudIcon,
  MoonIcon,
  RainIcon,
  SnowIcon,
  SunIcon,
  ThunderIcon,
  type PixelIcon,
} from "@malilion/block-ui-icons";
import type { WeatherType } from "./WeatherIndicator.types";

export const WEATHER_LABEL: Record<WeatherType, string> = {
  clear: "Clear",
  cloudy: "Cloudy",
  rain: "Rain",
  thunder: "Thunderstorm",
  snow: "Snow",
};

export function weatherIcon(weather: WeatherType, night: boolean): PixelIcon {
  switch (weather) {
    case "clear":
      return night ? MoonIcon : SunIcon;
    case "cloudy":
      return CloudIcon;
    case "rain":
      return RainIcon;
    case "thunder":
      return ThunderIcon;
    case "snow":
      return SnowIcon;
  }
}
