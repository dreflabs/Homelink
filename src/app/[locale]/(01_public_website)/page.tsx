import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SearchHeroWrapper } from "@/components/shared/SearchHeroWrapper";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { FadeIn } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  Building, 
  ChartCandlestick, 
  Bot, 
  FileCheck, 
  MapPin, 
  ChevronRight,
  TrendingUp,
  Search,
  CheckCircle2,
  Lock
} from "lucide-react";
import prisma from "@/lib/prisma";
import { getPublishedTestimonials } from "@/actions/cms";
import { getTranslations } from "next-intl/server";

// ISR Caching - Revalidate every 60 seconds
export const revalidate = 60;

export const metadata: Metadata = {
  title: "HomeLink 2.0 | Platform Properti Terverifikasi #1 di Indonesia",
  description: "Temukan lebih dari 10.000 properti terverifikasi di seluruh Indonesia. Jaminan 100% bebas ghost listing, transparan, dan dilengkapi AI Instant Valuation.",
  keywords: ["properti indonesia", "jual rumah", "beli rumah", "sewa apartemen", "rumah terverifikasi", "tanpa ghost listing", "homelink"],
  openGraph: {
    title: "HomeLink 2.0 | Platform Properti Terverifikasi & Bebas Ghost Listing",
    description: "Cari dan jual/sewa rumah, apartemen, atau tanah terverifikasi fisik & legal oleh tim independen.",
    url: "https://homelink.id",
    siteName: "HomeLink 2.0",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "HomeLink 2.0 Platform Properti",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default async function HomePage() {
  const t = await getTranslations("Public.HomePage");
  const [featuredProperties, testimonials] = await Promise.all([
    prisma.property.findMany({
      where: { status: "FULLY_VERIFIED" },
      take: 8,
      orderBy: { createdAt: "desc" },
      include: { media: true },
    }).catch(() => []),
    getPublishedTestimonials().catch(() => []),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      
      {/* 1. THE PREMIUM HERO (Clean Light Mode) */}
      <section className="relative w-full pt-24 pb-16 lg:pt-40 lg:pb-32 flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Image with Light Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&auto=format&fit=crop"
            alt="HomeLink Hero Background"
            fill
            priority
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoKAAcALpE6l0elI6IhKHgAoDOUg3AA2AD0v9sD8gEAAP77yv286QA="
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          
          <FadeIn direction="down" delay={0.05}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/60 shadow-sm text-sm font-semibold text-slate-700 mb-8 transition-all hover:shadow-md hover:border-slate-300">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              {t("Hero.badge")}
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-6 tracking-tighter leading-[1.1] max-w-5xl">
              {t("Hero.title_1")} <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {t("Hero.title_2")}
              </span>
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.15}>
            <p className="text-lg sm:text-xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              {t("Hero.subtitle")}
            </p>
          </FadeIn>
          
          <FadeIn direction="up" delay={0.2} className="w-full max-w-5xl">
            {/* Elevated Search Wrapper */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-[2.5rem] blur-lg opacity-50" />
              <div className="relative bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 p-2 sm:p-4 border border-slate-100">
                <SearchHeroWrapper />
              </div>
            </div>
          </FadeIn>

          {/* Social Proof Banner */}
          <FadeIn direction="up" delay={0.3} className="mt-16 sm:mt-20 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-slate-300" />
              <span>{t("Hero.stats_1")}</span>
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-200" />
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-slate-300" />
              <span>{t("Hero.stats_2")}</span>
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-200" />
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-slate-300" />
              <span>{t("Hero.stats_3")}</span>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* 2. THE VERIFICATION PROCESS (Visual Storytelling) */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              {t("Verification.title")}
            </h2>
            <p className="text-lg text-slate-500">
              {t("Verification.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-slate-100 -translate-y-1/2 z-0" />

            {/* Step 1 */}
            <FadeIn delay={0.1} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-3xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6 shadow-sm">
                <FileCheck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t("Verification.step_1_title")}</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4">
                {t("Verification.step_1_desc")}
              </p>
            </FadeIn>

            {/* Step 2 */}
            <FadeIn delay={0.2} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-6 shadow-sm">
                <MapPin className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t("Verification.step_2_title")}</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4">
                {t("Verification.step_2_desc")}
              </p>
            </FadeIn>

            {/* Step 3 */}
            <FadeIn delay={0.3} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-6 shadow-sm">
                <ShieldCheck className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t("Verification.step_3_title")}</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4">
                {t("Verification.step_3_desc")}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3. THE BENTO GRID (Platform Features) */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
             <Badge variant="outline" className="mb-4 bg-white border-slate-200 text-slate-600 px-4 py-1.5">{t("Features.badge")}</Badge>
             <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              {t("Features.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Massive AI Card (Spans 2 columns on LG) */}
            <FadeIn delay={0.1} className="lg:col-span-2 group">
              <div className="bg-white rounded-[2rem] p-8 sm:p-12 h-full border border-slate-200/60 shadow-sm overflow-hidden relative transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="absolute right-0 bottom-0 w-[50%] h-[80%] bg-gradient-to-tl from-blue-50 to-transparent pointer-events-none rounded-tl-full" />
                
                <div className="relative z-10 max-w-md">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20">
                    <Bot className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">
                    AI Instant Valuation
                  </h3>
                  <p className="text-slate-500 text-lg leading-relaxed mb-8">
                    {t("Features.ai_desc")}
                  </p>
                  <Button asChild className="rounded-full bg-slate-900 text-white hover:bg-slate-800 shadow-md">
                    <Link href="/ai/valuation">
                      {t("Features.ai_button")} <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>

                {/* Decorative UI inside card */}
                <div className="hidden sm:block absolute right-[-5%] top-[20%] w-72 h-64 bg-white rounded-2xl border border-slate-100 shadow-2xl p-6 rotate-[-5deg] transition-transform group-hover:rotate-0 group-hover:scale-105 duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <ChartCandlestick className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-semibold text-slate-700">{t("Features.ai_card_title")}</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[70%]" />
                    </div>
                    <div className="h-2 w-[80%] bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-400 w-[50%]" />
                    </div>
                  </div>
                  <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-xs text-slate-400 font-medium block">{t("Features.ai_card_label")}</span>
                    <span className="text-xl font-bold text-slate-900">Rp 2.4M - 2.8M</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Secondary Card (Security) */}
            <FadeIn delay={0.2} className="group">
              <div className="bg-slate-900 rounded-[2rem] p-8 sm:p-10 h-full overflow-hidden relative transition-all hover:shadow-2xl hover:shadow-slate-900/20 hover:-translate-y-1 text-white">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 border border-white/10">
                    <Lock className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight mb-4">{t("Features.security_title")}</h3>
                  <p className="text-slate-400 text-base leading-relaxed mb-8 flex-grow">
                    {t("Features.security_desc")}
                  </p>
                  <Link href="/about" className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300">
                    {t("Features.security_button")} <ChevronRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* 4. CURATED COLLECTIONS (Featured Properties) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeIn delay={0.1}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
                  {t("Collections.title")}
                </h2>
                <p className="text-lg text-slate-500">
                  {t("Collections.subtitle")}
                </p>
              </div>
              <Button asChild variant="ghost" className="hidden sm:flex text-blue-600 hover:text-blue-700 hover:bg-blue-50 group font-semibold text-base">
                <Link href="/search-result">
                  {t("Collections.see_all")} <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </FadeIn>

          {featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {featuredProperties.map((prop, index) => (
                <FadeIn key={prop.id} delay={0.05 * (index + 1)}>
                  <PropertyCard 
                    id={prop.id}
                    title={prop.title}
                    price={Number(prop.price)}
                    address={prop.address}
                    specs={{ 
                      bed: (prop as any).bedroom ?? 0, 
                      bath: (prop as any).bathroom ?? 0, 
                      area: (prop as any).buildingArea ?? (prop as any).landArea ?? 0 
                    }}
                    imageUrl={prop.media?.[0]?.s3Url || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop"}
                    isVerified={prop.status === 'FULLY_VERIFIED'}
                    isFeatured={true}
                  />
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm max-w-3xl mx-auto">
              <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t("Collections.empty_title")}</h3>
              <p className="text-slate-500 text-base mb-8 max-w-md mx-auto">
                {t("Collections.empty_desc")}
              </p>
              <Button asChild className="rounded-full bg-slate-900 hover:bg-slate-800 text-white px-8">
                <Link href="/search-result">{t("Collections.empty_button")}</Link>
              </Button>
            </div>
          )}

          <div className="mt-12 flex justify-center sm:hidden">
            <Button asChild variant="outline" className="w-full rounded-full h-12 border-slate-200">
              <Link href="/search-result">
                {t("Collections.see_all_mobile")}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 5. THE TRUST WALL (Minimalist Testimonials) */}
      {testimonials.length > 0 && (
        <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            
            <FadeIn delay={0.1} className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                {t("Testimonials.title")}
              </h2>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {testimonials.slice(0, 4).map((testi, idx) => (
                <FadeIn key={testi.id} delay={0.1 * (idx + 1)}>
                  <div className="flex flex-col h-full bg-white p-8 sm:p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-1 mb-6">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < testi.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 fill-slate-200'}`} aria-hidden="true" />
                      ))}
                    </div>
                    <p className="text-slate-700 text-lg sm:text-xl font-medium leading-relaxed mb-8 flex-grow">
                      "{testi.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold text-lg border border-blue-200/50">
                        {testi.authorName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{testi.authorName}</h4>
                        <p className="text-sm text-slate-500 font-medium">{testi.authorRole}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. THE FINAL CTA */}
      <section className="py-16 md:py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 pointer-events-none" />
        <div className="absolute left-[20%] top-[-50%] w-[60%] h-[200%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
          <FadeIn delay={0.1}>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
              {t("CTA.title")}
            </h2>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              {t("CTA.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold h-14 px-8 text-lg shadow-xl shadow-blue-900/50">
                <Link href="/owner/properties/new">
                  {t("CTA.button_1")}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-slate-700 text-white hover:bg-slate-800 font-semibold h-14 px-8 text-lg bg-slate-900/50 backdrop-blur-md">
                <Link href="/contact">
                  {t("CTA.button_2")}
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
