import { test, expect } from '@playwright/test';

test.describe('Public Pages End-to-End Tests', () => {
  test('Home page should render Hero Section and Featured Properties', async ({ page }) => {
    // Kunjungi halaman utama (route /)
    await page.goto('/');

    // Periksa keberadaan elemen di Hero Section
    await expect(page.locator('text=Temukan Rumah Impian')).toBeVisible();
    await expect(page.locator('text=Setiap properti di HomeLink telah melalui inspeksi fisik')).toBeVisible();

    // Periksa keberadaan section "Properti Unggulan" (Featured Properties)
    await expect(page.locator('text=Properti Terverifikasi Minggu Ini')).toBeVisible();

    // Pastikan beberapa list properti dummy (PropertyCard) tampil
    await expect(page.locator('text=Beautiful Apartment in City Center')).toBeVisible();
    await expect(page.locator('text=Spacious Villa with Pool')).toBeVisible();
  });

  test('Property details dummy route should not crash', async ({ page }) => {
    // Kunjungi route dengan data tersimpan dari seed
    const response = await page.goto('/p/beautiful-apartment-in-city-center');
    
    // Pastikan server merespon dengan status sukses (bukan 500 server error)
    expect(response?.status()).toBeLessThan(500);
    
    // Pastikan halaman berhasil di-render dengan mengecek beberapa teks spesifik
    // di dalam dummy page detail properti (karena saat ini data masih statis)
    await expect(page.locator('text=Deskripsi Properti')).toBeVisible();
    await expect(page.locator('text=Legalitas Terverifikasi')).toBeVisible();

    // Pastikan tidak ada pesan error render fatal dari kerangka aplikasi
    const bodyText = await page.textContent('body');
    expect(bodyText).toBeTruthy();
    expect(bodyText?.includes('Application error')).toBeFalsy();
  });
});
