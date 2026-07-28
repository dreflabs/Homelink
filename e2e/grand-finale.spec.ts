import { test, expect } from '@playwright/test';

test.describe('Grand Finale E2E Tests', () => {
  test('should render /ai/valuation without server error', async ({ page }) => {
    const response = await page.goto('/ai/valuation');
    expect(response?.status()).toBeLessThan(500);
  });

  test('should render /about-us without server error', async ({ page }) => {
    const response = await page.goto('/about-us');
    expect(response?.status()).toBeLessThan(500);
  });

  test('should render /legal/privacy-policy without server error', async ({ page }) => {
    const response = await page.goto('/legal/privacy-policy');
    expect(response?.status()).toBeLessThan(500);
  });
});
