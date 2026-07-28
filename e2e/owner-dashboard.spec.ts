import { test, expect } from '@playwright/test';

test.describe('Owner Dashboard', () => {
  test('should load owner properties page without server error', async ({ page }) => {
    const response = await page.goto('/owner/properties');
    expect(response?.status()).toBeLessThan(500);
  });
});
