"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, Mail, MailCheck, MailX, RotateCw, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { verifyEmail, resendVerificationEmail } from "@/actions/auth";
import { Logo } from "@/components/shared/Logo";

type VerificationStatus = "awaiting_email" | "verifying" | "success" | "invalid" | "expired" | "already_verified";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations("Auth.VerifyEmail");
  
  const [status, setStatus] = useState<VerificationStatus>("verifying");
  const [isResending, setIsResending] = useState(false);
  const [resendEmail, setResendEmail] = useState("");
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("awaiting_email");
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await verifyEmail(token);
        if (res.error) {
          if (res.error.includes("expired")) {
            setStatus("expired");
          } else {
            setStatus("invalid");
          }
        } else {
          setStatus("success");
        }
      } catch (e) {
        setStatus("invalid");
      }
    };

    verifyToken();
  }, [searchParams]);

  const handleResend = async () => {
    if (!resendEmail) {
      setResendMessage(t("enterEmailFirst"));
      return;
    }
    setIsResending(true);
    setResendMessage(null);
    try {
      const res = await resendVerificationEmail(resendEmail);
      setResendMessage(res.message);
    } catch (e) {
      setResendMessage(t("errorOccurred"));
    } finally {
      setIsResending(false);
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
            
            {/* Mobile Logo (Hidden on Desktop) */}
            <div className="lg:hidden flex justify-center mb-8">
              <Logo size="md" variant="dark" />
            </div>

            {status === "verifying" && (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-slate-500 font-medium">{t("verifying")}</p>
              </div>
            )}

            {status === "awaiting_email" && (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-8 mx-auto">
                  <Mail className="h-8 w-8 text-slate-800" />
                </div>
                <div className="space-y-4 mb-8 text-center">
                  <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">{t("checkInbox")}</h1>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {t("checkInboxDesc")}
                  </p>
                </div>
                <Button asChild className="w-full h-12 text-base font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-xl transition-all duration-200">
                  <Link href="/login">{t("backToLogin")}</Link>
                </Button>
              </div>
            )}

            {(status === "success" || status === "already_verified") && (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mb-8 mx-auto shadow-inner">
                  <MailCheck className="h-8 w-8 text-emerald-600" />
                </div>
                <div className="space-y-4 mb-8 text-center">
                  <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
                    {status === "already_verified" ? t("alreadyVerified") : t("success")}
                  </h1>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {status === "already_verified" 
                      ? t("alreadyVerifiedDesc")
                      : t("successDesc")}
                  </p>
                </div>
                <Button asChild className="w-full h-12 text-base font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-xl transition-all duration-200">
                  <Link href="/login">
                    {t("continueToDashboard")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}

            {(status === "invalid" || status === "expired") && (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mb-8 mx-auto shadow-inner">
                  <MailX className="h-8 w-8 text-red-600" />
                </div>
                <div className="space-y-4 mb-8 text-center">
                  <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
                    {status === "expired" ? t("linkExpired") : t("invalidLink")}
                  </h1>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {status === "expired"
                      ? t("linkExpiredDesc")
                      : t("invalidLinkDesc")}
                  </p>
                </div>
                
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="resendEmail" className="text-xs font-semibold text-slate-600 uppercase tracking-widest ml-1">
                      {t("emailLabel")}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="resendEmail"
                        type="email"
                        placeholder={t("emailPlaceholder")}
                        value={resendEmail}
                        onChange={(e) => setResendEmail(e.target.value)}
                        className="h-12 pl-11 bg-white/60 border-slate-200/60 rounded-xl focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 transition-all text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                  
                  {resendMessage && (
                    <div className="flex items-start gap-3 text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <p>{resendMessage}</p>
                    </div>
                  )}

                  <Button
                    className="w-full h-12 text-base font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-xl transition-all duration-200"
                    onClick={handleResend}
                    disabled={isResending}
                  >
                    {isResending ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t("resending")}</>
                    ) : (
                      <><RotateCw className="mr-2 h-4 w-4" />{t("sendNewLink")}</>
                    )}
                  </Button>
                  
                  <Button asChild className="w-full h-12 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors" variant="ghost">
                    <Link href="/login">{t("cancelAndBack")}</Link>
                  </Button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  const t = useTranslations("Auth.VerifyEmail");
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-slate-500 font-medium">{t("loading")}</p>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VerifyEmailContent />
    </Suspense>
  );
}

