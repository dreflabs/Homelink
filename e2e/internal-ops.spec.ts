import { test, expect } from '@playwright/test';

test.describe('Internal Ops Navigation Tests', () => {
  test('Admin verify route should load without server error', async ({ page }) => {
    const response = await page.goto('/admin/verification');
    expect(response?.status()).toBeLessThan(500);
  });

  test('Surveyor form route should load without server error', async ({ page }) => {
    const response = await page.goto('/surveyor/tasks/prop-001/form');
    expect(response?.status()).toBeLessThan(500);
  });
});
