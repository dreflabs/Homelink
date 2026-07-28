import prisma from '@/lib/prisma';
import { hashPassword } from '@/lib/hash';
import { generateVerificationToken } from '@/actions/auth';

export class AuthService {
  static async registerUser(data: {
    name: string;
    email: string;
    phone: string;
    role: any;
    password: string;
  }) {
    const existingEmail = await prisma.user.findUnique({
      where: { email: data.email },
    });
    const existingPhone = await prisma.user.findUnique({
      where: { phone: data.phone },
    });

    if (existingEmail || existingPhone) {
      throw new Error('Email atau nomor telepon sudah terdaftar.');
    }

    const passwordHash = await hashPassword(data.password);

    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        passwordHash,
        accountStatus: data.role === 'SURVEYOR' ? 'PENDING_APPROVAL' : 'ACTIVE',
        termsAcceptedAt: new Date(),
      },
    });

    // We do NOT use fire-and-forget anymore, we must await it per the audit report
    await generateVerificationToken(newUser.email);

    return newUser;
  }
}
