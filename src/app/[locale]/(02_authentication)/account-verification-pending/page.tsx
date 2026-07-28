"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Hourglass, Mail, Phone, LogOut, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

// Mock user session status
const mockPendingSteps = {
  emailVerified: false,
  phoneVerified: false,
};

export default function AccountVerificationPendingPage() {
  const t = useTranslations("Auth.AccountVerificationPending");
  const router = useRouter();
  const [pendingSteps, setPendingSteps] = useState(mockPendingSteps);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Timer for cooldown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Polling simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, fetch /api/v1/auth/me to check status
      // If both verified, router.push("/dashboard")
      console.log("Polling verification status...");
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleResendEmail = async () => {
    setIsResending(true);
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsResending(false);
    setResendCooldown(60);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    // Simulate logout
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/login");
  };

  const isEmailPending = !pendingSteps.emailVerified;
  const isPhonePending = !pendingSteps.phoneVerified;

  let statusTitle = t("titlePending");
  let statusDesc = t("descPending");
  if (isEmailPending && !isPhonePending) {
    statusTitle = t("titleEmail");
    statusDesc = t("descEmail");
  } else if (!isEmailPending && isPhonePending) {
    statusTitle = t("titlePhone");
    statusDesc = t("descPhone");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50/50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-3xl bg-white p-8 shadow-sm border border-slate-100 text-center" aria-live="polite">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-primary">
          <Hourglass className="h-8 w-8" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{statusTitle}</h1>
          <p className="text-slate-500">{statusDesc}</p>
        </div>

        <div className="space-y-3 pt-4">
          {isPhonePending && (
            <Button className="w-full" variant="outline" onClick={() => router.push("/verify-otp")}>
                <Phone className="mr-2 h-5 w-5" />
                {t("verifyPhoneNow")}
            </Button>
          )}

          {isEmailPending && (
            <Button
              className="w-full"
              variant="ghost"
              onClick={handleResendEmail}
              disabled={isResending || resendCooldown > 0}
            >
              {isResending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Mail className="mr-2 h-5 w-5" />
              )}
              {resendCooldown > 0
                ? t("resendEmailCountdown", { time: resendCooldown })
                : t("resendEmail")}
            </Button>
          )}
        </div>

        <div className="pt-6 border-t border-slate-100">
          <Button
            variant="ghost"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="text-slate-500 hover:text-slate-700 w-full"
          >
            {isLoggingOut ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="mr-2 h-4 w-4" />
            )}
            {t("logout")}
          </Button>
        </div>
      </div>
    </div>
  );
}
