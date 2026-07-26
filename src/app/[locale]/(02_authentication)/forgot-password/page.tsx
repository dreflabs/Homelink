"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, SendHorizontal, Loader2, ArrowLeft, KeyRound, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPassword } from "@/actions/auth";
import { AuthShowcase } from "@/components/auth/AuthShowcase";

const emailSchema = z.object({
  identifier: z.string().min(1, "Email wajib diisi.").email("Masukkan alamat email yang valid."),
  mode: z.literal("email"),
});

const forgotPasswordSchema = emailSchema;
type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { mode: "email", identifier: "" },
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
      setErrorMsg("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* ─── Left: Form Panel ─── */}
      <div className="w-full lg:w-1/2 flex flex-col min-h-screen bg-white">
        {/* Top bar */}
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
          <Link
            href="/login"
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Login
          </Link>
        </div>

        {/* Form / Success */}
        <div className="flex-1 flex items-center justify-center px-8 sm:px-12 py-12">
          <div className="w-full max-w-md">
            {!submitted ? (
              <>
                {/* Icon + Heading */}
                <div className="mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                    <KeyRound className="h-7 w-7 text-blue-700" />
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
                    Lupa Password?
                  </h1>
                  <p className="text-slate-500 text-base leading-relaxed">
                    Jangan khawatir. Masukkan email Anda dan kami akan mengirimkan instruksi pemulihan segera.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <Label htmlFor="identifier" className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                      Alamat Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="identifier"
                        type="email"
                        placeholder="nama@email.com"
                        className="h-12 pl-11 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
                        {...register("identifier")}
                        aria-invalid={!!errors.identifier}
                      />
                    </div>
                    {errors.identifier && (
                      <p className="text-sm font-medium text-red-600 mt-1">{errors.identifier.message}</p>
                    )}
                  </div>

                  {/* Error */}
                  {errorMsg && (
                    <div className="flex items-start gap-3 text-sm text-red-700 bg-red-50 p-4 rounded-xl border border-red-200">
                      <p>{errorMsg}</p>
                    </div>
                  )}

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-semibold bg-blue-700 hover:bg-blue-800 rounded-xl shadow-sm transition-all"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Mengirim...</>
                    ) : (
                      <><SendHorizontal className="mr-2 h-4 w-4" />Kirim Instruksi Reset</>
                    )}
                  </Button>
                </form>
              </>
            ) : (
              /* Success state */
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-8">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-3">
                  Instruksi Terkirim!
                </h1>
                <p className="text-slate-500 text-base leading-relaxed mb-8">
                  Jika akun tersebut terdaftar, kami telah mengirimkan instruksi pemulihan. Silakan periksa kotak masuk email Anda.
                </p>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
                  <p className="text-sm text-amber-800 leading-relaxed">
                    <span className="font-semibold block mb-1">Tidak menerima email?</span>
                    Periksa folder spam atau pastikan alamat email yang Anda masukkan sudah benar.
                  </p>
                </div>

                <Button asChild className="w-full h-12 text-base font-semibold bg-blue-700 hover:bg-blue-800 rounded-xl shadow-sm">
                  <Link href="/login">Kembali ke Halaman Login</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Right: Showcase Panel ─── */}
      <AuthShowcase
        quote="Keamanan data dan privasi Anda adalah prioritas utama kami. Sistem keamanan tingkat bank menjaga aset Anda tetap aman."
        author="HomeLink Security"
        role="Platform Operations"
      />
    </div>
  );
}
