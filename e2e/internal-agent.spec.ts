import { test, expect } from '@playwright/test';

test.describe('Internal Agent Pages', () => {
  test('should render /internal successfully', async ({ page }) => {
    const response = await page.goto('/internal');
    expect(response?.status()).toBe(200);
  });

  test('should render /internal/properties successfully', async ({ page }) => {
    const response = await page.goto('/internal/properties');
    expect(response?.status()).toBe(200);
  });
});
