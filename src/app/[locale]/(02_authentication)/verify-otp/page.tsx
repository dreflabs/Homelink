"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function VerifyOTPPage() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple chars
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next
    if (value !== '' && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError("Masukkan 6 digit kode OTP");
      setLoading(false);
      return;
    }

    try {
      // Simulate API call for now since backend doesn't have an endpoint yet
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // In real implementation:
      // await axios.post('/api/v1/auth/verify-otp', { code: otpCode })
      
      router.push('/login');
    } catch (err) {
      setError("Kode OTP tidak valid atau kedaluwarsa.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-50 text-primary rounded-2xl flex items-center justify-center">
            <ShieldCheck className="w-8 h-8" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-slate-900 mb-2">
          Verifikasi Nomor Telepon
        </h1>
        <p className="text-center text-slate-500 mb-8 text-sm">
          Kami telah mengirimkan 6 digit kode OTP ke nomor telepon Anda. Silakan masukkan kode di bawah ini.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl font-bold rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 h-auto font-medium"
            disabled={loading || otp.join('').length !== 6}
          >
            {loading ? "Memverifikasi..." : "Verifikasi Sekarang"}
            {!loading && <ArrowRight className="w-5 h-5 ml-2" />}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 mb-4">
            Belum menerima kode? <button className="text-primary font-medium hover:underline">Kirim Ulang</button>
          </p>
          
          <Link href="/login" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Halaman Login
          </Link>
        </div>
      </div>
    </div>
  );
}
