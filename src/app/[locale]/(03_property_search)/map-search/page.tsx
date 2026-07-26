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
        
        {/* Interactive Map (OSM Embed as stub) */}
        <div className="flex-1 relative m-4 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200">
          <iframe 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            scrolling="no" 
            marginHeight={0} 
            marginWidth={0} 
            src="https://www.openstreetmap.org/export/embed.html?bbox=106.7%2C-6.3%2C106.9%2C-6.1&amp;layer=mapnik" 
            style={{ border: 0 }}
            title="Map Search"
          ></iframe>
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-200 z-10 flex items-center justify-between">
             <div>
               <p className="font-semibold text-sm text-slate-900">Mapbox / Google Maps API Placeholder</p>
               <p className="text-xs text-slate-500">Currently using OpenStreetMap for demo purposes.</p>
             </div>
             <Button size="sm">Hubungkan API</Button>
          </div>
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
            {properties.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {properties.map(property => (
                  <PropertyCard 
                      key={property.id} 
                      id={property.id}
                      title={property.title}
                      price={property.price}
                      address={`${property.city || ''}, ${property.district || ''}`}
                      specs={{
                        bed: property.bedrooms || 0,
                        bath: property.bathrooms || 0,
                        area: property.buildingArea || 0
                      }}
                      imageUrl={property.media?.[0]?.s3Url || "/property_1.jpg"}
                      isVerified={property.status === "ACTIVE"}
                    />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
                <MapPin className="w-10 h-10  mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-900 mb-1">Tidak Ada Properti Ditemukan</h3>
                <p className="text-xs text-slate-500">Coba ubah kata kunci atau area pencarian Anda.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
