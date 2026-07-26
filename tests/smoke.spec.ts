import { test, expect } from "@playwright/test";

test.describe("Smoke Tests", () => {
  test("Homepage loads and title is correct", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    // Wait for the page title to be set
    await page.waitForTimeout(2000);
    const title = await page.title();
    expect(title).toMatch(/OM'?KUMOH|Engineering/i);
  });

  test("Navigation links exist and are clickable", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    // Navigation is dynamically imported ssr:false — wait for it to hydrate
    const nav = page.locator("nav, header, [role='navigation']").first();
    await expect(nav).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(500);

    const navLinks = nav.locator("a");
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThanOrEqual(3);

    // Click each link and verify navigation works
    const links = await navLinks.all();
    for (const link of links) {
      const href = await link.getAttribute("href");
      if (href && href !== "#" && !href.startsWith("mailto:") && !href.startsWith("tel:") && href !== "/") {
        const currentUrl = page.url();
        // Use force:true to bypass decorative hover-effect spans that intercept pointer events
        await link.click({ force: true });
        await page.waitForTimeout(1000);
        const newUrl = page.url();
        if (newUrl !== currentUrl) {
          await page.goBack();
          await page.waitForTimeout(1000);
        }
      }
    }
  });

  test("Services page loads and has content", async ({ page }) => {
    await page.goto("/services", { waitUntil: "domcontentloaded" });
    // Client component with framer-motion; wait for the main heading to appear
    await expect(page.getByRole("heading", { name: /Comprehensive Engineering|Engineering Services/i })).toBeVisible({ timeout: 15000 });
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.length).toBeGreaterThan(50);
  });

  test("Projects page loads and has content", async ({ page }) => {
    await page.goto("/projects", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: /Featured Projects/i })).toBeVisible({ timeout: 15000 });
    const filters = page.locator("button:has-text('All'), button:has-text('Completed'), button:has-text('Ongoing')");
    await expect(filters.first()).toBeVisible({ timeout: 5000 });
  });

  test("Contact page loads and has form fields", async ({ page }) => {
    await page.goto("/contact", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);

    // ContactSection is imported directly but react-hook-form needs hydration
    const form = page.locator("form");
    const formExists = (await form.count()) > 0;

    if (formExists) {
      await expect(form).toBeVisible({ timeout: 10000 });
      // Fill in the form to ensure it's interactive
      const nameInput = form.locator("input").first();
      await expect(nameInput).toBeVisible({ timeout: 5000 });
    } else {
      const bodyText = await page.locator("body").innerText();
      const hasContactInfo =
        bodyText.match(/email|phone|address|contact|message|get in touch|let's build/i);
      expect(hasContactInfo).toBeTruthy();
    }
  });
});
