import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SearchHeroWrapper } from "@/components/shared/SearchHeroWrapper";
import { FadeIn } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  ShieldCheck, 
  Building, 
  MapPin, 
  CheckCircle2,
  Lock,
  Camera,
  FileCheck,
  Palmtree,
  Hotel,
  TrendingUp,
  BrainCircuit,
  Map,
  Key
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { FeaturedPropertiesGrid, SkeletonGrid, ContextualCollectionsTabs } from "@/components/shared/FeaturedProperties";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "HomeLink 2.0 | Luxury Verified Properties",
  description: "Temukan properti premium yang 100% terverifikasi secara fisik dan legal.",
};

export default async function HomePage() {
  const t = await getTranslations("Public.HomePage");

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-slate-100 selection:text-blue-900">
      
      {/* 1. SECTION 1: HERO (Immersive 90vh) */}
      <section className="relative w-full h-[90vh] min-h-[700px] flex flex-col items-center justify-center overflow-hidden">
        {/* Luxury Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop"
            alt="Luxury Property Background"
            fill
            priority
            className="object-cover scale-105 animate-in fade-in zoom-in duration-1000"
          />
          {/* Dark gradient overlay for readability (Premium) */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </div>

        {/* Top Floating Badge */}
        <div className="absolute top-32 z-20">
          <FadeIn direction="down" delay={0.2}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {t('Hero.badge')}
            </div>
          </FadeIn>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 w-full flex flex-col items-center text-center mt-12">
          <FadeIn direction="up" delay={0.3}>
            <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-semibold text-white mb-6 tracking-tighter leading-[1.05] max-w-5xl">
              {t('Hero.title_1')}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white font-normal">
                {t('Hero.title_2')}
              </span>
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <p className="text-lg sm:text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              {t('Hero.subtitle')}
            </p>
          </FadeIn>
          
          <FadeIn direction="up" delay={0.5} className="w-full max-w-4xl">
            {/* Glassmorphism Search Box */}
            <div className="relative p-2 sm:p-4 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-float">
              <div className="bg-white rounded-[1.2rem] overflow-hidden shadow-inner">
                <SearchHeroWrapper />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. SECTION 2: FEATURED VERIFIED PROPERTY (The Crown Jewel) */}
      <section className="py-24 sm:py-32 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
                {t('Featured.title')}
              </h2>
              <p className="text-slate-500 mt-4 text-lg">{t('Featured.subtitle')}</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative w-full rounded-[2rem] overflow-hidden group">
              {/* Massive Image */}
              <div className="relative h-[500px] lg:h-[700px] w-full">
                <Image 
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
                  alt="Featured Luxury Home"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent" />
              </div>

              {/* Floating Content over Image */}
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-100 text-sm font-medium mb-4">
                    <ShieldCheck className="w-4 h-4" />
                    {t('Featured.badge')}
                  </div>
                  <h3 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight mb-2">
                    {t('Featured.prop_name')}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-5 h-5" />
                    <span className="text-lg">{t('Featured.prop_loc')}</span>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end gap-4">
                  <div className="text-left md:text-right">
                    <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold mb-1">{t('Featured.price_label')}</p>
                    <p className="text-3xl sm:text-4xl font-bold text-white">{t('Featured.price')}</p>
                  </div>
                  <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-full h-12 px-8 font-semibold text-base transition-all hover:scale-105">
                    {t('Featured.btn')}
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3. SECTION 3: HOW HOMELINK VERIFY (Timeline) */}
      <section className="py-24 sm:py-32 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <FadeIn>
              <div className="max-w-xl">
                <Badge variant="outline" className="mb-6 border-slate-300 text-slate-600 bg-white">{t('Verification.badge')}</Badge>
                <h2 className="text-3xl sm:text-5xl font-semibold text-slate-900 tracking-tight leading-tight mb-6">
                  {t('Verification.title_1')}<span className="text-primary">{t('Verification.title_2')}</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-10">
                  {t('Verification.subtitle')}
                </p>

                <div className="space-y-8">
                  {/* Timeline Item 1 */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center z-10 border-4 border-slate-50">
                        <FileCheck className="w-5 h-5 text-primary" />
                      </div>
                      <div className="w-[2px] h-full bg-slate-200 -my-2" />
                    </div>
                    <div className="pb-8">
                      <h4 className="text-xl font-semibold text-slate-900 mb-2">{t('Verification.step1_title')}</h4>
                      <p className="text-slate-500">{t('Verification.step1_desc')}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Item 2 */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center z-10 border-4 border-slate-50">
                        <Camera className="w-5 h-5 text-indigo-700" />
                      </div>
                      <div className="w-[2px] h-full bg-slate-200 -my-2" />
                    </div>
                    <div className="pb-8">
                      <h4 className="text-xl font-semibold text-slate-900 mb-2">{t('Verification.step2_title')}</h4>
                      <p className="text-slate-500">{t('Verification.step2_desc')}</p>
                    </div>
                  </div>

                  {/* Timeline Item 3 */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center z-10 border-4 border-slate-50">
                        <ShieldCheck className="w-5 h-5 text-emerald-700" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-slate-900 mb-2">{t('Verification.step3_title')}</h4>
                      <p className="text-slate-500">{t('Verification.step3_desc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Visualizer */}
            <FadeIn delay={0.2} className="relative h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop"
                alt="Verification process"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-slate-900/20" />
              <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-semibold">{t('Verification.visual_doc')}</p>
                  <p className="text-slate-900 font-bold">{t('Verification.visual_status')}</p>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* 4. SECTION 4: PROPERTY CATEGORY (Interactive) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight mb-12">
              {t('Categories.title')}
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {[
                { icon: Hotel, label: t("Categories.cat_penthouse") },
                { icon: Palmtree, label: t("Categories.cat_villa") },
                { icon: Building, label: t("Categories.cat_apartment") },
                { icon: Map, label: t("Categories.cat_land") }
              ].map((cat, idx) => (
                <Link key={idx} href="/search-result" className="group flex flex-col items-center gap-3 w-32 sm:w-40 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-md transition-all">
                    <cat.icon className="w-8 h-8 text-slate-700 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                  </div>
                  <span className="font-medium text-slate-600 group-hover:text-slate-900">{cat.label}</span>
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 5. SECTION 5: AI INSTANT VALUATION (Live Demo) */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        {/* Abstract Background Blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Live Demo UI Card */}
            <FadeIn className="order-2 lg:order-1 relative">
              <div className="bg-slate-800/50 backdrop-blur-2xl border border-slate-700/50 rounded-3xl p-6 sm:p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-6 border-b border-slate-700/50 pb-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden relative shrink-0">
                    <Image src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" alt="House" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{t('AIValuation.demo_title')}</h4>
                    <p className="text-slate-400 text-sm">{t('AIValuation.demo_time')}</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                      <BrainCircuit className="w-3 h-3 mr-1" /> {t('AIValuation.demo_badge')}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-slate-400 text-sm mb-2 font-medium">{t('AIValuation.demo_est_label')}</p>
                    <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-2">{t('AIValuation.demo_est_price')}</div>
                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                      <TrendingUp className="w-4 h-4" />
                      <span>{t('AIValuation.demo_vs')}</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="flex justify-between text-sm text-slate-400 mb-2 font-medium">
                      <span>{t('AIValuation.demo_acc_label')}</span>
                      <span className="text-white font-bold">{t('AIValuation.demo_acc_val')}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 w-[{t('AIValuation.demo_acc_val')}]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative floating element */}
              <div className="absolute -right-6 -bottom-6 bg-slate-800 border border-slate-700 p-4 rounded-2xl shadow-xl hidden sm:block animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-white">{t('AIValuation.demo_float_title')}</p>
                    <p className="text-slate-400 text-xs">{t('AIValuation.demo_float_desc')}</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Text Content */}
            <FadeIn delay={0.2} className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-tight mb-6">
                {t('AIValuation.title_1')}<br/>
                <span className="text-blue-400">{t('AIValuation.title_2')}</span>
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                {t('AIValuation.desc')}
              </p>
              <Button className="rounded-full bg-primary hover:bg-slate-500 text-white font-semibold h-14 px-8 text-lg shadow-lg shadow-blue-900/50 transition-all hover:-translate-y-1">
                {t('AIValuation.btn')}
              </Button>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* 6. SECTION 6: EXCLUSIVE COLLECTION (The Gallery) */}
      <section className="py-24 sm:py-32 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight mb-4">
                  {t('Collection.title')}
                </h2>
                <p className="text-lg text-slate-500">
                  {t('Collection.desc')}
                </p>
              </div>
              <Button asChild variant="outline" className="hidden sm:flex border-slate-300 text-slate-700 hover:bg-slate-100 rounded-full font-semibold px-6">
                <Link href="/search-result">
                  {t('Collection.btn')} <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </FadeIn>

          <ContextualCollectionsTabs />

          <Suspense fallback={<SkeletonGrid />}>
            <FeaturedPropertiesGrid />
          </Suspense>
        </div>
      </section>

      {/* 7. SECTION 7: PROPERTY INSIGHT (The Authority) */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight mb-6">
                {t('Insight.title')}
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {t('Insight.desc')}
              </p>
              <ul className="space-y-4 mb-10">
                {[t('Insight.feat_1'), t('Insight.feat_2'), t('Insight.feat_3')].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="link" className="text-primary px-0 text-lg font-semibold hover:no-underline hover:text-primary flex items-center">
                {t('Insight.btn')} <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </FadeIn>
            
            <FadeIn delay={0.2} className="relative h-[400px] w-full rounded-3xl bg-slate-50 border border-slate-100 shadow-inner p-8 flex flex-col justify-center items-center overflow-hidden">
               {/* Abstract chart graphic */}
               <div className="w-full h-full relative">
                 <div className="absolute bottom-0 left-0 w-full h-[60%] border-b-2 border-l-2 border-slate-200">
                    {/* Simulated bars */}
                    <div className="absolute bottom-0 left-[10%] w-[10%] h-[40%] bg-slate-200 rounded-t-sm" />
                    <div className="absolute bottom-0 left-[30%] w-[10%] h-[60%] bg-blue-200 rounded-t-sm" />
                    <div className="absolute bottom-0 left-[50%] w-[10%] h-[50%] bg-slate-200 rounded-t-sm" />
                    <div className="absolute bottom-0 left-[70%] w-[10%] h-[90%] bg-primary rounded-t-sm shadow-[0_0_20px_rgba(37,99,235,0.4)]" />
                 </div>
                 {/* Floating Tooltip */}
                 <div className="absolute top-[15%] right-[10%] bg-white p-3 rounded-xl shadow-lg border border-slate-100">
                    <p className="text-xs text-slate-400 font-bold uppercase">{t('Insight.visual_label')}</p>
                    <p className="text-lg font-bold text-slate-900">{t('Insight.visual_val')}</p>
                 </div>
               </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 8. SECTION 8: BECOME OWNER CTA (The Conversion) */}
      <section className="relative py-32 sm:py-40 flex items-center justify-center overflow-hidden">
        {/* Background Image: Aerial Drone View */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="Cityscape"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
          <FadeIn>
            <div className="w-16 h-16 mx-auto bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20">
              <Key className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl sm:text-6xl font-semibold text-white tracking-tight mb-6">
              {t('CTA.title')}
            </h2>
            <p className="text-xl text-slate-300 mb-12 font-light leading-relaxed max-w-2xl mx-auto">
              {t('CTA.desc')}
            </p>
            <Button asChild size="lg" className="rounded-full bg-white text-slate-900 hover:bg-slate-100 font-semibold h-16 px-10 text-lg shadow-2xl transition-transform hover:scale-105">
              <Link href="/owner/properties/new">
                {t('CTA.btn')}
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Sticky Mobile CTA is kept for practical UX */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-xl border-t border-slate-200 shadow-2xl sm:hidden z-50 flex gap-3 animate-in slide-in-from-bottom">
        <Button asChild className="flex-1 rounded-full bg-slate-900 hover:bg-slate-800 text-white h-12 text-base font-semibold">
          <Link href="/search-result">{t('MobileCTA.btn')}</Link>
        </Button>
      </div>

    </div>
  );
}
