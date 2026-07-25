import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SignJWT, jwtVerify } from "jose";
import prisma from "@/lib/prisma";
import { verifyPassword } from "@/lib/hash";
import { authConfig } from "../../auth.config";

const ACCESS_TOKEN_TTL = 15 * 60; // 15 minutes
const REFRESH_TOKEN_TTL = 7 * 24 * 60 * 60; // 7 days

export const {
  handlers,
  signIn,
  signOut,
  auth
} = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
    maxAge: REFRESH_TOKEN_TTL, 
  },
  jwt: {
    maxAge: ACCESS_TOKEN_TTL,
    async encode({ secret, token, maxAge }) {
      const encodedToken = await new SignJWT(token as any)
        .setProtectedHeader({ alg: "HS512" })
        .setIssuedAt()
        .setExpirationTime(Math.floor(Date.now() / 1000) + (maxAge || ACCESS_TOKEN_TTL))
        .sign(new TextEncoder().encode(secret as string));
      return encodedToken;
    },
    async decode({ secret, token }) {
      if (!token) return null;
      try {
        const { payload } = await jwtVerify(
          token,
          new TextEncoder().encode(secret as string),
          { algorithms: ["HS512"] }
        );
        return payload as any as import("next-auth/jwt").JWT;
      } catch (error) {
        return null;
      }
    }
  },
  providers: [
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

        try {
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.passwordHash) {
            return null;
          }

          const passwordsMatch = await verifyPassword(user.passwordHash, password);

          if (!passwordsMatch) {
            return null;
          }

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

