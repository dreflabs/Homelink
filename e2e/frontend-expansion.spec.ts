import { test, expect } from '@playwright/test';

test.describe('Frontend Expansion E2E', () => {
  // Test untuk rute Owner: /owner/properties/new
  test('Owner can visit create property page', async ({ page }) => {
    // Menirukan (mock) auth session untuk role owner
    await page.route('**/api/auth/session', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          user: {
            id: 'owner-1',
            name: 'Dummy Owner',
            email: 'owner@dummy.com',
            role: 'owner'
          },
          expires: new Date(Date.now() + 86400000).toISOString()
        })
      });
    });

    const response = await page.goto('/owner/properties/new');
    
    // Memastikan tidak terjadi server error (status >= 500)
    expect(response?.status()).toBeLessThan(500);
    
    // Memastikan URL sesuai dengan yang diharapkan
    await expect(page).toHaveURL(/.*\/owner\/properties\/new/);
  });

  // Test untuk rute Admin: /admin/properties
  test('Admin can visit properties page', async ({ page }) => {
    // Menirukan (mock) auth session untuk role admin
    await page.route('**/api/auth/session', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          user: {
            id: 'admin-1',
            name: 'Dummy Admin',
            email: 'admin@dummy.com',
            role: 'admin'
          },
          expires: new Date(Date.now() + 86400000).toISOString()
        })
      });
    });

    const response = await page.goto('/admin/properties');
    
    // Memastikan tidak terjadi server error (status >= 500)
    expect(response?.status()).toBeLessThan(500);
    
    // Memastikan URL sesuai dengan yang diharapkan
    await expect(page).toHaveURL(/.*\/admin\/properties/);
  });

  // Test untuk rute Admin: /admin/verification
  test('Admin can visit verification page', async ({ page }) => {
    // Menirukan (mock) auth session untuk role admin
    await page.route('**/api/auth/session', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          user: {
            id: 'admin-1',
            name: 'Dummy Admin',
            email: 'admin@dummy.com',
            role: 'admin'
          },
          expires: new Date(Date.now() + 86400000).toISOString()
        })
      });
    });

    const response = await page.goto('/admin/verification');
    
    // Memastikan tidak terjadi server error (status >= 500)
    expect(response?.status()).toBeLessThan(500);
    
    // Memastikan URL sesuai dengan yang diharapkan
    await expect(page).toHaveURL(/.*\/admin\/verification/);
  });
});
