import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { SignJWT, jwtVerify } from "jose";
import prisma from "@/lib/prisma";
import { verifyPassword } from "@/lib/hash";
import { authConfig } from "../../auth.config";

const ACCESS_TOKEN_TTL = 15 * 60; // 15 minutes
const REFRESH_TOKEN_TTL = 7 * 24 * 60 * 60; // 7 days

// Simple in-memory rate limiter for login attempts (temporary mitigation)
const loginAttempts = new Map<string, { count: number, resetAt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

export const {
  handlers,
  signIn,
  signOut,
  auth
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: REFRESH_TOKEN_TTL,
  },
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      if (account?.provider === "google" && user?.id) {
        await prisma.user.updateMany({
          where: { id: user.id, isEmailVerified: false },
          data: { isEmailVerified: true, emailVerified: new Date() },
        });
      }
      return true;
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        // Rate Limiting check
        const now = Date.now();
        const attempt = loginAttempts.get(email);
        if (attempt) {
          if (now > attempt.resetAt) {
            // Lockout expired
            loginAttempts.delete(email);
          } else if (attempt.count >= MAX_ATTEMPTS) {
            console.warn(`[SECURITY] Rate limit exceeded for email: ${email}`);
            throw new Error("Terlalu banyak percobaan. Silakan coba lagi dalam 15 menit.");
          }
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.passwordHash || user.isDeleted) {
            // Increment failed attempt
            const current = loginAttempts.get(email) || { count: 0, resetAt: Date.now() + LOCKOUT_MS };
            loginAttempts.set(email, { count: current.count + 1, resetAt: current.resetAt });
            return null;
          }

          const passwordsMatch = await verifyPassword(user.passwordHash, password);

          if (!passwordsMatch) {
            // Increment failed attempt
            const current = loginAttempts.get(email) || { count: 0, resetAt: Date.now() + LOCKOUT_MS };
            loginAttempts.set(email, { count: current.count + 1, resetAt: current.resetAt });
            return null;
          }

          if (!user.isEmailVerified) {
            return null;
          }

          // Successful login, clear attempts
          loginAttempts.delete(email);

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ]
});

