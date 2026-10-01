import axe from "axe-core";
import { expect } from "vitest";

/**
 * Runs axe-core against a rendered container. Color contrast is verified by the
 * token/theme tests and Playwright instead, because jsdom has no layout engine.
 */
export async function expectNoA11yViolations(container: Element): Promise<void> {
  const results = await axe.run(container, {
    rules: {
      "color-contrast": { enabled: false },
      region: { enabled: false },
    },
  });
  const violations = results.violations.map(
    (violation) =>
      `${violation.id}: ${violation.help} → ${violation.nodes.map((node) => node.html).join(" | ")}`,
  );
  expect(violations).toEqual([]);
}
