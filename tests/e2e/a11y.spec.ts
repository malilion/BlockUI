import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const TABS = ["Dashboard", "Inventory", "Crafting", "Cards", "Feedback"] as const;
const THEMES = ["grassland", "cave", "deepslate", "nether", "end"] as const;
const WCAG = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

test.describe("Accessibility (axe, WCAG 2.2 AA)", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  for (const theme of THEMES) {
    test(`every section passes in the ${theme} theme`, async ({ page }) => {
      await page.goto("/");
      await page.getByRole("combobox", { name: "Select Theme" }).selectOption(theme);
      for (const tab of TABS) {
        await page
          .getByRole("navigation", { name: /navigation/i })
          .getByRole("button", { name: tab })
          .first()
          .click();
        const results = await new AxeBuilder({ page }).withTags(WCAG).analyze();
        const summary = results.violations.map(
          (violation) =>
            `${tab}: ${violation.id} → ${violation.nodes.map((node) => node.target.join(" ")).join(", ")}`,
        );
        expect(summary, `${theme} / ${tab}`).toEqual([]);
      }
    });
  }

  test("open modal passes", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("navigation", { name: /navigation/i })
      .getByRole("button", { name: "Feedback" })
      .first()
      .click();
    await page.getByRole("button", { name: /open modal/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    const results = await new AxeBuilder({ page }).withTags(WCAG).analyze();
    expect(results.violations.map((violation) => violation.id)).toEqual([]);
  });
});
