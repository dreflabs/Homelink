"use client";

import React, { useState, useEffect } from 'react';
import { SearchHeroWrapper } from '@/components/shared/SearchHeroWrapper';
import { PropertyCard } from '@/components/shared/PropertyCard';
import { MapPin, Navigation, Map as MapIcon, Compass } from "lucide-react";
import { Button } from '@/components/ui/button';
import { getNearbyProperties } from '@/actions/property';
import { useTranslations } from 'next-intl';

export default function NearbySearchPage() {
  const t = useTranslations("PropertySearch.NearbySearch");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [nearbyProperties, setNearbyProperties] = useState<any[]>([]);

  const requestLocation = () => {
    setLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation({ lat, lng });
          
          try {
            const res = await getNearbyProperties(lat, lng, 5);
            if (res.success && res.data) {
              setNearbyProperties(res.data);
            }
          } catch (error) {
            console.error("Failed to fetch nearby properties", error);
          }
          
          setLoading(false);
        },
        (error) => {
          console.error(error);
          setLoading(false);
          alert(t("errorFailedFetch"));
        }
      );
    } else {
      alert(t("errorNotSupported"));
      setLoading(false);
    }
  };

  // Using state to store properties fetched from Server Action

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-12">
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-16 z-40 py-4 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <SearchHeroWrapper isCompact />
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-slate-100 text-primary rounded-xl">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{t("pageTitle")}</h1>
            <p className="text-slate-500 text-sm mt-1">{t("pageDesc")}</p>
          </div>
        </div>

        {!location ? (
          <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 relative">
              <Navigation className="w-10 h-10 text-primary absolute animate-pulse" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t("allowLocationTitle")}</h2>
            <p className="text-slate-500 mb-8 max-w-md">
              {t("allowLocationDesc")}
            </p>
            <Button 
              onClick={requestLocation} 
              disabled={loading}
              className="bg-primary hover:bg-primary text-white px-8 py-6 rounded-xl text-base shadow-lg shadow-blue-600/20 w-full sm:w-auto"
            >
              <Navigation className="w-5 h-5 mr-2" />
              {loading ? t("detecting") : t("detectLocation")}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
                <MapPin className="w-5 h-5" />
                {t("locationDetected")} ({location.lat.toFixed(4)}, {location.lng.toFixed(4)})
              </div>
              <Button variant="outline" className="text-sm rounded-lg border-slate-200" onClick={requestLocation}>
                {t("updateLocation")}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {nearbyProperties.map(prop => (
                <PropertyCard 
                  key={prop.id} 
                  id={prop.id}
                  title={prop.title}
                  price={prop.price}
                  address={prop.address}
                  specs={{ bed: prop.bedrooms, bath: prop.bathrooms, area: prop.buildingArea }}
                  imageUrl={prop.media?.[0]?.s3Url}
                  isVerified={prop.status === "ACTIVE"}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
