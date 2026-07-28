import { test, expect } from '@playwright/test';

test.describe('CMS Engine E2E Tests', () => {
  test('should render /cms/articles page without server error', async ({ page }) => {
    const response = await page.goto('/cms/articles');
    expect(response?.status()).toBeLessThan(500);
  });
});
