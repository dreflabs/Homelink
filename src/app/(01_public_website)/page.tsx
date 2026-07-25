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
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  PlusCircle, 
  Building2, 
  TrendingUp, 
  Bot,
  Search,
  Lock
} from "lucide-react";
import prisma from "@/lib/prisma";
import { getActiveBanners, getPublishedTestimonials } from "@/actions/cms";

// ISR Caching - Revalidate every 60 seconds
export const revalidate = 60;

export const metadata: Metadata = {
  title: "HomeLink 2.0 | Platform Properti Terverifikasi #1 di Indonesia",
  description: "Temukan lebih dari 10.000 properti terverifikasi di seluruh Indonesia. Jaminan 100% bebas ghost listing, transparan, dan dilengkapi AI Instant Valuation.",
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
  // Parallel Data Fetching with Promise.all
  const [featuredProperties, banners, testimonials] = await Promise.all([
    prisma.property.findMany({
      where: { status: "FULLY_VERIFIED" },
      take: 8,
      orderBy: { createdAt: "desc" },
      include: { media: true },
    }).catch(() => []),
    getActiveBanners().catch(() => []),
    getPublishedTestimonials().catch(() => []),
  ]);

  return (
    <div className="flex flex-col bg-slate-50 min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative w-full h-[65vh] min-h-[550px] flex items-center justify-center overflow-hidden">
        {/* Optimized Next.js Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&auto=format&fit=crop"
            alt="HomeLink Hero Background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[1px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center mt-8">
          <FadeIn direction="down" delay={0.05}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm font-medium mb-6 shadow-sm">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>Platform Properti #1 Terverifikasi & Bebas Ghost Listing</span>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-md tracking-tight leading-tight max-w-4xl">
              Temukan Properti Impian Tanpa Khawatir Iklan Palsu
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.15}>
            <p className="text-base md:text-xl text-slate-200 mb-8 max-w-2xl font-normal drop-shadow-sm leading-relaxed">
              Setiap properti diinspeksi secara langsung oleh tim surveyor independen dan divalidasi legalitasnya.
            </p>
          </FadeIn>
          
          <FadeIn direction="up" delay={0.2} className="w-full max-w-4xl">
            <SearchHeroWrapper />
          </FadeIn>
        </div>
      </section>

      {/* 2. Key Pillars & Value Proposition Section */}
      <section className="py-12 bg-white border-b border-slate-200/80">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <FadeIn delay={0.1} className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-700 shrink-0">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-1">100% Verified Property</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Inspeksi fisik 2-Step di lapangan oleh surveyor independen. Bebas foto palsu dan info menyesatkan.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-1">Zero Ghost Listing Guarantee</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Jaminan tidak ada listing fiktif. Seluruh harga dan ketersediaan properti terhubung langsung dengan pemilik.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="p-3 rounded-xl bg-indigo-100 text-indigo-700 shrink-0">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-1">AI Instant Valuation</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Estimasi harga pasar akurat menggunakan Machine Learning berdasarkan transaksi riil di sekitarnya.
                </p>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* 3. Banners Section */}
      {banners.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto gap-6 snap-x snap-mandatory pb-4 hide-scrollbar">
              {banners.map((banner) => (
                <div key={banner.id} className="min-w-[300px] md:min-w-[400px] lg:min-w-[600px] h-[200px] md:h-[250px] relative rounded-2xl overflow-hidden shadow-sm snap-center flex-shrink-0 group cursor-pointer">
                  <Image src={banner.imageUrl} alt={banner.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 300px, 600px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <h3 className="text-white font-semibold text-lg md:text-xl">{banner.title}</h3>
                  </div>
                  {banner.linkUrl && (
                    <a href={banner.linkUrl} className="absolute inset-0 z-10" target="_blank" rel="noreferrer" aria-label={`Lihat promo: ${banner.title}`}>
                      <span className="sr-only">Lihat promo {banner.title}</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Featured Properties Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <FadeIn delay={0.1}>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 mb-3">
                  <Building2 className="h-3.5 w-3.5" />
                  <span>Koleksi Terpilih</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Properti Unggulan Terverifikasi</h2>
                <p className="text-slate-600 text-base md:text-lg mt-2">Pilihan properti terbaik yang telah lolos verifikasi fisik & legalitas.</p>
              </div>
              <Button variant="outline" asChild className="hidden md:flex items-center gap-2 text-blue-700 border-blue-700 hover:bg-blue-50 rounded-full px-6 font-semibold">
                <Link href="/properties/search">
                  Lihat Semua Properti
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </FadeIn>

          {featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 max-w-2xl mx-auto">
              <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Belum Ada Properti Unggulan</h3>
              <p className="text-slate-600 text-sm mb-6">Properti terverifikasi terbaru sedang dalam proses verifikasi tim surveyor.</p>
              <Button asChild className="rounded-full bg-blue-700 hover:bg-blue-800 text-white px-6">
                <Link href="/properties/search">Jelajahi Semua Listing</Link>
              </Button>
            </div>
          )}

          <div className="mt-10 flex justify-center md:hidden">
            <Button variant="outline" asChild className="w-full items-center justify-center gap-2 text-blue-700 border-blue-700 hover:bg-blue-50 rounded-full py-6 font-semibold">
              <Link href="/properties/search">
                Lihat Semua Properti
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 5. AI Valuation & Owner Acquisition Banner */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <FadeIn direction="right">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold backdrop-blur-md">
                  <Bot className="h-4 w-4" />
                  <span>Fitur AI Valuation Teknologi Masa Depan</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white">
                  Ingin Tahu Berapa Harga Pasar Properti Anda?
                </h2>
                <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                  Gunakan kecerdasan buatan HomeLink 2.0 untuk menghitung taksiran nilai jual properti Anda secara instan dan gratis berdasarkan data pasar terkini.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 shadow-lg shadow-blue-600/30">
                    <Link href="/ai/valuation">Cek Estimasi Harga AI</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full border-slate-700 text-white hover:bg-slate-800 font-semibold px-8">
                    <Link href="/owner/properties/new">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Pasang Iklan Properti
                    </Link>
                  </Button>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" className="relative flex justify-center">
              <div className="w-full max-w-md p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-600 text-white">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-300 block">Prediksi AI Live</span>
                      <span className="text-sm font-bold text-white">Estimasi Harga Pasar</span>
                    </div>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">Akurat 98%</Badge>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Lokasi Properti</span>
                    <span className="font-semibold text-white">Jakarta Selatan</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Tipe & Luas</span>
                    <span className="font-semibold text-white">Rumah • 150 m²</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-blue-600/20 border border-blue-500/30 mt-4 text-center">
                    <span className="text-xs text-blue-200 uppercase tracking-wider font-semibold block mb-1">Rekomendasi Harga Pasar</span>
                    <span className="text-2xl font-extrabold text-blue-300">Rp 2.450.000.000</span>
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="container mx-auto px-4">
            <FadeIn delay={0.1}>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 mb-3">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span>Testimoni Pengguna</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Apa Kata Mereka</h2>
                <p className="text-slate-600 text-lg mt-2">Pengalaman bertransaksi di HomeLink 2.0 dari pembeli & pemilik properti.</p>
              </div>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testi, idx) => (
                <FadeIn key={testi.id} delay={0.1 * (idx + 1)}>
                  <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 shadow-sm relative h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 mb-4 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < testi.rating ? 'fill-current' : 'text-slate-300'}`} aria-hidden="true" />
                        ))}
                      </div>
                      <p className="text-slate-700 mb-6 italic leading-relaxed text-base">
                        "{testi.content}"
                      </p>
                    </div>
                    <div className="flex items-center gap-4 pt-4 border-t border-slate-200/60">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                        {testi.authorName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{testi.authorName}</h4>
                        <p className="text-sm text-slate-500">{testi.authorRole}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
