"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { searchProperties } from "@/actions/property";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { AiSearchSection } from "@/components/shared/property/AiSearchSection";
import { Map, List, SlidersHorizontal, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import the map dynamically since it uses window object
const InteractiveMap = dynamic(
  () => import("@/components/shared/property/InteractiveMap").then((mod) => mod.InteractiveMap),
  { ssr: false, loading: () => <div className="w-full h-full bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center text-slate-400">Loading Map...</div> }
);

interface MapClientWrapperProps {
  initialProperties: any[];
  t: any;
  initialParams: any;
}

export function MapClientWrapper({ initialProperties, t, initialParams }: MapClientWrapperProps) {
  const [properties, setProperties] = useState<any[]>(initialProperties);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"map" | "list">("map");

  const handleBoundsChange = async (bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number }) => {
    setLoading(true);
    try {
      // Debounced call to server action
      const searchResult = await searchProperties({
        ...initialParams,
        ...bounds,
      });
      setProperties(searchResult as any[]);
    } catch (error) {
      console.error("Failed to fetch properties by bounds", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-white">
      {/* MAP SECTION - 60% (Desktop) */}
      <div className={`lg:flex lg:w-[60%] relative flex-col border-r border-slate-200 bg-white ${view === "map" ? "flex w-full" : "hidden"}`}>
        <div className="absolute top-4 left-4 z-10">
          <Button variant="outline" className="bg-white shadow-sm flex items-center gap-2 rounded-full px-4 border-slate-200 hover:bg-slate-50">
            <SlidersHorizontal className="w-4 h-4 text-slate-900" />
            <span className="font-medium">{t.filter}</span>
          </Button>
        </div>
        
        <div className="flex-1 relative m-4 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200">
          <InteractiveMap 
            properties={properties.map(p => ({
              id: p.id,
              title: p.title,
              price: p.price,
              latitude: p.latitude,
              longitude: p.longitude,
            }))}
            onBoundsChange={handleBoundsChange}
          />
        </div>
      </div>

      {/* LIST SECTION - 40% (Desktop) / 100% (Mobile) */}
      <div className={`w-full lg:w-[40%] lg:flex flex-col bg-slate-50 ${view === "list" ? "flex" : "hidden"}`}>
        {/* Header / Mobile Controls */}
        <div className="flex items-center justify-between p-4 bg-white border-b border-slate-200 shrink-0">
          <div>
            <h1 className="text-lg font-bold text-slate-900">{t.propertiesInArea}</h1>
            <p className="text-sm text-slate-500">
              {loading ? "Searching..." : t.propertiesFound.replace("{count}", properties.length.toString())}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="lg:hidden flex items-center gap-2 border-slate-200">
              <SlidersHorizontal className="w-4 h-4" />
              <span>{t.filter}</span>
            </Button>
            
            {/* View Toggle (Mobile Only) */}
            <div className="flex lg:hidden bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button 
                onClick={() => setView("list")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md ${view === "list" ? "bg-white shadow-sm text-primary" : "text-slate-600 hover:text-slate-900"}`}
              >
                <List className="w-4 h-4" />
                <span>{t.list}</span>
              </button>
              <button 
                onClick={() => setView("map")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md ${view === "map" ? "bg-white shadow-sm text-primary" : "text-slate-600 hover:text-slate-900"}`}
              >
                <Map className="w-4 h-4" />
                <span>{t.map}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
          <AiSearchSection />
          
          <div className={loading ? "opacity-50 pointer-events-none transition-opacity" : "transition-opacity"}>
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">{t.allProperties}</h2>
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
                <h3 className="text-base font-bold text-slate-900 mb-1">{t.noPropertiesFound}</h3>
                <p className="text-xs text-slate-500">{t.tryChangeKeyword}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
