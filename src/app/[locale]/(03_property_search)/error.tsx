"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchX, RefreshCw, Building } from "lucide-react";

export default function SearchError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Property Search Error:", error);
  }, [error]);

  return (
    <div className="min-h-[500px] flex flex-col items-center justify-center text-center px-4 py-12">
      <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mb-4">
        <SearchX className="w-7 h-7" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Gagal Memuat Hasil Pencarian</h2>
      <p className="text-slate-600 max-w-md mb-6 text-sm">
        Sistem mengalami masalah saat mengambil daftar properti. Silakan muat ulang atau coba kriteria pencarian lain.
      </p>
      <div className="flex gap-3">
        <Button onClick={() => reset()} className="rounded-full bg-primary hover:bg-primary text-white">
          <RefreshCw className="w-4 h-4 mr-2" />
          Coba Lagi
        </Button>
        <Button variant="outline" asChild className="rounded-full">
          <Link href="/">
            <Building className="w-5 h-5 mr-2" />
            Kembali ke Utama
          </Link>
        </Button>
      </div>
    </div>
  );
}
