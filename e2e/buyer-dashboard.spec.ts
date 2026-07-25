import { test, expect } from '@playwright/test';

test.describe('Buyer Dashboard - Jadwal Survei', () => {
  test('should display Jadwal Survei and filter tabs Menunggu / Selesai', async ({ page }) => {
    // Navigate to the bookings dashboard
    await page.goto('/dashboard/bookings');

    // Check if the heading/text "Jadwal Survei" is visible
    await expect(page.getByText('Jadwal Survei')).toBeVisible();

    // Check if the filter tab "Menunggu" is visible
    // Depending on the implementation, it might be a button or tab. Using getByRole is best practice for accessibility.
    // If it fails, fallback to getByText can be considered.
    await expect(page.getByRole('tab', { name: 'Menunggu' }).or(page.getByText('Menunggu'))).toBeVisible();

    // Check if the filter tab "Selesai" is visible
    await expect(page.getByRole('tab', { name: 'Selesai' }).or(page.getByText('Selesai'))).toBeVisible();
  });
});
