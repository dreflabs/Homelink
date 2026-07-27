import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, UserRound, Target, Shield, Heart } from "lucide-react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Pelajari visi, misi, dan dedikasi tim HomeLink 2.0 dalam membangun platform properti paling tepercaya dan terverifikasi di Indonesia.",
  openGraph: {
    title: "Tentang HomeLink 2.0 - Membangun Kepercayaan di Real Estate",
    description: "Kenali tim di balik inovasi properti bebas ghost-listing.",
    url: "https://homelink.id/about-us",
    locale: "id_ID",
    type: "website",
  }
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20">
      {/* Hero Section - Immersive Premium Aesthetic */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-48 md:pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
          <h1 className="text-5xl md:text-7xl lg:text-[80px] font-semibold tracking-tighter text-slate-900 leading-[1.05]">
            Mendefinisikan Ulang <br className="hidden md:block" />
            <span className="text-slate-500">Standar Properti Indonesia.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Kami membangun fondasi kepercayaan, transparansi, dan pengalaman tanpa hambatan di pasar properti.
          </p>
          <div className="pt-8">
            <Button size="lg" className="bg-slate-900 text-white rounded-full px-8 py-6 text-base font-medium shadow-sm hover:scale-105 transition-transform duration-300">
              Bergabung Bersama Kami <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
            </Button>
          </div>
        </div>
        
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      </section>

      {/* Vision & Mission - Minimalist Bento Grid Style */}
      <section className="py-24 lg:py-32 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter leading-[1.05] text-slate-900">Pilar Utama Kami</h2>
            <p className="text-lg text-slate-500">
              Semua yang kami lakukan berpedoman pada prinsip fundamental ini. Kami tidak sekadar merancang perangkat lunak; kami membangun kepercayaan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Kepercayaan Mutlak", desc: "Keamanan dan transparansi tertanam dalam setiap transaksi, menjamin ketenangan pikiran Anda." },
              { icon: Target, title: "Akurasi Tanpa Kompromi", desc: "Hanya properti terverifikasi. Kami membuang kebohongan agar Anda menemukan yang nyata." },
              { icon: Heart, title: "Desain Berpusat Pada Manusia", desc: "Teknologi harus melayani manusia, bukan sebaliknya. Empati mendorong desain kami." }
            ].map((pillar, i) => (
              <Card key={i} className="border-none bg-white shadow-card hover:shadow-card-hover transition-all duration-300 group rounded-[2rem]">
                <CardContent className="p-10 flex flex-col items-center text-center space-y-6">
                  <div className="p-4 bg-primary/5 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                    <pillar.icon className="w-8 h-8 text-primary group-hover:text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 tracking-tight">{pillar.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{pillar.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Mockup Section - Premium Aesthetic */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter leading-[1.05] text-slate-900">
                Temui pemikir <br />
                <span className="text-slate-400">di balik layar.</span>
              </h2>
              <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
                Sekelompok ahli dari berbagai disiplin ilmu mulai dari teknologi, desain, hingga pakar real estate yang bersatu dengan satu tujuan: membuat transaksi properti lebih mulus.
              </p>
              <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-base">
                Lihat Lowongan Terbuka
              </Button>
            </div>
            
            <div className="flex-1 w-full grid grid-cols-2 gap-4">
              {/* Aesthetic Mockup Grid */}
              <div className="space-y-4 translate-y-12">
                <div className="aspect-[4/5] rounded-3xl bg-muted/40 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <p className="text-white font-medium">Budi Santoso</p>
                      <p className="text-white/70 text-sm">Head of Design</p>
                    </div>
                  </div>
                  <div className="w-full h-full bg-[url('/about_office.jpg')] bg-cover bg-center mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
                </div>
                <div className="aspect-square rounded-3xl bg-muted/40 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <p className="text-white font-medium">Andi Wijaya</p>
                      <p className="text-white/70 text-sm">Lead Engineer</p>
                    </div>
                  </div>
                  <div className="w-full h-full bg-[url('/about_office.jpg')] bg-cover bg-center mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="aspect-square rounded-3xl bg-muted/40 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <p className="text-white font-medium">Siti Rahmawati</p>
                      <p className="text-white/70 text-sm">Chief Executive Officer</p>
                    </div>
                  </div>
                  <div className="w-full h-full bg-[url('/about_office.jpg')] bg-cover bg-center mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
                </div>
                <div className="aspect-[4/5] rounded-3xl bg-muted/40 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <p className="text-white font-medium">Reza Pratama</p>
                      <p className="text-white/70 text-sm">Product Manager</p>
                    </div>
                  </div>
                  <div className="w-full h-full bg-[url('/about_office.jpg')] bg-cover bg-center mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
