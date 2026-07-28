import { test, expect } from '@playwright/test';

test.describe('Property Search & Detail Flows', () => {
  test('should display search results page without crash', async ({ page }) => {
    const response = await page.goto('/search-result?query=jakarta');
    expect(response?.status()).toBeLessThan(500);
  });

  test('should display property details without crash', async ({ page }) => {
    // Use a slug that exists in the seed data
    const response = await page.goto('/p/beautiful-apartment-in-city-center');
    expect(response?.status()).toBeLessThan(500);
  });
});
