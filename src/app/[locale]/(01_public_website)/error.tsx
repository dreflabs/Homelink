"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert, RefreshCw, Building } from "lucide-react";

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Public Route Error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="p-4 rounded-full bg-amber-100 text-amber-600 mb-6">
        <ShieldAlert className="w-10 h-10" />
      </div>
      <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
        Terjadi Kesalahan
      </h2>
      <p className="text-slate-600 max-w-md mb-8 leading-relaxed">
        Maaf, sistem mengalami kendala saat memuat halaman ini. Silakan coba muat ulang atau kembali ke beranda.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Button onClick={() => reset()} className="rounded-full bg-blue-700 hover:bg-blue-800 text-white px-6">
          <RefreshCw className="w-4 h-4 mr-2" />
          Coba Lagi
        </Button>
        <Button variant="outline" asChild className="rounded-full border-slate-200">
          <Link href="/">
            <Building className="w-5 h-5 mr-2" />
            Kembali ke Beranda
          </Link>
        </Button>
      </div>
    </div>
  );
}
