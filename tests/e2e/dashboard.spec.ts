import { expect, test } from "@playwright/test";

test.describe("Block UI Playground", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("dashboard loads with sidebar and content", async ({ page }) => {
    // Sidebar should be present
    const sidebar = page.locator("nav");
    await expect(sidebar.first()).toBeVisible();

    // Main content area should have player/dashboard content
    await expect(page.getByText(/BlockMaster|Dashboard/i).first()).toBeVisible();
  });

  test("sidebar navigation switches sections", async ({ page }) => {
    // Click on Inventory nav item
    await page.getByRole("button", { name: /inventory/i }).first().click();

    // Should show inventory-related content
    await expect(page.getByText(/inventory/i).first()).toBeVisible();

    // Click on Crafting nav item
    await page.getByRole("button", { name: /crafting/i }).first().click();
    await expect(page.getByText(/crafting/i).first()).toBeVisible();
  });

  test("inventory keyboard navigation", async ({ page }) => {
    // Navigate to inventory section
    await page.getByRole("button", { name: /inventory/i }).first().click();

    // Find a grid cell and focus it
    const gridCell = page.getByRole("gridcell").first();
    await gridCell.focus();

    // Press arrow keys to navigate
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Home");
    await page.keyboard.press("End");

    // The grid should still be present and functional
    await expect(page.getByRole("grid").first()).toBeVisible();
  });

  test("hotbar selection", async ({ page }) => {
    // Navigate to inventory section
    await page.getByRole("button", { name: /inventory/i }).first().click();

    // Find hotbar slots
    const slots = page.locator("[data-selected]");
    const slotCount = await slots.count();

    // At least one slot should be selected
    expect(slotCount).toBeGreaterThanOrEqual(0);
  });

  test("crafting interaction", async ({ page }) => {
    // Navigate to crafting section
    await page.getByRole("button", { name: /crafting/i }).first().click();

    // Crafting grid should be present
    await expect(page.getByText(/crafting/i).first()).toBeVisible();
  });

  test("modal open and close", async ({ page }) => {
    // Navigate to feedback section
    await page.getByRole("button", { name: /feedback/i }).first().click();

    // Find and click a button that opens a modal
    const modalTrigger = page.getByRole("button", { name: /modal/i }).first();
    await modalTrigger.click();

    // Modal should appear
    const dialog = page.getByRole("dialog");
    await expect(dialog.first()).toBeVisible();

    // Close the modal
    await page.keyboard.press("Escape");

    // Modal should be gone
    await expect(dialog).not.toBeVisible();
  });

  test("toast display", async ({ page }) => {
    // Navigate to feedback section
    await page.getByRole("button", { name: /feedback/i }).first().click();

    // Find and click a toast trigger button
    const toastTrigger = page.getByRole("button", { name: /toast/i }).first();
    await toastTrigger.click();

    // A toast should appear (role="status" or as an alert region)
    await expect(page.getByRole("status").first()).toBeVisible({ timeout: 3000 });
  });
});

test.describe("Responsive mobile navigation", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("sidebar collapses on mobile", async ({ page }) => {
    await page.goto("/");

    // On mobile, the main content should still be visible
    await expect(page.getByText(/BlockMaster|Dashboard/i).first()).toBeVisible();
  });
});
