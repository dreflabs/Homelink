import { test, expect } from '@playwright/test';

test.describe('Internal Ops Navigation Tests', () => {
  test('Admin verify route should load successfully', async ({ page }) => {
    const response = await page.goto('/admin/verification');
    
    // Pastikan response tidak 500 Internal Server Error
    expect(response?.status()).not.toBe(500);
    
    // Pastikan halamannya merender dengan sukses (biasanya status 200)
    expect(response?.ok()).toBeTruthy();
  });

  test('Surveyor form route should load successfully', async ({ page }) => {
    const response = await page.goto('/surveyor/tasks/prop-001/form');
    
    // Pastikan response tidak 500 Internal Server Error
    expect(response?.status()).not.toBe(500);
    
    // Pastikan halamannya merender dengan sukses
    expect(response?.ok()).toBeTruthy();
  });
});
