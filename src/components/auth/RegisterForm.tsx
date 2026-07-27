"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OAuthButtons } from "@/components/shared/OAuthButtons";
import { UserRound, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<"weak" | "medium" | "strong" | null>(null);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "BUYER"
    }
  });

  const passwordValue = watch("password");

  useEffect(() => {
    if (!passwordValue) {
      setPasswordStrength(null);
      return;
    }
    let score = 0;
    if (passwordValue.length >= 8) score++;
    if (/[A-Z]/.test(passwordValue)) score++;
    if (/[0-9]/.test(passwordValue)) score++;
    
    if (score === 0 || score === 1) setPasswordStrength("weak");
    else if (score === 2) setPasswordStrength("medium");
    else if (score === 3) setPasswordStrength("strong");
  }, [passwordValue]);

  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          role: data.role,
          password: data.password,
          agreedToTerms: data.agreedToTerms,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Registrasi berhasil!", {
          description: result.message || "Silakan periksa email Anda untuk verifikasi.",
        });
        router.push("/verify-email");
      } else {
        toast.error("Gagal melakukan registrasi", {
          description: result.message || "Silakan periksa kembali data yang Anda masukkan.",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Kesalahan Jaringan", {
        description: "Tidak dapat terhubung ke server. Silakan coba lagi.",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900">Buat Akun Baru</h1>
        <p className="text-slate-500 mt-2 text-sm">Daftar untuk mulai menggunakan HomeLink</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <select 
            {...register("role")}
            className="w-full h-12 rounded-xl border border-slate-200 px-4 bg-white text-slate-900 focus:border-primary focus:ring-primary focus:outline-none"
          >
            <option value="BUYER">Pembeli (Buyer)</option>
            <option value="OWNER">Pemilik (Owner)</option>
            <option value="SURVEYOR">Surveyor</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
        </div>

        <div className="space-y-1 relative">
          <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 " aria-hidden="true" />
          <Input 
            {...register("name")}
            type="text" 
            placeholder="Nama Lengkap" 
            className="pl-10 h-12 rounded-xl border-slate-200 focus:border-primary focus:ring-primary" 
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

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
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 " aria-hidden="true" />
          <Input 
            {...register("phone")}
            type="tel" 
            placeholder="Nomor Telepon (mis. +62812...)" 
            className="pl-10 h-12 rounded-xl border-slate-200 focus:border-primary focus:ring-primary" 
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
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
          
          {passwordValue && (
            <div className="flex gap-1 mt-2 mb-1" aria-live="polite">
              <div className={`h-1.5 flex-1 rounded-full ${passwordStrength === 'weak' || passwordStrength === 'medium' || passwordStrength === 'strong' ? (passwordStrength === 'weak' ? 'bg-slate-300' : 'bg-slate-500') : 'bg-slate-200'}`} />
              <div className={`h-1.5 flex-1 rounded-full ${passwordStrength === 'medium' || passwordStrength === 'strong' ? 'bg-slate-500' : 'bg-slate-200'}`} />
              <div className={`h-1.5 flex-1 rounded-full ${passwordStrength === 'strong' ? 'bg-emerald-500' : 'bg-slate-200'}`} />
            </div>
          )}
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div className="space-y-1 relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
          <Input 
            {...register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"} 
            placeholder="Konfirmasi Password" 
            className="pl-10 pr-10 h-12 rounded-xl border-slate-200 focus:border-primary focus:ring-primary" 
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label={showConfirmPassword ? "Sembunyikan password" : "Tampilkan password"}
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
        </div>

        <div className="flex flex-col space-y-1 pt-2">
          <div className="flex items-start space-x-2">
            <input 
              type="checkbox" 
              id="terms" 
              {...register("agreedToTerms")}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
            />
            <label htmlFor="terms" className="text-sm text-slate-600">
              Saya menyetujui <Link href="/terms" className="text-primary hover:underline">Syarat & Ketentuan</Link> dan <Link href="/privacy" className="text-primary hover:underline">Kebijakan Privasi</Link> HomeLink.
            </label>
          </div>
          {errors.agreedToTerms && <p className="text-red-500 text-sm">{errors.agreedToTerms.message}</p>}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-primary hover:bg-primary text-white rounded-xl font-semibold mt-4">
          {isSubmitting ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            "Daftar"
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
        Sudah punya akun?{" "}
        <Link href="/login" className="text-primary font-medium hover:underline">
          Masuk
        </Link>
      </p>
    </div>
  );
}
