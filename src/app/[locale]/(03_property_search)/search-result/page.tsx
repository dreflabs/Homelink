import React, { Suspense } from "react"
import { SearchHeroWrapper } from "@/components/shared/SearchHeroWrapper"
import { FilterSidebar } from "@/components/shared/FilterSidebar"
import { PropertyCard } from "@/components/shared/PropertyCard"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPinOff, Sparkles, Building, Train, BedDouble } from "lucide-react"
import { AiSearchSection } from "@/components/shared/property/AiSearchSection"
import { AiRecommendationPanel } from "@/components/shared/property/AiRecommendationPanel"

import { searchProperties } from "@/actions/property";
import { getTranslations } from "next-intl/server";

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
  const t = await getTranslations("PropertySearch.SearchResult");
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
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-16 z-40 py-4 shadow-float">
        <div className="container mx-auto px-4 max-w-7xl">
          <SearchHeroWrapper isCompact />
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-24 lg:py-32 flex items-start gap-8">
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
            
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 tracking-tighter leading-[1.05] mb-2">
                    {q ? t("searchResultFor", { query: q }) : t("propertiesForSale")}
                  </h1>
                  <p className="text-slate-500 text-sm font-medium flex items-center gap-2">
                    <span className="text-slate-900 font-semibold">{t("verifiedProperties", { count: filteredProperties.length })}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span>{t("realTimeUpdates")}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
                  <button className="px-4 py-1.5 rounded-lg bg-white shadow-sm text-sm font-semibold text-slate-900">{t("list")}</button>
                  <button className="px-4 py-1.5 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">{t("map")}</button>
                </div>
              </div>

              {/* Sorting Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                <span className="text-sm text-slate-400 font-medium mr-2 shrink-0">{t("sortBy")}</span>
                <button className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-sm font-medium shrink-0">{t("relevance")}</button>
                <button className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 text-sm font-medium transition-colors shrink-0">{t("newest")}</button>
                <button className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 text-sm font-medium transition-colors shrink-0">{t("lowestPrice")}</button>
                <button className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 text-sm font-medium transition-colors shrink-0">{t("highestPrice")}</button>
                <button className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 text-sm font-medium transition-colors shrink-0 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} /> {t("aiRecommendation")}
                </button>
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
                    imageUrl={prop.media?.[0]?.s3Url || "/property_1.jpg"}
                    isVerified={prop.status === "ACTIVE"}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center border border-slate-100 rounded-3xl bg-white shadow-sm px-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-5">
                  <MapPinOff className="w-8 h-8 text-slate-400" strokeWidth={1.75} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t("noResultsFound")}</h3>
                <p className="text-slate-500 max-w-md mb-8">
                  {t("noResultsDesc")}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg mb-8">
                  <button className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all text-left bg-slate-50/50 group">
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform text-slate-600 group-hover:text-[#2563EB]"><Building className="w-4 h-4" strokeWidth={1.75} /></div>
                    <span className="text-sm font-medium text-slate-700">{t("rec1")}</span>
                  </button>
                  <button className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all text-left bg-slate-50/50 group">
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform text-slate-600 group-hover:text-[#2563EB]"><Train className="w-4 h-4" strokeWidth={1.75} /></div>
                    <span className="text-sm font-medium text-slate-700">{t("rec2")}</span>
                  </button>
                  <button className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all text-left bg-slate-50/50 group">
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform text-slate-600 group-hover:text-[#2563EB]"><BedDouble className="w-4 h-4" strokeWidth={1.75} /></div>
                    <span className="text-sm font-medium text-slate-700">{t("rec3")}</span>
                  </button>
                  <button className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all text-left bg-slate-50/50 group">
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform text-indigo-500 group-hover:text-indigo-600"><Sparkles className="w-4 h-4" strokeWidth={1.75} /></div>
                    <span className="text-sm font-medium text-slate-700">{t("rec4")}</span>
                  </button>
                </div>

                <button className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-semibold shadow-sm transition-all text-sm">
                  {t("resetAllFilters")}
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
