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

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    // TODO: implement login logic
    console.log(data);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900">Selamat Datang Kembali</h1>
        <p className="text-slate-500 mt-2 text-sm">Masuk untuk melanjutkan ke HomeLink</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1 relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
          <Input 
            {...register("email")}
            type="email" 
            placeholder="Email" 
            className="pl-10 h-12 rounded-xl border-slate-200 focus:border-blue-700 focus:ring-blue-700" 
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="space-y-1 relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
          <Input 
            {...register("password")}
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            className="pl-10 pr-10 h-12 rounded-xl border-slate-200 focus:border-blue-700 focus:ring-blue-700" 
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
          <Link href="/forgot-password" className="text-sm text-blue-700 hover:underline font-medium">
            Lupa password?
          </Link>
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-semibold">
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
        <Link href="/register" className="text-blue-700 font-medium hover:underline">
          Daftar
        </Link>
      </p>
    </div>
  );
}
