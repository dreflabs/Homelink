import { NextResponse } from 'next/server';
import { z } from 'zod';
import { AuthService } from '@/services/auth.service';

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

const RegisterSchema = z.object({
  name: z.string().min(2, 'Nama harus minimal 2 karakter'),
  email: z.string().email('Alamat email tidak valid'),
  phone: z.string().regex(/^(\+62|0)[0-9]{9,13}$/, 'Nomor telepon tidak valid'),
  role: z.enum(['BUYER', 'OWNER', 'SURVEYOR']),
  password: z.string().regex(passwordRegex, 'Kata sandi minimal 8 karakter, 1 huruf besar, dan 1 angka'),
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: 'Anda harus menyetujui Syarat dan Ketentuan',
  }),
});

// Simple in-memory rate limiter (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    
    // Rate Limiting Logic
    const now = Date.now();
    const limit = rateLimitMap.get(ip) || { count: 0, lastReset: now };
    
    if (now - limit.lastReset > RATE_LIMIT_WINDOW) {
      limit.count = 0;
      limit.lastReset = now;
    }
    
    if (limit.count >= MAX_REQUESTS) {
      return NextResponse.json(
        { status: 'error', message: 'Terlalu banyak percobaan pendaftaran. Silakan coba lagi nanti.' },
        { status: 429 }
      );
    }
    
    limit.count++;
    rateLimitMap.set(ip, limit);

    const body = await request.json();
    const validatedData = RegisterSchema.safeParse(body);
    
    if (!validatedData.success) {
      return NextResponse.json(
        {
          status: 'fail',
          message: 'Data input tidak valid',
          errors: validatedData.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const newUser = await AuthService.registerUser(validatedData.data);

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
  } catch (error: any) {
    if (error.message === 'Email sudah terdaftar.' || error.message === 'Nomor telepon sudah terdaftar.') {
      return NextResponse.json(
        {
          status: 'fail',
          message: error.message,
          errors: {
            [error.message.includes('Email') ? 'email' : 'phone']: [error.message],
          },
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        status: 'error',
        message: 'Internal server error during registration',
      },
      { status: 500 }
    );
  }
}
