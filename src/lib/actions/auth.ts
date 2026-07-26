"use server";

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { isRateLimited } from "@/lib/rate-limit";

const LOGIN_RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const LOGIN_MAX_ATTEMPTS = 10;



const ROLE_REDIRECT: Record<string, string> = {
  ADMIN:        "/super-admin",
  SUPER_ADMIN:  "/super-admin",
  BUYER:        "/dashboard",
  OWNER:        "/owner/properties",
  SURVEYOR:     "/surveyor/dashboard",
};

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  const email = formData.get("email") as string;

  const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(`login:${ip}:${email}`, LOGIN_MAX_ATTEMPTS, LOGIN_RATE_LIMIT_WINDOW)) {
    return "Terlalu banyak percobaan login. Silakan coba lagi dalam beberapa saat.";
  }

  try {
    await signIn("credentials", {
      email,
      password: formData.get("password"),
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Email atau password salah.";
        default:
          return "Terjadi kesalahan saat login.";
      }
    }
    throw error;
  }

  // Login berhasil — cari role user lalu redirect
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    const dest = ROLE_REDIRECT[user?.role ?? ""] ?? "/";
    redirect(dest);
  } catch {
    redirect("/");
  }
}
