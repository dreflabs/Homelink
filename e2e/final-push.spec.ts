import { test, expect } from '@playwright/test';

const routes = [
  '/admin',
  '/admin/users',
  '/notifications',
];

test.describe('E2E Route Rendering Checks', () => {
  for (const route of routes) {
    test(`Route ${route} should not crash with server error`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response).not.toBeNull();
      // Use < 500 instead of === 200 because next-intl middleware
      // returns 307 redirects for locale routing
      expect(response?.status()).toBeLessThan(500);
    });
  }
});
