import { test, expect } from '@playwright/test';

test.describe('Internal Agent Pages', () => {
  test('should render /internal-agent without server error', async ({ page }) => {
    const response = await page.goto('/internal-agent');
    expect(response?.status()).toBeLessThan(500);
  });

  test('should render /internal-agent/properties without server error', async ({ page }) => {
    const response = await page.goto('/internal-agent/properties');
    expect(response?.status()).toBeLessThan(500);
  });
});
