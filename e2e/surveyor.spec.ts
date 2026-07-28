import { test, expect } from '@playwright/test';

test.describe('Surveyor Pages', () => {
  test('should load surveyor dashboard page without server error', async ({ page }) => {
    const response = await page.goto('/surveyor');
    expect(response?.status()).toBeLessThan(500);
  });

  test('should load surveyor tasks page without server error', async ({ page }) => {
    const response = await page.goto('/surveyor/tasks');
    expect(response?.status()).toBeLessThan(500);
  });
});
