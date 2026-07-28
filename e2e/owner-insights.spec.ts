import { test, expect } from '@playwright/test';

test.describe('Owner Insights E2E Tests', () => {
  test('should load analytics page without server error', async ({ page }) => {
    const response = await page.goto('/owner/properties/123/analytics');
    expect(response?.status()).toBeLessThan(500);
  });

  test('should load leads page without server error', async ({ page }) => {
    const response = await page.goto('/owner/properties/123/leads');
    expect(response?.status()).toBeLessThan(500);
  });
});
