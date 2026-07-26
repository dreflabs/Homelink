"use client";

import { useState, useActionState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldAlert, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { authenticate } from "@/lib/actions/auth";
import { signIn } from "next-auth/react";
import { AuthShowcase } from "@/components/auth/AuthShowcase";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations("Auth.login");
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="flex min-h-screen">
      {/* ─── Left: Form Panel ─── */}
      <div className="w-full lg:w-1/2 flex flex-col min-h-screen bg-white">
        {/* Top bar with logo */}
        <div className="flex items-center justify-between px-8 sm:px-12 py-6 border-b border-slate-100">
          <Link href="/">
            <Image
              src="/LOGO_UTAMA_HOMELINK.png"
              alt="HomeLink"
              width={130}
              height={38}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>
          <p className="text-sm text-slate-500">
            Belum punya akun?{" "}
            <Link href="/register" className="font-semibold text-blue-700 hover:text-blue-800 transition-colors">
              Daftar
            </Link>
          </p>
        </div>

        {/* Form */}
        <div className="flex-1 flex items-center justify-center px-8 sm:px-12 py-12">
          <div className="w-full max-w-md">
            {/* Heading */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
                {t("title")}
              </h1>
              <p className="text-slate-500 text-base">
                {t("subtitle")}
              </p>
            </div>

            <form action={formAction} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                  {t("email")}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={t("email_placeholder")}
                    className="h-12 pl-11 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                    {t("password")}
                  </Label>
                  <Link href="/forgot-password" className="text-sm text-blue-700 hover:text-blue-800 font-medium transition-colors">
                    {t("forgot_password")}
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder={t("password_placeholder")}
                    className="h-12 pl-11 pr-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {errorMessage && (
                <div className="flex items-start gap-3 text-sm text-red-700 bg-red-50 p-4 rounded-xl border border-red-200">
                  <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                  <p>{errorMessage}</p>
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold bg-blue-700 hover:bg-blue-800 rounded-xl shadow-sm transition-all mt-2"
                disabled={isPending || isGoogleLoading}
              >
                {isPending ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t("processing")}</>
                ) : (
                  t("submit")
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">{t("or")}</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Google */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 rounded-xl bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm font-medium"
              onClick={handleGoogleLogin}
              disabled={isPending || isGoogleLoading}
            >
              {isGoogleLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin text-slate-500" />
              ) : (
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              )}
              {t("google")}
            </Button>
          </div>
        </div>
      </div>

      {/* ─── Right: Showcase Panel ─── */}
      <AuthShowcase
        quote={t("showcase.quote")}
        author={t("showcase.author")}
        role={t("showcase.role")}
      />
    </div>
  );
}
