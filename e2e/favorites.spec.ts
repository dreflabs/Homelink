import { test, expect } from '@playwright/test';

test.describe('Favorites Page', () => {
  test('should render the favorites page successfully with title and grid', async ({ page }) => {
    // Navigasi ke halaman Favorit
    const response = await page.goto('/dashboard/favorites');
    
    // Pastikan halaman tidak mengembalikan error 404/500
    expect(response?.status()).toBeLessThan(400);

    // Memastikan judul "Favorit" dirender dengan sukses
    const heading = page.getByRole('heading', { name: /Favorit/i });
    await expect(heading).toBeVisible();

    // Memastikan komponen grid dirender
    // Menggunakan pemilih CSS '.grid' sebagai asumsi container grid,
    // sesuaikan dengan selektor yang tepat jika diperlukan.
    const gridContainer = page.locator('.grid').first();
    await expect(gridContainer).toBeVisible();
  });
});
