"use client";

import Image from "next/image";
import { Logo } from "@/components/shared/Logo";
import { useTranslations } from "next-intl";
import { LoginCard } from "@/components/auth/LoginCard";

export default function LoginPage() {
  const t = useTranslations("Auth.login");

  return (
    <div className="flex min-h-screen relative overflow-hidden bg-slate-950">
      {/* Dynamic Background */}
      <Image
        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
        alt="Background"
        fill
        className="object-cover pointer-events-none -z-0"
        priority
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px]" />

      <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-7xl mx-auto min-h-screen">
        {/* ─── Left: Immersive Hero Panel (Brand Storytelling) ─── */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 lg:p-20 text-white">
          <div>
            <Logo size="lg" variant="light" />
          </div>

          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 text-xs uppercase tracking-widest text-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              HomeLink Verified Tier
            </div>

            <h1 className="text-4xl lg:text-5xl leading-tight font-semibold tracking-tight mb-6">
              {t("heroTitle")}
            </h1>

            <p className="text-lg text-slate-200/90 font-medium max-w-md leading-relaxed">
              {t("heroDesc")}
            </p>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4 border-t border-white/10 pt-6">
            <div className="flex -space-x-3 overflow-hidden">
              {[
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
              ].map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt="User avatar"
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-900 object-cover"
                />
              ))}
            </div>
            <div className="text-sm font-medium text-slate-300">
              <span className="text-white font-bold">4.9/5</span> {t("reviews")}
            </div>
          </div>
        </div>

        {/* ─── Right: Floating Glass Auth Card ─── */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-in-out">
          <LoginCard />
        </div>
      </div>
    </div>
  );
}
