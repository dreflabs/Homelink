import { test, expect } from '@playwright/test';

test.describe('Property Search & Detail Flows', () => {
  test('should display search results', async ({ page }) => {
    await page.goto('/search-result?query=jakarta');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should display property details and contact form', async ({ page }) => {
    // Assuming 'demo-slug' exists or it's mocked, we just check layout
    await page.goto('/p/demo-slug');
    await expect(page.locator('text=Hubungi Agen')).toBeVisible();
    await expect(page.locator('text=Jadwal Survey')).toBeVisible();
  });
});
