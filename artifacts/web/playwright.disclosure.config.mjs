import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/disclosure',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 45_000,
  expect: { timeout: 8_000 },
  reporter: 'list',
  outputDir: '../../generated-artifacts/disclosure-tests',
  use: {
    baseURL: process.env.DISCLOSURE_BASE_URL || 'http://127.0.0.1:22333',
    browserName: 'chromium',
    headless: true,
    viewport: { width: 1280, height: 900 },
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    launchOptions: {
      ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
      args: ['--no-sandbox'],
    },
  },
});
