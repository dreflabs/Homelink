import { Resend } from 'resend';
import { routing } from '@/i18n/routing';

const apiKey = process.env.RESEND_API_KEY;

// Mock Resend if key is dummy or not provided
export const resend = apiKey && apiKey !== 'dummy' && apiKey.startsWith('re_')
  ? new Resend(apiKey)
  : null;

export const sendVerificationEmail = async (email: string, token: string, locale: string = routing.defaultLocale) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/${locale}/verify-email?token=${token}`;
  const isEn = locale === 'en';
  const subject = isEn ? 'Confirm your email address' : 'Konfirmasi alamat email Anda';
  const html = isEn 
    ? `<p>Click <a href="${confirmLink}">here</a> to confirm your email address.</p>`
    : `<p>Klik <a href="${confirmLink}">di sini</a> untuk mengonfirmasi alamat email Anda.</p>`;

  if (!resend) {
    console.log(`[Mock Email - ${locale}] Verification email to ${email}. Link: ${confirmLink}`);
    return;
  }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Use configured verified domain in production
      to: email,
      subject,
      html,
    });
  } catch (error) {
    console.error('Failed to send verification email:', error);
  }
};

export const sendPasswordResetEmail = async (email: string, token: string, locale: string = routing.defaultLocale) => {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/${locale}/reset-password?token=${token}`;
  const isEn = locale === 'en';
  const subject = isEn ? 'Reset your password' : 'Atur ulang kata sandi Anda';
  const html = isEn
    ? `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    : `<p>Klik <a href="${resetLink}">di sini</a> untuk mengatur ulang kata sandi Anda.</p>`;

  if (!resend) {
    console.log(`[Mock Email - ${locale}] Password reset email to ${email}. Link: ${resetLink}`);
    return;
  }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Use configured verified domain in production
      to: email,
      subject,
      html,
    });
  } catch (error) {
    console.error('Failed to send password reset email:', error);
  }
};

