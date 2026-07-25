import { beforeEach, describe, expect, test, vi } from 'vitest';

const { FakeAuthError } = vi.hoisted(() => {
  class FakeAuthError extends Error {
    type: string;
    constructor(message: string) {
      super(message);
      this.type = 'CredentialsSignin';
    }
  }
  return { FakeAuthError };
});
vi.mock('next-auth', () => ({ AuthError: FakeAuthError }));
import { AuthError } from 'next-auth';

const { signIn } = vi.hoisted(() => ({ signIn: vi.fn() }));
vi.mock('@/lib/auth', () => ({ signIn }));

const { redirect } = vi.hoisted(() => ({ redirect: vi.fn() }));
vi.mock('next/navigation', () => ({ redirect }));

const { prismaFindUnique } = vi.hoisted(() => ({ prismaFindUnique: vi.fn() }));
vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn().mockImplementation(() => ({
    user: { findUnique: prismaFindUnique },
  })),
}));

import { authenticate } from './auth';

function loginForm(email: string, password = 'secret') {
  const fd = new FormData();
  fd.set('email', email);
  fd.set('password', password);
  return fd;
}

describe('authenticate', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('returns a friendly message on invalid credentials', async () => {
    signIn.mockRejectedValue(
      Object.assign(new AuthError('bad creds'), { type: 'CredentialsSignin' }),
    );

    const result = await authenticate(undefined, loginForm('buyer@test.com'));

    expect(result).toBe('Email atau password salah.');
    expect(redirect).not.toHaveBeenCalled();
  });

  test('returns a generic message for other AuthError types', async () => {
    signIn.mockRejectedValue(
      Object.assign(new AuthError('oops'), { type: 'AccessDenied' }),
    );

    const result = await authenticate(undefined, loginForm('buyer@test.com'));

    expect(result).toBe('Terjadi kesalahan saat login.');
  });

  test('rethrows non-AuthError exceptions', async () => {
    signIn.mockRejectedValue(new Error('network down'));

    await expect(authenticate(undefined, loginForm('buyer@test.com'))).rejects.toThrow('network down');
  });

  test.each([
    ['ADMIN', '/super-admin'],
    ['SUPER_ADMIN', '/super-admin'],
    ['BUYER', '/dashboard'],
    ['OWNER', '/owner/properties'],
    ['SURVEYOR', '/surveyor/dashboard'],
  ])('redirects a %s to %s on successful login', async (role, expectedPath) => {
    signIn.mockResolvedValue(undefined);
    prismaFindUnique.mockResolvedValue({ email: 'user@test.com', role });

    await authenticate(undefined, loginForm('user@test.com'));

    expect(prismaFindUnique).toHaveBeenCalledWith({ where: { email: 'user@test.com' } });
    expect(redirect).toHaveBeenCalledWith(expectedPath);
  });

  test('falls back to "/" when the role has no mapped destination', async () => {
    signIn.mockResolvedValue(undefined);
    prismaFindUnique.mockResolvedValue({ email: 'user@test.com', role: 'PHOTOGRAPHER' });

    await authenticate(undefined, loginForm('user@test.com'));

    expect(redirect).toHaveBeenCalledWith('/');
  });

  test('falls back to "/" when the post-login user lookup itself fails', async () => {
    signIn.mockResolvedValue(undefined);
    prismaFindUnique.mockRejectedValue(new Error('db down'));

    await authenticate(undefined, loginForm('user@test.com'));

    expect(redirect).toHaveBeenCalledWith('/');
  });
});
