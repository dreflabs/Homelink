"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert, RefreshCw, LayoutDashboard } from "lucide-react";

export default function BuyerDashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Buyer Dashboard Error:", error);
  }, [error]);

  return (
    <div className="p-8 max-w-xl mx-auto my-12 bg-white rounded-3xl border border-slate-200 shadow-sm text-center">
      <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
        <ShieldAlert className="w-6 h-6" />
      </div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">Gagal Memuat Dashboard</h2>
      <p className="text-sm text-slate-600 mb-6">
        Terjadi kendala saat mengambil data Anda. Mohon coba beberapa saat lagi.
      </p>
      <div className="flex justify-center gap-3">
        <Button onClick={() => reset()} size="sm" className="rounded-xl bg-primary hover:bg-primary text-white">
          <RefreshCw className="w-3.5 h-3.5 mr-2" />
          Muat Ulang
        </Button>
        <Button variant="outline" size="sm" asChild className="rounded-xl">
          <Link href="/dashboard">
            <LayoutDashboard className="w-3.5 h-3.5 mr-2" />
            Ke Ringkasan
          </Link>
        </Button>
      </div>
    </div>
  );
}
