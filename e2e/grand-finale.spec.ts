import { test, expect } from '@playwright/test';

test.describe('Grand Finale E2E Tests', () => {
  test('should render /ai/valuation successfully without HTTP 500', async ({ page }) => {
    const response = await page.goto('/ai/valuation');
    // Ensure the response status is not 500 or above (server errors)
    expect(response?.status()).toBeLessThan(500);
  });

  test('should render /about successfully without HTTP 500', async ({ page }) => {
    const response = await page.goto('/about');
    expect(response?.status()).toBeLessThan(500);
  });

  test('should render /privacy successfully without HTTP 500', async ({ page }) => {
    const response = await page.goto('/privacy');
    expect(response?.status()).toBeLessThan(500);
  });
});
