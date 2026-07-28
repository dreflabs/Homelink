"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, SessionProvider } from "next-auth/react";
import { Building2, Home, Camera, Loader2, ArrowRight } from "lucide-react";
import { completeOnboarding } from "@/actions/onboarding";
import { Role } from "@prisma/client";
import { toast } from "sonner";
import Image from "next/image";

const ROLES = [
  {
    id: "BUYER",
    title: "Mencari Properti Idaman",
    description: "Jelajahi, simpan, dan temukan rumah impian Anda dengan standar verifikasi ketat HomeLink.",
    icon: Building2,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "OWNER",
    title: "Menyewakan Properti Saya",
    description: "Pasarkan properti premium Anda ke jutaan calon pembeli dan penyewa terverifikasi.",
    icon: Home,
    color: "from-emerald-500 to-teal-500"
  },
  {
    id: "SURVEYOR",
    title: "Bekerja Sebagai Mitra",
    description: "Bergabung sebagai surveyor lapangan profesional untuk memverifikasi listing HomeLink.",
    icon: Camera,
    color: "from-purple-500 to-indigo-500"
  }
];

function OnboardingContent() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!selectedRole) return;
    setIsLoading(true);

    try {
      const result = await completeOnboarding(selectedRole as Role);
      
      if (result.error) {
        toast.error(result.error);
        setIsLoading(false);
        return;
      }

      // Update local NextAuth session cache
      await update({ role: selectedRole, isOnboarded: true });

      toast.success("Profil berhasil diperbarui!");
      
      // Redirect based on role
      if (selectedRole === "OWNER") router.push("/owner/properties");
      else if (selectedRole === "SURVEYOR") router.push("/surveyor/dashboard");
      else router.push("/dashboard");

    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-4xl z-10 flex flex-col items-center">
        <div className="mb-12 text-center">
          <Image src="/1.png" alt="HomeLink" width={60} height={60} className="mx-auto mb-6 opacity-90" />
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Selamat datang di HomeLink
          </h1>
          <p className="text-zinc-400 text-lg max-w-lg mx-auto">
            {session?.user?.name ? `Halo, ${session.user.name.split(' ')[0]}! ` : ''} 
            Apa tujuan utama Anda bergabung dengan kami hari ini?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
          {ROLES.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            
            return (
              <div 
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`
                  relative flex flex-col p-6 rounded-2xl cursor-pointer transition-all duration-300
                  border backdrop-blur-xl overflow-hidden group
                  ${isSelected 
                    ? 'border-white/40 bg-white/10 scale-[1.02] shadow-2xl' 
                    : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                  }
                `}
              >
                {/* Gradient background effect on hover/select */}
                <div className={`
                  absolute inset-0 opacity-0 transition-opacity duration-500 bg-gradient-to-br ${role.color}
                  ${isSelected ? 'opacity-10' : 'group-hover:opacity-5'}
                `} />

                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center mb-6
                  ${isSelected ? 'bg-white text-zinc-950' : 'bg-white/10 text-white group-hover:bg-white/20'}
                  transition-colors duration-300
                `}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  {role.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed flex-grow">
                  {role.description}
                </p>

                {/* Selection indicator */}
                <div className={`
                  absolute top-6 right-6 w-5 h-5 rounded-full border-2 flex items-center justify-center
                  transition-all duration-300
                  ${isSelected ? 'border-white' : 'border-white/20'}
                `}>
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedRole || isLoading}
          className={`
            flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium text-lg
            transition-all duration-300 min-w-[200px]
            ${selectedRole 
              ? 'bg-white text-zinc-950 hover:scale-105 hover:shadow-xl' 
              : 'bg-white/10 text-zinc-500 cursor-not-allowed'
            }
          `}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Lanjutkan
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <SessionProvider>
      <OnboardingContent />
    </SessionProvider>
  );
}
