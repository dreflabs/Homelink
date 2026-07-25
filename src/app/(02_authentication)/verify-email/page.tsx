"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, MailCheck, MailX, RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { verifyEmail } from "@/actions/auth";

type VerificationStatus = "verifying" | "success" | "invalid" | "expired" | "already_verified";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<VerificationStatus>("verifying");
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("invalid");
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
    setIsResending(true);
    // Simulate resend API
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsResending(false);
    alert("Email verifikasi baru telah dikirim.");
  };

  if (status === "verifying") {
    return (
      <div className="w-full max-w-md space-y-6 rounded-3xl bg-white p-8 shadow-sm border border-slate-100 text-center" aria-live="polite">
        <div className="mx-auto flex h-16 w-16 items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Memverifikasi Email...</h1>
          <p className="text-slate-500">Mohon tunggu sebentar, kami sedang memverifikasi tautan Anda.</p>
        </div>
      </div>
    );
  }

  if (status === "success" || status === "already_verified") {
    return (
      <div className="w-full max-w-md space-y-6 rounded-3xl bg-white p-8 shadow-sm border border-slate-100 text-center" aria-live="polite">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
          <MailCheck className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {status === "already_verified" ? "Email Sudah Terverifikasi" : "Verifikasi Berhasil"}
          </h1>
          <p className="text-slate-500">
            {status === "already_verified" 
              ? "Akun Anda sudah pernah diverifikasi sebelumnya. Anda dapat langsung masuk ke akun Anda."
              : "Email Anda berhasil diverifikasi. Akun Anda kini sepenuhnya aktif."}
          </p>
        </div>
        <Button asChild className="w-full mt-6" variant="default">
          <Link href="/login">Lanjut ke Login</Link>
        </Button>
      </div>
    );
  }

  // invalid or expired
  return (
    <div className="w-full max-w-md space-y-6 rounded-3xl bg-white p-8 shadow-sm border border-slate-100 text-center" aria-live="polite">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
        <MailX className="h-8 w-8" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {status === "expired" ? "Tautan Kedaluwarsa" : "Tautan Tidak Valid"}
        </h1>
        <p className="text-slate-500">
          {status === "expired"
            ? "Tautan verifikasi ini sudah kedaluwarsa. Minta tautan baru untuk melanjutkan proses verifikasi."
            : "Tautan verifikasi ini tidak dapat dikenali atau sudah tidak valid."}
        </p>
      </div>
      <div className="space-y-3 mt-6">
        <Button 
          className="w-full" 
          variant="default"
          onClick={handleResend}
          disabled={isResending}
        >
          {isResending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RotateCw className="mr-2 h-4 w-4" />
          )}
          Kirim ulang email verifikasi
        </Button>
        <Button asChild className="w-full" variant="ghost">
          <Link href="/login">Kembali ke Login</Link>
        </Button>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50/50 p-4">
      <Suspense fallback={
        <div className="w-full max-w-md space-y-6 rounded-3xl bg-white p-8 shadow-sm border border-slate-100 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Memuat...</h1>
          </div>
        </div>
      }>
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
