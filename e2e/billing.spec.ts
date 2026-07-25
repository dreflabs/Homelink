import { test, expect } from '@playwright/test';

test.describe('Billing Center', () => {
  test('harus merender halaman Subscription tanpa error 500', async ({ page }) => {
    const response = await page.goto('/billing/subscription');
    expect(response?.status()).not.toBe(500);
  });

  test('harus merender halaman Invoices tanpa error 500', async ({ page }) => {
    const response = await page.goto('/billing/invoices');
    expect(response?.status()).not.toBe(500);
  });
});
