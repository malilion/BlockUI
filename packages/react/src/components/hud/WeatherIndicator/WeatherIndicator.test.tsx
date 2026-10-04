import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { enMessages } from "../../../locale/messages";
import { zhTWMessages } from "../../../locale/zhTW";
import { BlockUIProvider } from "../../../provider/BlockUIProvider";
import { expectNoA11yViolations } from "../../../test/axe";
import { WeatherIndicator } from "./WeatherIndicator";
import { weatherTypes } from "./WeatherIndicator.types";

describe("WeatherIndicator", () => {
  it.each(weatherTypes)("renders %s weather with its label and icon", (weather) => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(<WeatherIndicator ref={ref} weather={weather} />);
    expect(ref.current).toHaveAttribute("data-weather", weather);
    expect(ref.current).toHaveTextContent(`Weather ${enMessages.weatherIndicator.names[weather]}`);
    expect(container.querySelector('[aria-hidden="true"] svg')).not.toBeNull();
  });

  it("shows the moon for a clear night, a custom name and time remaining", () => {
    const { container } = render(
      <WeatherIndicator weather="clear" night name="Starry" remaining="4 min" />,
    );
    expect(container.querySelector('[data-icon="MoonIcon"]')).not.toBeNull();
    expect(container.firstElementChild).toHaveTextContent("Weather Starry· 4 min left");
  });

  it("uses the provider's locale for its built-in text", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <BlockUIProvider toaster={false} messages={zhTWMessages}>
        <WeatherIndicator ref={ref} weather="thunder" remaining="4 分鐘" />
      </BlockUIProvider>,
    );
    expect(ref.current).toHaveTextContent("天氣 雷雨· 4 分鐘 後結束");
  });

  it("is a polite status only when announcing", () => {
    const { rerender } = render(<WeatherIndicator weather="rain" />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    rerender(<WeatherIndicator weather="thunder" announce />);
    expect(screen.getByRole("status")).toHaveTextContent("Thunderstorm");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<WeatherIndicator weather="snow" remaining="2 min" announce />);
    await expectNoA11yViolations(container);
  });
});
