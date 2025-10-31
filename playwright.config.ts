import { defineConfig, devices } from "@playwright/test";
import path from "path";

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// env
const CI = process.env.CI === "true";
const port = Number(process.env.PORT || 3001);
const localhost = new URL(`https://localhost:${port}`);
const baseURL = new URL(process.env.BASE_URL || localhost.toString());

const cert = {
  origin: localhost.origin,
  certPath: path.resolve("./cert/cert.pem"),
  keyPath: path.resolve("./cert/key.pem"),
};

// Trust TSL cert
process.env.NODE_EXTRA_CA_CERTS = cert.certPath;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  metadata: {
    cert,
    baseURL: baseURL.toString(),
  },
  globalSetup: "./test/setup.ts",
  timeout: 10 * 1000,
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 1 : 0,
  reporter: [
    ["list"],
    ["html", { outputFolder: "test/report", open: "never" }],
    ["json", { outputFile: "test/results/test-results.json" }],
  ],
  outputDir: "test/results",
  use: {
    clientCertificates: [
      {
        origin: localhost.origin,
        certPath: "./cert/cert.pem",
        keyPath: "./cert/key.pem",
      },
    ],
    ignoreHTTPSErrors: true,
    launchOptions: {
      args: ["--ignore-certificate-errors"],
    },
    baseURL: baseURL.origin,
  },
  projects: [
    {
      name: "Main",
      use: {
        ...devices["Desktop Chrome"],
        browserName: "chromium",
      },
      testDir: "test",
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: [
    ...(baseURL.hostname === "localhost"
      ? [
          {
            command: CI ? "npm run preview" : "npm start",
            port,
            reuseExistingServer: true,
            ignoreHTTPSErrors: true,
          },
        ]
      : []),
  ],
});
