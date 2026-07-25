import { describe, expect, test } from 'vitest';
import { authConfig } from './auth.config';

type SessionUser = { role?: string } | undefined;

function callAuthorized(pathname: string, user: SessionUser) {
  const auth = user ? { user } : null;
  const nextUrl = new URL(`https://homelink.test${pathname}`);
  // @ts-expect-error - only the fields the callback reads are provided
  return authConfig.callbacks!.authorized!({ auth, request: { nextUrl } });
}

describe('authConfig.callbacks.authorized', () => {
  describe('unauthenticated users', () => {
    test('is blocked from every protected route prefix', () => {
      const protectedPaths = [
        '/dashboard', '/admin', '/super-admin', '/internal',
        '/owner', '/billing', '/notifications', '/ai', '/surveyor',
      ];
      for (const p of protectedPaths) {
        expect(callAuthorized(p, undefined)).toBe(false);
      }
    });

    test('can still reach public routes', () => {
      expect(callAuthorized('/', undefined)).toBe(true);
      expect(callAuthorized('/login', undefined)).toBe(true);
      expect(callAuthorized('/p/some-listing', undefined)).toBe(true);
    });
  });

  describe('role-gated routes reject the wrong role', () => {
    test.each([
      ['/admin', 'BUYER'],
      ['/super-admin', 'ADMIN'],
      ['/owner', 'BUYER'],
      ['/surveyor', 'OWNER'],
      ['/internal', 'SURVEYOR'],
    ])('%s rejects role %s with a redirect', (path, role) => {
      const result = callAuthorized(path, { role });
      expect(result).not.toBe(true);
      expect((result as Response).status).toBe(302);
      expect((result as Response).headers.get('location')).toContain('/unauthorized');
    });
  });

  describe('role-gated routes accept the right role', () => {
    test.each([
      ['/admin', 'ADMIN'],
      ['/admin', 'SUPER_ADMIN'],
      ['/super-admin', 'SUPER_ADMIN'],
      ['/owner', 'OWNER'],
      ['/owner', 'ADMIN'],
      ['/surveyor', 'SURVEYOR'],
      ['/internal', 'INTERNAL_AGENT'],
      ['/dashboard', 'BUYER'],
    ])('%s accepts role %s', (path, role) => {
      expect(callAuthorized(path, { role })).toBe(true);
    });
  });

  test('logged-in user is redirected away from /login and /register', () => {
    const result = callAuthorized('/login', { role: 'BUYER' });
    expect((result as Response).status).toBe(302);
    expect((result as Response).headers.get('location')).toBe('https://homelink.test/dashboard');
  });

  test('logged-in user can still browse public routes normally', () => {
    expect(callAuthorized('/', { role: 'BUYER' })).toBe(true);
  });
});
