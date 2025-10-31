import { expect, test } from "@playwright/test";

// Slow down the test
// test.use({ launchOptions: { slowMo: process.env.CI !== "true" ? 500 : 0 } });

test("Example", async ({ page }, testInfo) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Hello World");
  await expect(page.getByText("Hello World")).toBeVisible();
});
