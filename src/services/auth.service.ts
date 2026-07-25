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

    if (existingEmail) {
      throw new Error('Email sudah terdaftar.');
    }

    const existingPhone = await prisma.user.findUnique({
      where: { phone: data.phone },
    });

    if (existingPhone) {
      throw new Error('Nomor telepon sudah terdaftar.');
    }

    const passwordHash = await hashPassword(data.password);

    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        passwordHash,
        termsAcceptedAt: new Date(),
      },
    });

    // We do NOT use fire-and-forget anymore, we must await it per the audit report
    await generateVerificationToken(newUser.email);

    return newUser;
  }
}
