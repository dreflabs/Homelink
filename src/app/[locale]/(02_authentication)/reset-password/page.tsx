"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Eye, EyeOff, ShieldCheck, XCircle, Loader2, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/actions/auth";
import { AuthShowcase } from "@/components/auth/AuthShowcase";
import { useTranslations } from "next-intl";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const t = useTranslations("Auth.ResetPassword");
  
  const resetPasswordSchema = z
    .object({
      token: z.string().min(1),
      password: z
        .string()
        .min(8, t("passwordMin"))
        .regex(/[A-Z]/, t("passwordUppercase"))
        .regex(/[0-9]/, t("passwordNumber"))
        .refine(
          (pw) => !["password123", "12345678"].includes(pw.toLowerCase()),
          t("passwordCommon")
        ),
      confirmPassword: z.string(),
    })
    .refine((d) => d.password === d.confirmPassword, {
      message: t("passwordMismatch"),
      path: ["confirmPassword"],
    });

  type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

  const tokenStatus: "valid" | "invalid" = token ? "valid" : "invalid";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setErrorMsg(null);
    try {
      const res = await resetPassword(data.token, data.password);
      if (res.error) {
        setErrorMsg(res.error);
      } else {
        setIsSuccess(true);
      }
    } catch (e) {
      setErrorMsg(t("errorOccurred"));
    }
  };

  const calculateStrength = (pwd: string) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score += 25;
    if (/[A-Z]/.test(pwd)) score += 25;
    if (/[0-9]/.test(pwd)) score += 25;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 25;
    return score;
  };

  const strength = calculateStrength(passwordValue);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Right Showcase Area (Swapped position to keep layout dynamic) */}
      <AuthShowcase 
        quote="Keamanan data dan privasi Anda adalah prioritas utama kami."
        author="HomeLink Security"
      />

      {/* Left Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 md:px-24 xl:px-32 relative">
        
        {/* Brand Header */}
        <div className="absolute top-8 right-8 sm:right-12 md:right-24 xl:right-32 lg:left-8 lg:right-auto">
          <Link href="/">
            <Image
              src="/LOGO_UTAMA_HOMELINK.png"
              alt="HomeLink Logo"
              width={130}
              height={38}
              className="h-8 w-auto object-contain"
            />
          </Link>
        </div>

        <div className="w-full max-w-md mx-auto mt-16 lg:mt-0">
          
          <Link href="/login" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("backToLogin")}
          </Link>

          {tokenStatus === "invalid" ? (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-8">
                <XCircle className="h-8 w-8 text-destructive" />
              </div>
              <div className="space-y-4 mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">{t("invalidLinkTitle")}</h1>
                <p className="text-base text-slate-500 leading-relaxed">
                  {t("invalidLinkDesc")}
                </p>
              </div>
              <Button asChild className="w-full h-12 text-base shadow-sm" variant="default">
                <Link href="/forgot-password">{t("requestNewLink")}</Link>
              </Button>
            </div>
          ) : isSuccess ? (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-8">
                <ShieldCheck className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="space-y-4 mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">{t("successTitle")}</h1>
                <p className="text-base text-slate-500 leading-relaxed">
                  {t("successDesc")}
                </p>
              </div>
              <Button asChild className="w-full h-12 text-base shadow-sm" variant="default">
                <Link href="/login">{t("loginToAccount")}</Link>
              </Button>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-3 mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                  {t("formTitle")}
                </h1>
                <p className="text-base text-slate-500 leading-relaxed">
                  {t("formDesc")}
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <input type="hidden" {...register("token")} value={searchParams.get("token") || ""} />

                <div className="space-y-2.5">
                  <Label htmlFor="password" className="font-medium text-slate-700 uppercase tracking-wider text-xs">
                    {t("newPasswordLabel")}
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                      <Lock className="h-5 w-5" />
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t("newPasswordPlaceholder")}
                      className="h-12 pl-11 pr-11 bg-white border-slate-200 focus-visible:ring-primary/20 focus-visible:border-primary transition-all shadow-sm"
                      {...register("password")}
                      aria-invalid={!!errors.password}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  
                  {/* Strength Indicator */}
                  <div className="mt-3 flex h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full transition-all duration-500 ease-out ${
                        strength < 50
                          ? "bg-destructive"
                          : strength < 75
                          ? "bg-amber-400"
                          : strength < 100
                          ? "bg-emerald-400"
                          : "bg-emerald-600"
                      }`}
                      style={{ width: `${Math.max(10, strength)}%` }}
                    />
                  </div>

                  {errors.password && (
                    <p className="text-sm font-medium text-destructive mt-1">{errors.password.message}</p>
                  )}
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="confirmPassword" className="font-medium text-slate-700 uppercase tracking-wider text-xs">
                    {t("confirmPasswordLabel")}
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                      <Lock className="h-5 w-5" />
                    </div>
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={t("confirmPasswordPlaceholder")}
                      className="h-12 pl-11 pr-11 bg-white border-slate-200 focus-visible:ring-primary/20 focus-visible:border-primary transition-all shadow-sm"
                      {...register("confirmPassword")}
                      aria-invalid={!!errors.confirmPassword}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm font-medium text-destructive mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-3 text-sm text-destructive bg-destructive/10 p-4 rounded-xl border border-destructive/20 backdrop-blur-sm animate-in fade-in slide-in-from-top-2">
                    <p>{errorMsg}</p>
                  </div>
                )}

                <Button type="submit" className="w-full h-12 text-base shadow-md hover:shadow-lg mt-2" disabled={isSubmitting || tokenStatus !== "valid"}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {t("saving")}
                    </>
                  ) : (
                    t("saveNewPassword")
                  )}
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  const t = useTranslations("Auth.ResetPassword");
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-slate-500 font-medium">{t("loading")}</p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
