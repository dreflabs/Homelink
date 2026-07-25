"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Eye, EyeOff, ShieldCheck, XCircle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { resetPassword } from "@/actions/auth";

const resetPasswordSchema = z
  .object({
    token: z.string().min(1),
    password: z
      .string()
      .min(8, "Password minimal 8 karakter.")
      .regex(/[A-Z]/, "Harus mengandung minimal 1 huruf besar.")
      .regex(/[0-9]/, "Harus mengandung minimal 1 angka.")
      .refine(
        (pw) => !["password123", "12345678"].includes(pw.toLowerCase()),
        "Password terlalu umum."
      ),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Konfirmasi password tidak cocok.",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const [tokenStatus, setTokenStatus] = useState<"checking" | "valid" | "invalid">("checking");
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

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setTokenStatus("invalid");
      return;
    }

    const validateToken = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (token === "expired" || token === "invalid") {
        setTokenStatus("invalid");
      } else {
        setTokenStatus("valid");
      }
    };
    
    validateToken();
  }, [searchParams]);

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
      setErrorMsg("An unexpected error occurred.");
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

  if (tokenStatus === "checking") {
    return (
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="text-slate-500 font-medium">Memvalidasi tautan reset...</p>
      </div>
    );
  }

  if (tokenStatus === "invalid") {
    return (
      <div className="w-full max-w-md space-y-6 rounded-3xl bg-white p-8 shadow-sm border border-slate-100 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
          <XCircle className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Tautan Tidak Valid</h1>
          <p className="text-slate-500">
            Tautan reset ini sudah tidak berlaku atau salah. Minta tautan baru untuk melanjutkan.
          </p>
        </div>
        <Button asChild className="w-full mt-6" variant="default">
          <Link href="/forgot-password">Minta Tautan Baru</Link>
        </Button>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="w-full max-w-md space-y-6 rounded-3xl bg-white p-8 shadow-sm border border-slate-100 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
          <ShieldCheck className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Password Diperbarui</h1>
          <p className="text-slate-500">
            Password Anda berhasil diubah. Silakan masuk kembali menggunakan password baru Anda.
          </p>
        </div>
        <Button asChild className="w-full mt-6" variant="default">
          <Link href="/login">Masuk ke Akun</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-8 rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Buat Password Baru</h1>
        <p className="text-sm text-slate-500">
          Masukkan password baru yang kuat untuk mengamankan akun Anda.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <input type="hidden" {...register("token")} value={searchParams.get("token") || ""} />

        <div className="space-y-2">
          <Label htmlFor="password">Password Baru</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <Lock className="h-5 w-5" />
            </div>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Minimal 8 karakter"
              className="pl-10 pr-10"
              {...register("password")}
              aria-invalid={!!errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          
          <div className="mt-2 flex h-1 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full transition-all duration-300 ${
                strength < 50
                  ? "bg-red-500"
                  : strength < 75
                  ? "bg-amber-500"
                  : strength < 100
                  ? "bg-green-400"
                  : "bg-green-600"
              }`}
              style={{ width: `${Math.max(10, strength)}%` }}
            ></div>
          </div>

          {errors.password && (
            <p className="text-sm font-medium text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <Lock className="h-5 w-5" />
            </div>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Ulangi password baru"
              className="pl-10 pr-10"
              {...register("confirmPassword")}
              aria-invalid={!!errors.confirmPassword}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
              aria-label={showConfirmPassword ? "Sembunyikan password" : "Tampilkan password"}
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm font-medium text-red-500 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {errorMsg && (
          <Alert variant="destructive">
            <AlertDescription>{errorMsg}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting || tokenStatus !== "valid"}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            "Simpan Password Baru"
          )}
        </Button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50/50 p-4">
      <Suspense fallback={
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-slate-500 font-medium">Memuat...</p>
        </div>
      }>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
