import { test, expect } from '@playwright/test';

test.describe('Owner Insights E2E Tests', () => {
  test('should render the analytics page correctly', async ({ page }) => {
    const response = await page.goto('/owner/properties/123/analytics');
    
    // Check if the response is successful and not a server error
    expect(response?.status()).toBeLessThan(500);

    // Check if the main element is rendered
    await expect(page.getByText('Analytics', { exact: false }).first()).toBeVisible();
  });

  test('should render the leads page correctly', async ({ page }) => {
    const response = await page.goto('/owner/properties/123/leads');
    
    // Check if the response is successful and not a server error
    expect(response?.status()).toBeLessThan(500);

    // Check if the main element is rendered
    await expect(page.getByText('Leads', { exact: false }).first()).toBeVisible();
  });
});
