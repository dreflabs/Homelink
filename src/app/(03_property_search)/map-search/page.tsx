import React from "react"
import { PropertyCard } from "@/components/shared/PropertyCard"
import { Map, List, SlidersHorizontal, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AiSearchSection } from "@/components/shared/property/AiSearchSection"

import { searchProperties } from "@/actions/property";

export default async function MapSearchPage({ searchParams }: { searchParams: any }) {
  const resolvedParams = await searchParams || {}
  
  let properties: any[] = []
  try {
    const searchResult = await searchProperties(resolvedParams as any) as any
    properties = searchResult.data ? searchResult.data : Array.isArray(searchResult) ? searchResult : []
  } catch (error) {
    console.error(error)
  }

  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-white">
      {/* MAP SECTION - 60% (Desktop) */}
      <div className="hidden lg:flex lg:w-[60%] relative flex-col border-r border-slate-200 bg-white">
        <div className="absolute top-4 left-4 z-10">
          <Button variant="outline" className="bg-white shadow-sm flex items-center gap-2 rounded-full px-4 border-slate-200 hover:bg-slate-50">
            <SlidersHorizontal className="w-4 h-4 text-slate-900" />
            <span className="font-medium">Filter</span>
          </Button>
        </div>
        
        {/* Mockup Map Placeholder */}
        <div className="flex-1 flex flex-col items-center justify-center border-4 border-dashed border-slate-200 m-4 rounded-2xl bg-slate-50">
          <MapPin className="w-12 h-12 text-slate-400 mb-4" />
          <p className="text-xl font-semibold text-slate-500">Interactive Map Placeholder</p>
          <p className="text-sm text-slate-400 mt-2">Mapbox / Leaflet integration will go here</p>
        </div>
      </div>

      {/* LIST SECTION - 40% (Desktop) / 100% (Mobile) */}
      <div className="w-full lg:w-[40%] flex flex-col bg-[#F7F9FC]">
        {/* Header / Mobile Controls */}
        <div className="flex items-center justify-between p-4 bg-white border-b border-slate-200 shrink-0">
          <div>
            <h1 className="text-lg font-bold text-slate-900">Properti di Area Ini</h1>
            <p className="text-sm text-slate-500">{properties.length} properti ditemukan</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="lg:hidden flex items-center gap-2 border-slate-200">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filter</span>
            </Button>
            
            {/* View Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button 
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md bg-white shadow-sm text-blue-700"
                aria-pressed="true"
              >
                <List className="w-4 h-4" />
                <span>List</span>
              </button>
              <button 
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md text-slate-600 hover:text-slate-900 lg:hidden"
                aria-pressed="false"
              >
                <Map className="w-4 h-4" />
                <span>Map</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
          <AiSearchSection />
          
          <div>
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Semua Properti</h2>
            <div className="grid grid-cols-1 gap-4">
              {properties.map(property => (
                <PropertyCard 
                    key={property.id} 
                    id={property.id}
                    title={property.title}
                    price={property.price}
                    address={`${property.city}, ${property.district}`}
                    specs={{
                      bed: property.bedrooms || 0,
                      bath: property.bathrooms || 0,
                      area: property.buildingArea || 0
                    }}
                    imageUrl={property.media?.[0]?.s3Url || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"}
                    isVerified={property.status === "ACTIVE"}
                  />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
