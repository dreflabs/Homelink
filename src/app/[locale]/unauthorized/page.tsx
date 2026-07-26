import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Building, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-8 h-8" />
        </div>
        
        <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Akses Ditolak (403)</h1>
        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
          Anda tidak memiliki izin (peran akun yang sesuai) untuk mengakses halaman ini. Silakan masuk menggunakan akun yang sesuai.
        </p>

        <div className="flex flex-col gap-3">
          <Button asChild className="w-full rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold py-6">
            <Link href="/dashboard">
              <LayoutDashboard className="mr-2 h-5 w-5" />
              Kembali ke Dashboard Saya
            </Link>
          </Button>

          <Button asChild variant="outline" className="w-full rounded-xl border-slate-200 text-slate-700 py-6 font-semibold">
            <Link href="/">
              <Building className="mr-2 h-5 w-5" />
              Ke Halaman Utama
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
