import { test, expect } from '@playwright/test';

test.describe('Owner Dashboard', () => {
  test('should load owner properties page successfully', async ({ page }) => {
    // Navigate to the owner properties page
    const response = await page.goto('/owner/properties');
    
    // Ensure the response status is not a server error (status < 500)
    expect(response?.status()).toBeLessThan(500);

    // Verify that the dashboard rendered properly by finding 'Listing Saya'
    await expect(page.locator('text=Listing Saya').first()).toBeVisible();
  });
});
