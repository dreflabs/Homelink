"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, LifeBuoy, LogOut, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function AccountSuspendedPage() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // In a real app, you might fetch suspension reason from an API or session
  const suspensionReason = "Pelanggaran kebijakan layanan"; // Mock reason

  const handleSupportClick = () => {
    // Navigate to support page or open mailto
    window.location.href = "mailto:support@homelink.com?subject=Banding Penangguhan Akun";
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    // Simulate logout API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50/50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-3xl bg-white p-8 shadow-sm border border-slate-100 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-700">
          <ShieldAlert className="h-8 w-8" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Akun Ditangguhkan</h1>
          <p className="text-slate-600 leading-relaxed">
            Akun Anda telah ditangguhkan sementara. Hubungi tim dukungan kami untuk informasi lebih lanjut dan proses banding.
          </p>
          
          {suspensionReason && (
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
              <p className="text-sm font-medium text-slate-500 mb-1">Alasan Penangguhan:</p>
              <p className="text-sm text-slate-800">{suspensionReason}</p>
            </div>
          )}
        </div>

        <div className="space-y-3 pt-4">
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
            onClick={handleSupportClick}
          >
            <LifeBuoy className="mr-2 h-4 w-4" />
            Hubungi Dukungan
          </Button>

          <Button
            variant="ghost"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full text-slate-500 hover:text-slate-700"
          >
            {isLoggingOut ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="mr-2 h-4 w-4" />
            )}
            Keluar
          </Button>
        </div>
      </div>
    </div>
  );
}
