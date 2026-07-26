import React, { Suspense } from "react"
import { SearchHeroWrapper } from "@/components/shared/SearchHeroWrapper"
import { FilterSidebar } from "@/components/shared/FilterSidebar"
import { PropertyCard } from "@/components/shared/PropertyCard"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPinOff } from "lucide-react"
import { AiSearchSection } from "@/components/shared/property/AiSearchSection"
import { AiRecommendationPanel } from "@/components/shared/property/AiRecommendationPanel"

import { searchProperties } from "@/actions/property";

interface SearchResultPageProps {
  searchParams: Promise<{
    q?: string
    minPrice?: string
    maxPrice?: string
    city?: string
    bedrooms?: string
    cursor?: string
  }>
}

export default async function SearchResultPage({ searchParams }: SearchResultPageProps) {
  // Await searchParams in Next.js 15+ (App Router)
  const resolvedSearchParams = await searchParams
  
  const q = resolvedSearchParams.q?.toLowerCase() || ""
  
  // Call Server Action
  let filteredProperties: any[] = []
  try {
    const searchResult = await searchProperties({
      query: resolvedSearchParams.q,
      minPrice: resolvedSearchParams.minPrice ? Number(resolvedSearchParams.minPrice) : undefined,
      maxPrice: resolvedSearchParams.maxPrice ? Number(resolvedSearchParams.maxPrice) : undefined,
    } as any) as any
    filteredProperties = searchResult.data ? searchResult.data : Array.isArray(searchResult) ? searchResult : []
  } catch (error) {
    console.error(error)
  }


  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-12">
      {/* Search Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-16 z-40 py-4 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <SearchHeroWrapper isCompact />
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-8 flex items-start gap-8">
        <div className="flex w-full flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-32 h-fit">
            <Suspense fallback={<Skeleton className="w-full h-96 rounded-3xl" />}>
              <FilterSidebar />
            </Suspense>
          </aside>

          {/* Results Grid */}
          <section className="flex-1 min-w-0">
            <AiSearchSection />
            <AiRecommendationPanel />
            
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {q ? `Hasil pencarian untuk "${q}"` : "Properti Dijual"}
                </h1>
                <p className="text-slate-500 mt-1 text-sm font-medium">
                  Menampilkan {filteredProperties.length} properti terverifikasi
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">Urutkan:</span>
                <select className="text-sm font-medium text-slate-900 bg-transparent border-none focus:ring-0 cursor-pointer outline-none hover:text-blue-700 transition-colors">
                  <option>Relevansi</option>
                  <option>Terbaru</option>
                  <option>Harga: Rendah ke Tinggi</option>
                  <option>Harga: Tinggi ke Rendah</option>
                </select>
              </div>
            </div>

            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map(prop => (
                  <PropertyCard 
                    key={prop.id} 
                    id={prop.id}
                    title={prop.title}
                    price={prop.price}
                    address={`${prop.city}, ${prop.district}`}
                    specs={{
                      bed: prop.bedrooms || 0,
                      bath: prop.bathrooms || 0,
                      area: prop.buildingArea || 0
                    }}
                    imageUrl={prop.media?.[0]?.s3Url || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"}
                    isVerified={prop.status === "ACTIVE"}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center border border-slate-200 rounded-3xl bg-white shadow-sm">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <MapPinOff className="w-10 h-10 "  />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Properti Tidak Ditemukan</h3>
                <p className="text-slate-500 max-w-md mb-6">
                  Maaf, tidak ada properti yang cocok dengan filter pencarian Anda. Silakan ubah filter atau gunakan kata kunci lain.
                </p>
                <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-sm transition-all focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
                  Reset Pencarian
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
