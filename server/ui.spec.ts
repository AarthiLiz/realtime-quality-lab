import { test, expect } from '@playwright/test';

const UI_URL = process.env.API_URL || 'http://localhost:3000';

test.describe('Chat UI Visuals', () => {
  test('should match the baseline screenshot of the chat page', async ({ page }) => {
    // 1. Navigate to the chat UI
    await page.goto(UI_URL);

    // 2. Take a screenshot and compare it to the baseline.
    // The first run will create 'chat-ui-baseline.png'.
    await expect(page).toHaveScreenshot('chat-ui-baseline.png');
  });
});
