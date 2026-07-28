"use client";

import { useState, useTransition } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldAlert, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { authenticate } from "@/lib/actions/auth";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";

type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

interface LoginCardProps {
  inModal?: boolean;
}

export function LoginCard({ inModal = false }: LoginCardProps) {
  const params = useParams();
  const locale = (params.locale as string) || "id";
  const t = useTranslations("Auth.login");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const loginSchema = z.object({
    email: z.string().min(1, t("emailRequired")).email(t("emailInvalid")),
    password: z.string().min(1, t("passwordRequired")),
    rememberMe: z.boolean(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const onSubmit = (data: LoginFormValues) => {
    setErrorMessage(null);
    startTransition(async () => {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (data.rememberMe) {
        formData.append("rememberMe", "on");
      }

      const res = await authenticate(undefined, formData);
      if (res) {
        setErrorMessage(res);
      }
    });
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    signIn("google");
  };

  return (
    <div
      className={cn(
        "w-full transition-all duration-300 relative overflow-hidden",
        inModal
          ? "bg-white p-5 sm:p-6 lg:p-7 rounded-3xl"
          : "max-w-md bg-white/85 backdrop-blur-xl border border-white/40 shadow-[0_24px_64px_rgb(0,0,0,0.16)] rounded-3xl p-6 sm:p-8 lg:p-12"
      )}
    >
      {/* Logo (Shown in modal or mobile standalone) */}
      <div className={cn("flex justify-center", inModal ? "mb-3 sm:mb-4" : "mb-6 lg:mb-8 lg:hidden")}>
        <Logo size={inModal ? "sm" : "md"} variant="dark" />
      </div>

      {/* Header */}
      <div className={inModal ? "mb-4 sm:mb-5 text-center" : "mb-6 lg:mb-8 text-center"}>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mb-1">
          {t("welcomeBack")}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">{t("continueJourney")}</p>
      </div>

      {/* SSO Priority */}
      <div className="space-y-3 mb-6">
        <Button
          type="button"
          variant="outline"
          className="w-full h-12 rounded-xl bg-white/50 hover:bg-white border-slate-200/60 text-slate-700 shadow-sm font-medium transition-all duration-200"
          onClick={handleGoogleLogin}
          disabled={isPending || isGoogleLoading}
        >
          {isGoogleLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-slate-500" />
          ) : (
            <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
              <path fill="none" d="M0 0h48v48H0z" />
            </svg>
          )}
          {t("continueWithGoogle")}
        </Button>
      </div>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-200/80" />
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          {t("orWithEmail")}
        </span>
        <div className="h-px flex-1 bg-slate-200/80" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-semibold text-slate-600 uppercase tracking-widest ml-1">
            {t("emailAddress")}
          </Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" aria-hidden="true" />
            <Input
              id="email"
              type="email"
              placeholder="nama@email.com"
              className="h-12 pl-11 bg-white/60 border border-slate-200/60 rounded-xl focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 transition-all text-slate-900 placeholder:text-slate-400"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
          </div>
          {errors.email && (
            <p className="text-sm font-medium text-red-600 mt-1 ml-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between ml-1">
            <Label htmlFor="password" className="text-xs font-semibold text-slate-600 uppercase tracking-widest">
              {t("password")}
            </Label>
            <a href={`/${locale}/forgot-password`} className="text-sm text-slate-500 hover:text-slate-800 font-medium transition-colors">
              {t("forgotPassword")}
            </a>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" aria-hidden="true" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="h-12 pl-11 pr-12 bg-white/60 border border-slate-200/60 rounded-xl focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 transition-all text-slate-900 placeholder:text-slate-400"
              {...register("password")}
              aria-invalid={!!errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label={showPassword ? t("hidePassword") : t("showPassword")}
            >
              {showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm font-medium text-red-600 mt-1 ml-1">{errors.password.message}</p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center space-x-2 ml-1">
          <input
            type="checkbox"
            id="rememberMe"
            className="h-4 w-4 rounded border-slate-300 text-slate-800 focus:ring-slate-800 accent-slate-800"
            {...register("rememberMe")}
          />
          <Label htmlFor="rememberMe" className="text-sm text-slate-600 font-medium cursor-pointer">
            {t("rememberMe")}
          </Label>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="flex items-start gap-3 text-sm text-red-700 bg-red-50/80 p-4 rounded-xl border border-red-200/50">
            <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          className="w-full h-11 sm:h-12 text-base font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-md shadow-slate-900/15 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 mt-1 sm:mt-2"
          disabled={isPending || isGoogleLoading}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              {t("processing")}
            </>
          ) : (
            t("loginToAccount")
          )}
        </Button>
      </form>

      <p className="text-center text-xs sm:text-sm text-slate-500 mt-5 sm:mt-6">
        {t("noAccount")}{" "}
        {inModal ? (
          <Link href="/register" className="font-semibold text-slate-900 hover:underline transition-all">
            {t("startJourney")}
          </Link>
        ) : (
          <a href={`/${locale}/register`} className="font-semibold text-slate-900 hover:underline transition-all">
            {t("startJourney")}
          </a>
        )}
      </p>
    </div>
  );
}
