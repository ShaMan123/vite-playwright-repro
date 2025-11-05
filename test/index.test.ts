import { expect, test } from "@playwright/test";
import { extname } from "path";

// Slow down the test
// test.use({ launchOptions: { slowMo: process.env.CI !== "true" ? 500 : 0 } });

test("Example", async ({ page }, testInfo) => {
  await page.route(
    (url) => extname(url.pathname) === ".gif",
    (route) => route.abort()
  );
  await page.goto("/");
  await expect(page).toHaveTitle("Hello World");
  expect(
    await (await page.waitForFunction(() => window.foo as string)).jsonValue()
  ).toBe("bar");
  await expect(page.getByText("Hello World")).toBeVisible();
});
