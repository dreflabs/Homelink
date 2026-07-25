import { test, expect } from '@playwright/test';

test.describe('Super Admin Pages', () => {
  test('should render /super-admin successfully without 500 error', async ({ page }) => {
    const response = await page.goto('/super-admin');
    
    // Pastikan halaman dimuat dengan sukses
    expect(response).not.toBeNull();
    if (response) {
      expect(response.status()).not.toBe(500);
      expect(response.status()).toBeLessThan(400); // Seharusnya sukses 2xx atau 3xx redirect
    }
  });

  test('should render /super-admin/audit-logs successfully without 500 error', async ({ page }) => {
    const response = await page.goto('/super-admin/audit-logs');
    
    // Pastikan halaman dimuat dengan sukses
    expect(response).not.toBeNull();
    if (response) {
      expect(response.status()).not.toBe(500);
      expect(response.status()).toBeLessThan(400); // Seharusnya sukses 2xx atau 3xx redirect
    }
  });
});
