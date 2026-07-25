'use server';

import prisma from "@/lib/prisma";
import { sendPasswordResetEmail, sendVerificationEmail } from '@/lib/email';
import * as argon2 from 'argon2';
import crypto from 'crypto';



export async function forgotPassword(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    // For security reasons, don't reveal that the user does not exist
    return { success: true, message: 'If that email address is in our database, we will send you an email to reset your password.' };
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

  return { success: true, message: 'If that email address is in our database, we will send you an email to reset your password.' };
}

export async function resetPassword(token: string, newPassword: string) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(newPassword)) {
    return { error: 'Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, and one number.' };
  }

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const existingToken = await prisma.passwordResetToken.findUnique({
    where: { token: hashedToken },
  });

  if (!existingToken) {
    return { error: 'Invalid token!' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: 'Token has expired!' };
  }

  const user = await prisma.user.findUnique({
    where: { email: existingToken.identifier },
  });

  if (!user) {
    return { error: 'User does not exist!' };
  }

  const passwordHash = await argon2.hash(newPassword);

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash },
  });

  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: true, message: 'Password updated successfully!' };
}

export async function verifyEmail(token: string) {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const existingToken = await prisma.verificationToken.findUnique({
    where: { token: hashedToken },
  });

  if (!existingToken) {
    return { error: 'Token does not exist!' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: 'Token has expired!' };
  }

  const user = await prisma.user.findUnique({
    where: { email: existingToken.identifier },
  });

  if (!user) {
    return { error: 'User does not exist!' };
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

  return { success: true, message: 'Email verified successfully!' };
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
