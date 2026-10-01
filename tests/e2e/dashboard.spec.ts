import { expect, test } from "@playwright/test";

test.describe("Block UI Playground", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("dashboard loads with navigation and content", async ({ page }) => {
    await expect(page.getByText("BlockMaster_42")).toBeVisible();
    await expect(
      page
        .getByRole("navigation", { name: /^(Playground Navigation|Quick navigation)$/ })
        .locator("visible=true"),
    ).toBeVisible();
  });

  test("sidebar navigation switches sections", async ({ page }) => {
    await page.getByRole("button", { name: "Inventory" }).click();
    await expect(page.getByRole("grid", { name: "Inventory" })).toBeVisible();

    await page.getByRole("button", { name: "Crafting" }).click();
    await expect(page.getByText("Crafting Table")).toBeVisible();
  });

  test("inventory keyboard navigation", async ({ page }) => {
    await page.getByRole("button", { name: "Inventory" }).click();

    const gridCell = page.getByRole("gridcell").first();
    await gridCell.focus();

    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Home");
    await page.keyboard.press("End");

    await expect(page.getByRole("grid", { name: "Inventory" })).toBeVisible();
  });

  test("hotbar selection", async ({ page }) => {
    await page.getByRole("button", { name: "Inventory" }).click();
    await expect(page.getByRole("grid", { name: "Hotbar" })).toBeVisible();
    await expect(page.locator("[data-selected]").first()).toBeVisible();
  });

  test("crafting interaction", async ({ page }) => {
    await page.getByRole("button", { name: "Crafting" }).click();
    await expect(page.getByText("Crafting Table")).toBeVisible();
    await expect(page.getByText("Furnace")).toBeVisible();
  });

  test("modal open and close", async ({ page }) => {
    await page.getByRole("button", { name: "Feedback" }).click();

    await page.getByRole("button", { name: "Open Modal" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("toast display", async ({ page }) => {
    await page.getByRole("button", { name: "Feedback" }).click();
    await page.getByRole("button", { name: "Toast Success" }).click();
    await expect(page.getByRole("status").first()).toBeVisible({ timeout: 3000 });
  });
});

test.describe("Responsive mobile navigation", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("shows hotbar navigation and hides the sidebar", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("BlockMaster_42")).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Playground Navigation" })).toBeHidden();
    const hotbar = page.getByRole("navigation", { name: "Quick navigation" });
    await expect(hotbar).toBeVisible();
    await hotbar.getByRole("button", { name: "Inventory" }).click();
    await expect(page.getByRole("grid", { name: "Inventory" })).toBeVisible();
  });
});
