import { test, expect } from '@playwright/test';

test.describe('Billing Center', () => {
  test('should load subscription page without server error', async ({ page }) => {
    const response = await page.goto('/billing/subscription');
    expect(response?.status()).toBeLessThan(500);
  });

  test('should load invoices page without server error', async ({ page }) => {
    const response = await page.goto('/billing/invoices');
    expect(response?.status()).toBeLessThan(500);
  });
});
