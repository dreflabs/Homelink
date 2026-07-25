import { NextResponse } from 'next/server';
import { hashPassword } from '@/lib/hash';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, role, password } = body;

    // TODO: Add Zod validation here later
    if (!name || !email || !role || !password) {
      return NextResponse.json(
        {
          status: 'fail',
          message: 'Missing required fields: name, email, role, password',
        },
        { status: 400 }
      );
    }

    // Hashed with Argon2
    const passwordHash = await hashPassword(password);

    // MOCK RESPONSE: Before Prisma database insertion
    const mockUser = {
      id: `uuid-${Date.now()}`,
      name,
      email,
      role,
      passwordHash, // Terenkripsi
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        status: 'success',
        data: {
          user: mockUser,
        },
        message: 'Registrasi berhasil dilakukan.',
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
