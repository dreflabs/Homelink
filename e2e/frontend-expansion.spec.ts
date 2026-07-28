import { test, expect } from '@playwright/test';

test.describe('Frontend Expansion E2E', () => {
  test('Owner create property page should not crash', async ({ page }) => {
    const response = await page.goto('/owner/properties/new');
    expect(response?.status()).toBeLessThan(500);
  });

  test('Admin properties page should not crash', async ({ page }) => {
    const response = await page.goto('/admin/properties');
    expect(response?.status()).toBeLessThan(500);
  });

  test('Admin verification page should not crash', async ({ page }) => {
    const response = await page.goto('/admin/verification');
    expect(response?.status()).toBeLessThan(500);
  });
});
