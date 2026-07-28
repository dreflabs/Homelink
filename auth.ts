import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { authConfig } from './auth.config';
import prisma from '@/lib/prisma';
import * as argon2 from 'argon2';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = (credentials.email as string).toLowerCase().trim();
        const password = credentials.password as string;

        console.log(`[AUTH DEBUG] Attempting login for email: "${email}" with password length: ${password?.length}`);

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.passwordHash) {
          console.log(`[AUTH DEBUG] User not found or no password hash for: ${email}`);
          return null;
        }

        try {
          const passwordsMatch = await argon2.verify(user.passwordHash, password);
          console.log(`[AUTH DEBUG] passwordsMatch: ${passwordsMatch}`);

          if (passwordsMatch) {
            return user;
          }
        } catch (err) {
          console.error('[AUTH DEBUG] Error during password verification:', err);
        }

        return null;
      },
    }),
  ],
});
