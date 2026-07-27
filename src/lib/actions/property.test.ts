import { beforeEach, describe, expect, test, vi } from 'vitest';

const { auth } = vi.hoisted(() => ({ auth: vi.fn() }));
vi.mock('../auth', () => ({ auth }));

const { prismaCreate, prismaFindUnique } = vi.hoisted(() => ({
  prismaCreate: vi.fn(),
  prismaFindUnique: vi.fn(),
}));
vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn().mockImplementation(() => ({
    property: { create: prismaCreate },
    user: { findUnique: prismaFindUnique },
  })),
}));

vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }));

import { createProperty } from './property';

function validFormData(overrides: Record<string, string> = {}) {
  const fields: Record<string, string> = {
    title: 'Rumah Mewah',
    description: 'Dekat sekolah',
    price: '2500000000',
    type: 'HOUSE',
    address: 'Jl. Merdeka No. 1',
    lat: '-6.2',
    lng: '106.8',
    ...overrides,
  };
  const fd = new FormData();
  for (const [key, value] of Object.entries(fields)) fd.set(key, value);
  return fd;
}

describe('createProperty', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('throws Unauthorized when there is no session', async () => {
    auth.mockResolvedValue(null);
    await expect(createProperty(validFormData())).resolves.toEqual({ success: false, error: 'Unauthorized: Anda harus login.' });
    expect(prismaCreate).not.toHaveBeenCalled();
  });

  test('throws Forbidden when the logged-in user is not an OWNER', async () => {
    auth.mockResolvedValue({ user: { id: 'u1', role: 'BUYER' } });
    await expect(createProperty(validFormData())).resolves.toEqual({ success: false, error: 'Forbidden: Hanya Owner yang dapat membuat properti.' });
    expect(prismaCreate).not.toHaveBeenCalled();
  });

  test('rejects when a required field is missing', async () => {
    auth.mockResolvedValue({ user: { id: 'u1', role: 'OWNER' } });
    await expect(createProperty(validFormData({ title: '' }))).resolves.toEqual({ success: false, error: 'Bad Request: Judul, harga, dan alamat wajib diisi.' });
    expect(prismaCreate).not.toHaveBeenCalled();
  });

  test('rejects a non-numeric price', async () => {
    auth.mockResolvedValue({ user: { id: 'u1', role: 'OWNER' } });
    await expect(createProperty(validFormData({ price: 'free' }))).resolves.toEqual({ success: false, error: 'Bad Request: Harga tidak valid.' });
  });

  test('rejects invalid lat/lng', async () => {
    auth.mockResolvedValue({ user: { id: 'u1', role: 'OWNER' } });
    await expect(createProperty(validFormData({ lat: 'north' }))).resolves.toEqual({ success: false, error: 'Internal Server Error: Gagal menyimpan data properti.' });
  });

  test('creates the property with status PENDING for a valid OWNER submission', async () => {
    auth.mockResolvedValue({ user: { id: 'owner-1', role: 'OWNER' } });
    prismaCreate.mockResolvedValue({ id: 'prop-1' });

    const result = await createProperty(validFormData());

    expect(prismaCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({
        title: 'Rumah Mewah',
        price: 2500000000,
        latitude: -6.2,
        longitude: 106.8,
        status: 'PENDING_REVIEW',
        ownerId: 'owner-1',
        propertyType: 'HOUSE',
        slug: expect.stringContaining('rumah-mewah'),
      }),
    });
    expect(result).toEqual({ success: true, message: 'Properti berhasil dibuat.', propertyId: 'prop-1' });
  });

  test('falls back to looking up the user id by email when session.user.id is missing', async () => {
    auth.mockResolvedValue({ user: { email: 'owner@test.com', role: 'OWNER' } });
    prismaFindUnique.mockResolvedValue({ id: 'resolved-owner-id' });
    prismaCreate.mockResolvedValue({ id: 'prop-2' });

    await createProperty(validFormData());

    expect(prismaFindUnique).toHaveBeenCalledWith({ where: { email: 'owner@test.com' } });
    expect(prismaCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({ ownerId: 'resolved-owner-id' }),
    });
  });

  test('wraps a database failure in a generic Internal Server Error', async () => {
    auth.mockResolvedValue({ user: { id: 'owner-1', role: 'OWNER' } });
    prismaCreate.mockRejectedValue(new Error('connection reset'));

    await expect(createProperty(validFormData())).resolves.toEqual({ success: false, error: 'Internal Server Error: Gagal menyimpan data properti.' });
  });
});
