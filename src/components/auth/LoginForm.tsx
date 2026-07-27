"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OAuthButtons } from "@/components/shared/OAuthButtons";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const [globalError, setGlobalError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    setGlobalError(null);
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.error) {
        setGlobalError("Email atau password yang Anda masukkan salah.");
        toast.error("Gagal Masuk", {
          description: "Silakan periksa kembali email dan password Anda.",
        });
      } else if (response?.ok) {
        toast.success("Berhasil Masuk!", {
          description: "Selamat datang kembali di HomeLink.",
        });
        // We can force a router refresh and push, or push and refresh
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      setGlobalError("Terjadi kesalahan jaringan. Silakan coba lagi.");
      toast.error("Kesalahan Sistem", {
        description: "Tidak dapat terhubung ke server.",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900">Selamat Datang Kembali</h1>
        <p className="text-slate-500 mt-2 text-sm">Masuk untuk melanjutkan ke HomeLink</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {globalError && (
          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-xl border border-red-100">
            {globalError}
          </div>
        )}

        <div className="space-y-1 relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 " aria-hidden="true" />
          <Input 
            {...register("email")}
            type="email" 
            placeholder="Email" 
            className="pl-10 h-12 rounded-xl border-slate-200 focus:border-primary focus:ring-primary" 
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="space-y-1 relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
          <Input 
            {...register("password")}
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            className="pl-10 pr-10 h-12 rounded-xl border-slate-200 focus:border-primary focus:ring-primary" 
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-sm text-primary hover:underline font-medium">
            Lupa password?
          </Link>
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-primary hover:bg-primary text-white rounded-xl font-semibold">
          {isSubmitting ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            "Masuk"
          )}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-slate-500">atau</span>
        </div>
      </div>

      <OAuthButtons />

      <p className="text-center text-sm text-slate-500">
        Belum punya akun?{" "}
        <Link href="/register" className="text-primary font-medium hover:underline">
          Daftar
        </Link>
      </p>
    </div>
  );
}
