/* eslint-disable no-console */

import { chromium, expect, FullConfig } from "@playwright/test";

const CI = process.env.CI === "true";

/**
 * Runs before tests are prepared by playwright
 */
export default async function setup(config: FullConfig) {
  const { baseURL, cert } = config.metadata;

  console.log(`Running Playwright tests on ${baseURL}`);

  if (CI) {
    /**
     * Global setup and teardown can't be used on CI with remote browsers so we use dedicated projects for that.
     * https://github.com/microsoft/playwright-testing-service/issues/182
     */
    return;
  }

  console.log("- Running setup");

  const browser = await chromium.launch({
    headless: false,
    env: {
      // Trust TSL cert
      // NODE_EXTRA_CA_CERTS: cert.certPath,
    },
    // channel: "chromium",
    // args: ["--ignore-certificate-errors"],
  });
  const context = await browser.newContext({
    clientCertificates: [cert],
    ignoreHTTPSErrors: true,
  });
  const page = await context.newPage();
  await page.goto(baseURL);
  const bar = await (
    await page.waitForFunction(() => window.foo as string)
  ).jsonValue();
  expect(bar).toBe("bar");
  await browser.close();

  console.log(`- Completed setup`);
}
