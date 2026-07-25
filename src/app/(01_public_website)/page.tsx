import React from "react"
import { SearchHeroWrapper } from "@/components/shared/SearchHeroWrapper"
import { PropertyCard } from "@/components/shared/PropertyCard"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { getActiveBanners, getPublishedTestimonials } from "@/actions/cms"
import Image from "next/image"

export default async function HomePage() {
  const featuredProperties = await prisma.property.findMany({
    where: { status: 'FULLY_VERIFIED' },
    take: 8,
    include: { media: true }
  })
  
  const banners = await getActiveBanners();
  const testimonials = await getPublishedTestimonials();
  
  // Dummy server action to redirect on search
  async function handleSearch(data: FormData) {
    "use server"
    const query = data.get("query")?.toString() || ""
    redirect(`/search-result?q=${encodeURIComponent(query)}`)
  }

  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-slate-900/50" /> {/* Overlay overlay */}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center mt-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-md">
            Temukan Properti Impian Anda
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl drop-shadow-sm">
            Lebih dari 10.000 properti terverifikasi di seluruh Indonesia. Aman, transparan, dan terpercaya.
          </p>
          
          <div className="w-full max-w-4xl">
            <SearchHeroWrapper />
          </div>
        </div>
      </section>

      {/* Banners Section */}
      {banners.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto gap-6 snap-x snap-mandatory pb-4 hide-scrollbar">
              {banners.map((banner) => (
                <div key={banner.id} className="min-w-[300px] md:min-w-[400px] lg:min-w-[600px] h-[200px] md:h-[250px] relative rounded-2xl overflow-hidden shadow-sm snap-center flex-shrink-0 group cursor-pointer">
                  <Image src={banner.imageUrl} alt={banner.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <h3 className="text-white font-semibold text-lg md:text-xl">{banner.title}</h3>
                  </div>
                  {banner.linkUrl && (
                    <a href={banner.linkUrl} className="absolute inset-0 z-10" target="_blank" rel="noreferrer">
                      <span className="sr-only">Go to link</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Properties Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-3">Properti Unggulan</h2>
              <p className="text-slate-600 text-lg">Pilihan properti terbaik yang telah diverifikasi oleh tim HomeLink.</p>
            </div>
            <Button variant="outline" className="hidden md:flex items-center gap-2 text-blue-700 border-blue-700 hover:bg-blue-50">
              Lihat Semua Properti
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProperties.map(prop => (
              <PropertyCard 
                key={prop.id} 
                id={prop.id}
                title={prop.title}
                price={Number(prop.price)}
                address={prop.address}
                specs={{ bed: 0, bath: 0, area: 0 }}
                imageUrl={prop.media?.[0]?.s3Url || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop"}
                isVerified={prop.status === 'FULLY_VERIFIED'}
                isFeatured={true}
              />
            ))}
          </div>

          <div className="mt-10 flex justify-center md:hidden">
            <Button variant="outline" className="w-full items-center gap-2 text-blue-700 border-blue-700 hover:bg-blue-50">
              Lihat Semua Properti
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-3">Apa Kata Mereka</h2>
              <p className="text-slate-600 text-lg">Cerita dari pengguna setia HomeLink 2.0</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testi) => (
                <div key={testi.id} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 relative">
                  <div className="flex items-center gap-1 mb-4 text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < testi.rating ? 'fill-current' : 'text-slate-300'}`} />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-6 italic leading-relaxed">
                    "{testi.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                      {testi.authorName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{testi.authorName}</h4>
                      <p className="text-sm text-slate-500">{testi.authorRole}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
