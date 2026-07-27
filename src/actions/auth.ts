'use server';

import prisma from "@/lib/prisma";
import { sendPasswordResetEmail, sendVerificationEmail } from '@/lib/email';
import * as argon2 from 'argon2';
import crypto from 'crypto';
import { headers } from 'next/headers';
import { isRateLimited } from '@/lib/rate-limit';

const FORGOT_PASSWORD_RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const FORGOT_PASSWORD_MAX_ATTEMPTS = 5;

export async function forgotPassword(email: string) {
  const ip = (await headers()).get('x-forwarded-for') ?? 'unknown';
  if (isRateLimited(`forgot-password:${ip}`, FORGOT_PASSWORD_MAX_ATTEMPTS, FORGOT_PASSWORD_RATE_LIMIT_WINDOW)) {
    // Same generic message as the success path, so rate limiting doesn't leak account existence either
    return { success: true, message: 'Jika alamat email tersebut terdaftar dalam database kami, kami akan mengirimkan email untuk mengatur ulang kata sandi Anda.' };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || user.isDeleted) {
    // For security reasons, don't reveal that the user does not exist or is deleted
    return { success: true, message: 'Jika alamat email tersebut terdaftar dalam database kami, kami akan mengirimkan email untuk mengatur ulang kata sandi Anda.' };
  }

  const rawToken = crypto.randomUUID();
  const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
  const expires = new Date(Date.now() + 3600 * 1000); // 1 hour from now

  // Clear existing tokens for this user to ensure only latest is valid
  await prisma.passwordResetToken.deleteMany({
    where: { identifier: email },
  });

  await prisma.passwordResetToken.create({
    data: {
      identifier: email,
      token: hashedToken,
      expires,
    },
  });

  await sendPasswordResetEmail(user.email, rawToken);

  return { success: true, message: 'Jika alamat email tersebut terdaftar dalam database kami, kami akan mengirimkan email untuk mengatur ulang kata sandi Anda.' };
}

export async function resetPassword(token: string, newPassword: string) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(newPassword)) {
    return { error: 'Kata sandi harus minimal 8 karakter, mengandung setidaknya satu huruf besar, satu huruf kecil, dan satu angka.' };
  }

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const existingToken = await prisma.passwordResetToken.findUnique({
    where: { token: hashedToken },
  });

  if (!existingToken) {
    return { error: 'Token tidak valid!' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: 'Token telah kedaluwarsa!' };
  }

  const user = await prisma.user.findUnique({
    where: { email: existingToken.identifier },
  });

  if (!user || user.isDeleted) {
    return { error: 'Pengguna tidak ditemukan atau akun telah dinonaktifkan!' };
  }

  const passwordHash = await argon2.hash(newPassword);

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash },
  });

  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: true, message: 'Kata sandi berhasil diperbarui!' };
}

export async function verifyEmail(token: string) {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const existingToken = await prisma.verificationToken.findUnique({
    where: { token: hashedToken },
  });

  if (!existingToken) {
    return { error: 'Token tidak ditemukan!' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: 'Token telah kedaluwarsa!' };
  }

  const user = await prisma.user.findUnique({
    where: { email: existingToken.identifier },
  });

  if (!user || user.isDeleted) {
    return { error: 'Pengguna tidak ditemukan atau akun telah dinonaktifkan!' };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      isEmailVerified: true,
      email: existingToken.identifier,
    },
  });

  await prisma.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: true, message: 'Email berhasil diverifikasi!' };
}

export async function resendVerificationEmail(email: string) {
  const ip = (await headers()).get('x-forwarded-for') ?? 'unknown';
  if (isRateLimited(`resend-verification:${ip}`, FORGOT_PASSWORD_MAX_ATTEMPTS, FORGOT_PASSWORD_RATE_LIMIT_WINDOW)) {
    return { success: true, message: 'Jika email tersebut terdaftar, kami telah mengirimkan tautan verifikasi baru.' };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || user.isDeleted) {
    // For security reasons, don't reveal that the user does not exist or is deleted
    return { success: true, message: 'Jika email tersebut terdaftar, kami telah mengirimkan tautan verifikasi baru.' };
  }

  if (user.isEmailVerified) {
    return { success: true, message: 'Email ini sudah terverifikasi. Silakan masuk ke akun Anda.' };
  }

  await generateVerificationToken(user.email);

  return { success: true, message: 'Jika email tersebut terdaftar, kami telah mengirimkan tautan verifikasi baru.' };
}

// Function to generate and send a verification email when user registers (optional helper)
export async function generateVerificationToken(email: string) {
  const rawToken = crypto.randomUUID();
  const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
  const expires = new Date(Date.now() + 3600 * 1000); // 1 hour

  await prisma.verificationToken.deleteMany({
    where: { identifier: email },
  });

  const verificationToken = await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: hashedToken,
      expires,
    },
  });

  await sendVerificationEmail(email, rawToken);

  return verificationToken;
}
