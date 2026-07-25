import { beforeEach, describe, expect, test, vi } from 'vitest';

const { auth } = vi.hoisted(() => ({ auth: vi.fn() }));
vi.mock('../auth', () => ({ auth }));

const { prismaUpdate, prismaAuditCreate } = vi.hoisted(() => ({
  prismaUpdate: vi.fn(),
  prismaAuditCreate: vi.fn(),
}));
vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn().mockImplementation(() => ({
    property: { update: prismaUpdate },
    verificationAudit: { create: prismaAuditCreate },
  })),
}));

vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }));

import { verifyProperty } from './admin';

describe('verifyProperty', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('throws Unauthorized when there is no session', async () => {
    auth.mockResolvedValue(null);
    await expect(verifyProperty('prop-1', 'APPROVED')).rejects.toThrow('Unauthorized');
    expect(prismaUpdate).not.toHaveBeenCalled();
  });

  test('throws Unauthorized when the session user is not an ADMIN', async () => {
    auth.mockResolvedValue({ user: { id: 'u1', role: 'OWNER' } });
    await expect(verifyProperty('prop-1', 'APPROVED')).rejects.toThrow('Only ADMIN');
    expect(prismaUpdate).not.toHaveBeenCalled();
  });

  test('updates property status for an ADMIN session', async () => {
    auth.mockResolvedValue({ user: { id: 'admin-1', role: 'ADMIN' } });
    prismaUpdate.mockResolvedValue({ id: 'prop-1', status: 'APPROVED' });

    const result = await verifyProperty('prop-1', 'APPROVED');

    expect(prismaUpdate).toHaveBeenCalledWith({
      where: { id: 'prop-1' },
      data: { status: 'APPROVED' },
    });
    expect(result).toEqual({ id: 'prop-1', status: 'APPROVED' });
  });

  test('writes a VerificationAudit row when notes are provided', async () => {
    auth.mockResolvedValue({ user: { id: 'admin-1', role: 'ADMIN' } });
    prismaUpdate.mockResolvedValue({ id: 'prop-1', status: 'REJECTED' });

    await verifyProperty('prop-1', 'REJECTED', 'Foto tidak sesuai kondisi lapangan');

    expect(prismaAuditCreate).toHaveBeenCalledWith({
      data: {
        propertyId: 'prop-1',
        surveyorId: 'admin-1',
        action: 'Status changed to REJECTED',
        notes: 'Foto tidak sesuai kondisi lapangan',
      },
    });
  });

  test('skips the VerificationAudit write when no notes are given', async () => {
    auth.mockResolvedValue({ user: { id: 'admin-1', role: 'ADMIN' } });
    prismaUpdate.mockResolvedValue({ id: 'prop-1', status: 'APPROVED' });

    await verifyProperty('prop-1', 'APPROVED');

    expect(prismaAuditCreate).not.toHaveBeenCalled();
  });
});
