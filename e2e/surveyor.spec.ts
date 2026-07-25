import { test, expect } from '@playwright/test';

test.describe('Surveyor Pages', () => {
  test('should load surveyor dashboard page successfully', async ({ page }) => {
    // Navigate to the surveyor dashboard
    const response = await page.goto('/surveyor');
    
    // Ensure the response status is not a server error (status < 500)
    expect(response?.status()).toBeLessThan(500);
  });

  test('should load surveyor assignments page successfully', async ({ page }) => {
    // Navigate to the surveyor assignments page
    const response = await page.goto('/surveyor/assignments');
    
    // Ensure the response status is not a server error (status < 500)
    expect(response?.status()).toBeLessThan(500);
  });
});
