import { test, expect } from '@playwright/test';

test.describe('Partner Agent Pages E2E Tests', () => {
  test('should load /partner-agent without server error and render content', async ({ page }) => {
    const response = await page.goto('/partner-agent');
    expect(response?.status()).toBeLessThan(500);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should load /partner-agent/clients without server error and render content', async ({ page }) => {
    const response = await page.goto('/partner-agent/clients');
    expect(response?.status()).toBeLessThan(500);
    await expect(page.locator('body')).toBeVisible();
  });
});
