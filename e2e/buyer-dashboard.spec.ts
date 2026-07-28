import { test, expect } from '@playwright/test';

test.describe('Buyer Dashboard - Jadwal Survei', () => {
  test('should load bookings page without server error', async ({ page }) => {
    const response = await page.goto('/dashboard/bookings');
    expect(response?.status()).toBeLessThan(500);
  });
});
