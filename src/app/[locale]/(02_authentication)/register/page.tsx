"use client";

import Image from "next/image";
import { Logo } from "@/components/shared/Logo";
import { useTranslations } from "next-intl";
import { RegisterCard } from "@/components/auth/RegisterCard";

export default function RegisterPage() {
  const t = useTranslations("Auth.register");

  return (
    <div className="flex min-h-screen relative overflow-hidden bg-slate-950">
      {/* Dynamic Background */}
      <Image
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
        alt="Background"
        fill
        className="object-cover pointer-events-none -z-0"
        priority
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]" />

      <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-7xl mx-auto min-h-screen">
        {/* ─── Left: Immersive Hero Panel ─── */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 lg:p-20 text-white">
          <div>
            <Logo size="lg" variant="light" />
          </div>

          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 text-xs uppercase tracking-widest text-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {t("badge")}
            </div>

            <h1 className="text-4xl lg:text-5xl leading-tight font-semibold tracking-tight mb-6">
              {t("heroTitle")}
            </h1>

            <p className="text-lg text-slate-200/90 font-medium max-w-md leading-relaxed">
              {t("heroDesc")}
            </p>
          </div>

          {/* Trust Showcase Quote */}
          <div className="border-t border-white/10 pt-6">
            <p className="text-sm font-medium italic text-slate-300 mb-2">
              &ldquo;{t("showcase.quote")}&rdquo;
            </p>
            <div className="text-xs text-slate-400">
              <span className="font-bold text-white">{t("showcase.author")}</span> — {t("showcase.role")}
            </div>
          </div>
        </div>

        {/* ─── Right: Floating Glass Register Card ─── */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-in-out">
          <RegisterCard />
        </div>
      </div>
    </div>
  );
}
