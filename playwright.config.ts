import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: [['line'], ['allure-playwright']],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  // Configure visual regression testing
  expect: {
    toHaveScreenshot: {
      // An acceptable pixel difference to account for anti-aliasing.
      maxDiffPixels: 10,
    },
  },
});
