import { expect, test } from "@playwright/test";

test.describe("Block UI Playground", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("dashboard loads with navigation and content", async ({ page }) => {
    await expect(page.getByText("BlockMaster_42").first()).toBeVisible();
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

  test("item tooltip opens on real mouse hover and keyboard focus", async ({ page, isMobile }) => {
    test.skip(isMobile, "hover needs a mouse");
    await page
      .getByRole("navigation", { name: "Playground Navigation" })
      .getByRole("button", { name: "Inventory" })
      .click();
    const slot = page.getByRole("grid", { name: "Inventory" }).getByRole("gridcell").first();
    const tooltip = slot.getByRole("tooltip", { includeHidden: true });
    await expect(tooltip).toBeHidden();
    await slot.hover();
    await expect(tooltip).toBeVisible();
    await page.mouse.move(0, 0);
    await expect(tooltip).toBeHidden();
    await slot.focus();
    await expect(tooltip).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(tooltip).toBeHidden();
  });
});

test.describe("Responsive mobile navigation", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("shows hotbar navigation and hides the sidebar", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("BlockMaster_42").first()).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Playground Navigation" })).toBeHidden();
    const hotbar = page.getByRole("navigation", { name: "Quick navigation" });
    await expect(hotbar).toBeVisible();
    await hotbar.getByRole("button", { name: "Inventory" }).click();
    await expect(page.getByRole("grid", { name: "Inventory" })).toBeVisible();
  });
});

test.describe("Server browser (0.2.0 components)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("navigation", { name: /navigation/i })
      .getByRole("button", { name: "Servers" })
      .first()
      .click();
  });

  test("sorts the whole list and pages through it", async ({ page }) => {
    const table = page.getByRole("table", { name: "Server list" });
    await expect(table.getByRole("rowheader").first()).toHaveText("Block Realm 01");
    await page.getByRole("button", { name: "Players" }).click();
    await page.getByRole("button", { name: "Players" }).click();
    await expect(page.getByRole("columnheader", { name: "Players" })).toHaveAttribute(
      "aria-sort",
      "descending",
    );
    const top = await table.getByRole("row").nth(1).getByRole("cell").nth(1).textContent();
    expect(Number(top)).toBeGreaterThan(900);

    const pages = page.getByRole("navigation", { name: "Server list pages" });
    await pages.getByRole("button", { name: "Next page" }).click();
    await expect(pages.getByRole("button", { name: "Page 2" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  test("row menu opens on click with reduced motion and focuses the first item", async ({
    page,
  }) => {
    // Reduced motion turns every property into a transition (base.css); focus must still land.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.getByRole("button", { name: "Actions for Block Realm 06" }).click();
    await expect(page.getByRole("menuitem", { name: "Join" })).toBeFocused();
    await expect(page.getByRole("menuitem", { name: "Remove" })).toBeInViewport();
  });

  test("row menu works with the keyboard", async ({ page }) => {
    const trigger = page.getByRole("button", { name: "Actions for Block Realm 01" });
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("menuitem", { name: "Join" })).toBeFocused();
    await page.keyboard.press("ArrowUp");
    await expect(page.getByRole("menuitem", { name: "Remove" })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("menu")).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("toolbar tooltip shows on hover and focus", async ({ page, isMobile }) => {
    test.skip(isMobile, "hover needs a mouse");
    const button = page.getByRole("button", { name: "Add server" });
    await button.hover();
    await expect(page.getByRole("tooltip", { name: "Add a server by address" })).toBeVisible();
    await page.mouse.move(0, 0);
    await expect(page.getByRole("tooltip")).toBeHidden();
    await button.focus();
    await expect(button).toHaveAccessibleDescription("Add a server by address");
    await expect(page.getByRole("tooltip")).toBeVisible();
  });
});
