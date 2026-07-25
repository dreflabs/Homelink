import { test, expect } from '@playwright/test';

test.describe('Partner Agent Pages E2E Tests', () => {
  test('should load /agent without 500 error and render content', async ({ page }) => {
    const response = await page.goto('/agent');
    
    // Check that response is successful and not a server error
    expect(response?.status()).toBeLessThan(500);
    expect(response?.ok()).toBeTruthy();

    // Verify page is rendered by checking body visibility
    await expect(page.locator('body')).toBeVisible();
  });

  test('should load /agent/clients without 500 error and render content', async ({ page }) => {
    const response = await page.goto('/agent/clients');
    
    // Check that response is successful and not a server error
    expect(response?.status()).toBeLessThan(500);
    expect(response?.ok()).toBeTruthy();

    // Verify page is rendered by checking body visibility
    await expect(page.locator('body')).toBeVisible();
  });
});
