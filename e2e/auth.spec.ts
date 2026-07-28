import { test, expect } from '@playwright/test';

test.describe('Authentication Flows', () => {
  test('should display forgot password page and submit form', async ({ page }) => {
    await page.goto('/forgot-password');
    
    // Check title
    await expect(page.locator('h2')).toContainText('Lupa Kata Sandi?');
    
    // Fill form
    await page.fill('input[id="identifier"]', 'test@example.com');
    await page.click('button[type="submit"]');
    
    // Check success state
    await expect(page.locator('h2')).toContainText('Instruksi Terkirim');
  });

  test('should display verify email state correctly', async ({ page }) => {
    // With invalid token
    await page.goto('/verify-email?token=invalid');
    await expect(page.getByRole('heading', { name: 'Tautan Tidak Valid' })).toBeVisible();
  });
});
