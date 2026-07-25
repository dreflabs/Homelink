import { test, expect } from '@playwright/test';

test.describe('Photographer Routes', () => {
  test('should render /photographer without 500 error', async ({ page }) => {
    const response = await page.goto('/photographer');
    expect(response?.status()).not.toBe(500);
  });

  test('should render /photographer/assignments without 500 error', async ({ page }) => {
    const response = await page.goto('/photographer/assignments');
    expect(response?.status()).not.toBe(500);
  });
});
