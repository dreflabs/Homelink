import { Resend } from 'resend';
import { routing } from '@/i18n/routing';

const apiKey = process.env.RESEND_API_KEY;

// Mock Resend if key is dummy or not provided
export const resend = apiKey && apiKey !== 'dummy' && apiKey.startsWith('re_')
  ? new Resend(apiKey)
  : null;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/${routing.defaultLocale}/verify-email?token=${token}`;

  if (!resend) {
    console.log(`[Mock Email] Verification email to ${email}. Link: ${confirmLink}`);
    return;
  }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Use configured verified domain in production
      to: email,
      subject: 'Confirm your email',
      html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`
    });
  } catch (error) {
    console.error('Failed to send verification email:', error);
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/${routing.defaultLocale}/reset-password?token=${token}`;

  if (!resend) {
    console.log(`[Mock Email] Password reset email to ${email}. Link: ${resetLink}`);
    return;
  }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Use configured verified domain in production
      to: email,
      subject: 'Reset your password',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    });
  } catch (error) {
    console.error('Failed to send password reset email:', error);
  }
};
