import { test, expect } from '@playwright/test';

test.describe('Authentication Security E2E Tests', () => {
  test.beforeEach(async ({ context }) => {
    // Clear cookies before each test to ensure unauthenticated state
    await context.clearCookies();
  });

  const protectedRoutes = [
    '/admin/users',
    '/cms/articles',
  ];

  for (const route of protectedRoutes) {
    test(`should redirect to /login when accessing ${route} without authentication`, async ({ page }) => {
      // Attempt to access the protected route
      await page.goto(route);
      
      // Wait for the redirect to the login page
      await page.waitForURL('**/login*');
      
      // Validate that the final URL contains /login
      expect(page.url()).toContain('/login');
    });
  }
});
