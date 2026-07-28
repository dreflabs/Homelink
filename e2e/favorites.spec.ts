import { test, expect } from '@playwright/test';

test.describe('Favorites Page', () => {
  test('should render the saved properties page without server error', async ({ page }) => {
    const response = await page.goto('/dashboard/saved');
    expect(response?.status()).toBeLessThan(500);
  });
});
