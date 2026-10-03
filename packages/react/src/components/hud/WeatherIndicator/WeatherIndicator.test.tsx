import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { WeatherIndicator } from "./WeatherIndicator";
import { weatherTypes } from "./WeatherIndicator.types";
import { WEATHER_LABEL } from "./WeatherIndicator.utils";

describe("WeatherIndicator", () => {
  it.each(weatherTypes)("renders %s weather with its label and icon", (weather) => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(<WeatherIndicator ref={ref} weather={weather} />);
    expect(ref.current).toHaveAttribute("data-weather", weather);
    expect(ref.current).toHaveTextContent(`Weather ${WEATHER_LABEL[weather]}`);
    expect(container.querySelector('[aria-hidden="true"] svg')).not.toBeNull();
  });

  it("shows the moon for a clear night, a custom name and time remaining", () => {
    const { container } = render(
      <WeatherIndicator weather="clear" night name="Starry" remaining="4 min" />,
    );
    expect(container.querySelector('[data-icon="MoonIcon"]')).not.toBeNull();
    expect(container.firstElementChild).toHaveTextContent("Weather Starry· 4 min left");
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
