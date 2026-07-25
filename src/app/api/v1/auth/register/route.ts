import { NextResponse } from 'next/server';
import { hashPassword } from '@/lib/hash';
import prisma from '@/lib/prisma';
import { generateVerificationToken } from '@/actions/auth';
import { z } from 'zod';

const RegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['BUYER', 'OWNER']).default('BUYER'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const validatedData = RegisterSchema.safeParse(body);
    
    if (!validatedData.success) {
      return NextResponse.json(
        {
          status: 'fail',
          message: 'Invalid input data',
          errors: validatedData.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, role, password } = validatedData.data;

    // Hashed with Argon2
    const passwordHash = await hashPassword(password);

    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { status: 'fail', message: 'Email sudah terdaftar.' },
        { status: 409 }
      );
    }

    // Insert ke Database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        role,
        passwordHash,
      },
    });

    // Generate dan kirim email verifikasi
    // Kita jalankan di background agar respons cepat
    generateVerificationToken(newUser.email).catch(console.error);

    return NextResponse.json(
      {
        status: 'success',
        data: {
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            createdAt: newUser.createdAt,
          },
        },
        message: 'Registrasi berhasil dilakukan. Silakan periksa email Anda.',
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Internal server error during registration',
      },
      { status: 500 }
    );
  }
}
