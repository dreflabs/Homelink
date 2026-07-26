"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, Mail, MailCheck, MailX, RotateCw, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { verifyEmail, resendVerificationEmail } from "@/actions/auth";
import { AuthShowcase } from "@/components/auth/AuthShowcase";

type VerificationStatus = "awaiting_email" | "verifying" | "success" | "invalid" | "expired" | "already_verified";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
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
      setResendMessage("Masukkan alamat email Anda terlebih dahulu.");
      return;
    }
    setIsResending(true);
    setResendMessage(null);
    try {
      const res = await resendVerificationEmail(resendEmail);
      setResendMessage(res.message);
    } catch (e) {
      setResendMessage("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Form/Message Area */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 md:px-24 xl:px-32 relative">
        
        {/* Brand Header */}
        <div className="absolute top-8 left-8 sm:left-12 md:left-24 xl:left-32">
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

        <div className="w-full max-w-[420px] mx-auto mt-16 lg:mt-0">
          
          {status === "verifying" && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-slate-500 font-medium">Memvalidasi email Anda...</p>
            </div>
          )}

          {status === "awaiting_email" && (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-4 mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Periksa Kotak Masuk</h1>
                <p className="text-base text-slate-500 leading-relaxed">
                  Kami telah mengirimkan tautan verifikasi ke email Anda. Silakan periksa kotak masuk atau folder spam Anda untuk mengaktifkan akun.
                </p>
              </div>
              <Button asChild className="w-full h-12 text-base shadow-sm" variant="outline">
                <Link href="/login">Kembali ke Halaman Login</Link>
              </Button>
            </div>
          )}

          {(status === "success" || status === "already_verified") && (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mb-8">
                <MailCheck className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="space-y-4 mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  {status === "already_verified" ? "Sudah Terverifikasi" : "Verifikasi Berhasil!"}
                </h1>
                <p className="text-base text-slate-500 leading-relaxed">
                  {status === "already_verified" 
                    ? "Akun Anda sudah pernah diverifikasi sebelumnya."
                    : "Email Anda berhasil diverifikasi. Akun Anda kini sepenuhnya aktif dan siap digunakan."}
                </p>
              </div>
              <Button asChild className="w-full h-12 text-base shadow-md hover:shadow-lg" variant="default">
                <Link href="/login">
                  Lanjut ke Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}

          {(status === "invalid" || status === "expired") && (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mb-8">
                <MailX className="h-8 w-8 text-destructive" />
              </div>
              <div className="space-y-4 mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  {status === "expired" ? "Tautan Kedaluwarsa" : "Tautan Tidak Valid"}
                </h1>
                <p className="text-base text-slate-500 leading-relaxed">
                  {status === "expired"
                    ? "Tautan verifikasi ini sudah melewati batas waktu aman. Silakan minta tautan baru."
                    : "Tautan verifikasi ini tidak dapat dikenali, sudah digunakan, atau tidak valid."}
                </p>
              </div>
              
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Alamat email Anda"
                  value={resendEmail}
                  onChange={(e) => setResendEmail(e.target.value)}
                  className="h-12"
                />
                {resendMessage && (
                  <p className="text-sm text-slate-600">{resendMessage}</p>
                )}
                <Button
                  className="w-full h-12 text-base shadow-md hover:shadow-lg"
                  variant="default"
                  onClick={handleResend}
                  disabled={isResending}
                >
                  {isResending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Mengirim ulang...
                    </>
                  ) : (
                    <>
                      Kirim Tautan Baru
                      <RotateCw className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                <Button asChild className="w-full h-12" variant="ghost">
                  <Link href="/login">Batal & Kembali ke Login</Link>
                </Button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Right Showcase Area */}
      <AuthShowcase 
        quote="Akses eksklusif Anda ke properti terkurasi dimulai dari sini. Setiap detail diperhatikan dengan seksama."
        author="HomeLink Concierge"
        role="Client Services"
        imageSrc="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      />
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-slate-500 font-medium">Memuat antarmuka...</p>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
