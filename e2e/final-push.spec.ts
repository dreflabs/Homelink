import { test, expect } from '@playwright/test';

const routes = [
  '/admin',
  '/admin/users',
  '/notifications',
];

test.describe('E2E Route Rendering Checks', () => {
  for (const route of routes) {
    test(`Route ${route} should render successfully with status 200`, async ({ page, baseURL }) => {
      // Use baseURL if available, otherwise default to http://localhost:3000
      const url = baseURL ? route : `http://localhost:3000${route}`;
      const response = await page.goto(url);
      
      expect(response).not.toBeNull();
      expect(response?.status()).toBe(200);
    });
  }
});
