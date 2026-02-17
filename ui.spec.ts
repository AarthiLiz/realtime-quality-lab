import { test, expect } from '@playwright/test';

const UI_URL = process.env.API_URL || 'http://localhost:3000';

test.describe('Chat UI Visuals', () => {
  test('should match the baseline screenshot of the chat page', async ({ page }) => {
    await page.goto(UI_URL);

    // The first run will create a baseline. Subsequent runs will compare to it.
    await expect(page).toHaveScreenshot('chat-ui-baseline.png');
  });
});
