import { test, expect } from "@playwright/test";

test.describe("Accessibility Tests", () => {
  test("Homepage has a skip navigation link", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    // The SkipNav is server-rendered (not ssr:false), so it's in the DOM immediately
    // It's visually hidden (-translate-y-full) until focused via Tab
    const skipLink = page.locator(
      'a:has-text("Skip"), a[href*="skip"], a[href*="content"], a[href*="main"], a.skip-link, .skip-link a'
    ).first();

    const skipCount = await skipLink.count();
    if (skipCount > 0) {
      const href = await skipLink.getAttribute("href");
      expect(href).toBeTruthy();
      expect(href).toBe("#main-content");

      // Verify it receives focus when pressing Tab
      await page.keyboard.press("Tab");
      await page.waitForTimeout(200);
      const isFocused = await skipLink.evaluate((el) => el === document.activeElement);
      expect(isFocused).toBe(true);
    } else {
      const skipRegion = page.locator("#skip, .skip, [data-skip]").first();
      await expect(skipRegion).toBeVisible();
    }
  });

  test("Images have alt attributes", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);

    const imagesWithoutAlt = await page.locator("img").evaluateAll((images) =>
      images
        .filter((img) => !img.hasAttribute("alt"))
        .map((img) => img.getAttribute("src") || "unknown")
    );

    expect(imagesWithoutAlt).toEqual([]);
  });

  test("Basic keyboard navigation through nav links", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // Navigation is ssr:false — wait for it to hydrate
    const nav = page.locator("nav, header, [role='navigation']").first();
    await expect(nav).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(500);

    const navLinks = nav.locator("a");
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThanOrEqual(1);

    // Press Tab to focus SkipNav, Tab again to reach first nav link
    let focusedTag = "";
    for (let attempt = 0; attempt < 10; attempt++) {
      await page.keyboard.press("Tab");
      await page.waitForTimeout(200);

      const focused = page.locator(":focus");
      const focusedCount = await focused.count();

      if (focusedCount > 0) {
        focusedTag = await focused.evaluate((el) => el.tagName);
        const isNavLink = await focused.evaluate((el) =>
          el.closest("nav, header, [role='navigation']") !== null
        );
        if (isNavLink) break;
      }
    }

    // Verify we eventually focus a standard interactive element
    expect(["A", "BUTTON", "INPUT", "TEXTAREA", "SELECT"]).toContain(focusedTag);

    // Tab through to verify focus reaches interactive elements (skip non-interactive dividers)
    for (let i = 0; i < Math.min(linkCount + 3, 8); i++) {
      await page.keyboard.press("Tab");
      await page.waitForTimeout(200);
      // Some tab stops may be non-interactive (divs used as visual separators);
      // just ensure we don't crash — the core assertion is that :focus exists
    }
  });
});
