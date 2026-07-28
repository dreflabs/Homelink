"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, SendHorizontal, Loader2, ArrowLeft, KeyRound, MailCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPassword } from "@/actions/auth";
import { useTranslations } from "next-intl";

export default function ForgotPasswordPage() {
  const t = useTranslations("Auth.ForgotPassword");
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const forgotPasswordSchema = z.object({
    identifier: z.string().min(3, t("identifierMin")),
  });
  type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { identifier: "" },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setErrorMsg(null);
    try {
      const res = await forgotPassword(data.identifier);
      if (!res.success) {
        setErrorMsg(res.message);
      } else {
        setSubmitted(true);
      }
    } catch {
      setErrorMsg(t("errorOccurred"));
    }
  };

  return (
    <div className="flex min-h-screen relative overflow-hidden bg-slate-950">
      <Image src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop" alt="Background" fill className="object-cover pointer-events-none -z-0" priority />
      {/* Dark Overlay for the entire background */}
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px]" />

      <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-7xl mx-auto min-h-screen">
        
        {/* ─── Left: Immersive Hero Panel ─── */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 lg:p-20 text-white">
          <div>
            <Logo size="lg" variant="light" />
          </div>
          
          <div className="mb-20">
            <h1 className="text-4xl lg:text-5xl leading-tight font-semibold tracking-tight mb-6">
              {t("title")}
            </h1>
            <p className="text-lg text-slate-200/90 font-medium max-w-md leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        </div>

        {/* ─── Right: Floating Glass Auth Card ─── */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-in-out">
          <div className="w-full max-w-md bg-white/85 backdrop-blur-xl border border-white/40 shadow-[0_24px_64px_rgb(0,0,0,0.16)] rounded-3xl p-6 sm:p-8 lg:p-12 relative overflow-hidden">
            
            <div className="absolute top-6 left-6 lg:top-8 lg:left-8">
              <Link
                href="/login"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
                title={t("backToLogin")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </div>

            <div className="mt-12 lg:mt-8">
              {!submitted ? (
                <>
                  {/* Mobile Logo (Hidden on Desktop) */}
                  <div className="lg:hidden flex justify-center mb-6">
                    <Logo size="md" variant="dark" />
                  </div>

                  {/* Header */}
                  <div className="mb-6 lg:mb-8 text-center">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-slate-100 mx-auto flex items-center justify-center mb-4 lg:mb-6">
                      <KeyRound className="h-6 w-6 lg:h-7 lg:w-7 text-slate-800" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl leading-snug font-semibold tracking-tight text-slate-900 mb-2">
                      {t("formTitle")}
                    </h2>
                    <p className="text-sm text-slate-500">
                      {t("formDesc")}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Identifier */}
                    <div className="space-y-1.5">
                      <Label htmlFor="identifier" className="text-xs font-semibold text-slate-600 uppercase tracking-widest ml-1">
                        {t("identifierLabel")}
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" aria-hidden="true" />
                        <Input
                          id="identifier"
                          type="text"
                          placeholder={t("identifierPlaceholder")}
                          className="h-12 pl-11 bg-white/60 border-slate-200/60 rounded-xl focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 transition-all text-slate-900 placeholder:text-slate-400"
                          {...register("identifier")}
                          aria-invalid={!!errors.identifier}
                        />
                      </div>
                      {errors.identifier && (
                        <p className="text-sm font-medium text-red-600 mt-1 ml-1">{errors.identifier.message}</p>
                      )}
                    </div>

                    {/* Error */}
                    {errorMsg && (
                      <div className="flex items-start gap-3 text-sm text-red-700 bg-red-50/80 p-4 rounded-xl border border-red-200/50">
                        <p>{errorMsg}</p>
                      </div>
                    )}

                    {/* Submit */}
                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 mt-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t("sending")}</>
                      ) : (
                        <><SendHorizontal className="mr-2 h-4 w-4" />{t("sendInstructions")}</>
                      )}
                    </Button>
                  </form>
                </>
              ) : (
                /* Success state */
                <div className="animate-in fade-in zoom-in-95 duration-300 text-center mt-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-8 mx-auto shadow-inner">
                    <MailCheck className="h-8 w-8 text-emerald-600" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl lg:text-3xl leading-snug font-semibold tracking-tight text-slate-900 mb-3">
                    {t("successTitle")}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8">
                    {t("successDesc")}
                  </p>

                  <div className="bg-white border border-slate-200 rounded-xl p-5 mb-8 shadow-sm">
                    <p className="text-sm text-slate-600 leading-relaxed text-left">
                      <span className="font-semibold text-slate-900 block mb-1">{t("didNotReceive")}</span>
                      {t("checkSpam")}
                    </p>
                  </div>

                  <Button asChild className="w-full h-12 text-base font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5">
                    <Link href="/login">{t("backToLoginPage")}</Link>
                  </Button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
