import { test, expect } from '@playwright/test';

test.describe('CMS Engine E2E Tests', () => {
  test('should render /cms/articles page successfully and display expected text', async ({ page }) => {
    // Navigate to the CMS articles page
    const response = await page.goto('/cms/articles');

    // Validate that the page renders successfully (not a 500 error)
    expect(response?.status()).not.toBe(500);

    // Validate that the text 'Tulis Artikel Baru' or 'Articles' is visible
    const targetText = page.getByText(/Tulis Artikel Baru|Articles/i).first();
    await expect(targetText).toBeVisible({ timeout: 10000 });
  });
});
