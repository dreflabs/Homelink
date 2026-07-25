'use client';

import React, { useState, useEffect } from 'react';
import { SearchHeroWrapper } from '@/components/shared/SearchHeroWrapper';
import { PropertyCard } from '@/components/shared/PropertyCard';
import { MapPin, Navigation, Map as MapIcon, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NearbySearchPage() {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

  const requestLocation = () => {
    setLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoading(false);
        },
        (error) => {
          console.error(error);
          setLoading(false);
          alert('Gagal mendapatkan lokasi. Pastikan izin lokasi diaktifkan.');
        }
      );
    } else {
      alert('Geolokasi tidak didukung di browser ini.');
      setLoading(false);
    }
  };

  // Dummy data
  const nearbyProperties = location ? [
    {
      id: "prop-1",
      title: "Rumah Mewah Minimalis",
      price: 15000000000,
      address: "0.5 km dari lokasi Anda",
      specs: { bed: 4, bath: 3, area: 350 },
      imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      isVerified: true,
      isFeatured: true,
    },
    {
      id: "prop-2",
      title: "Apartemen Strategis",
      price: 3500000000,
      address: "1.2 km dari lokasi Anda",
      specs: { bed: 2, bath: 1, area: 85 },
      imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      isVerified: true,
    }
  ] : [];

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-12">
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-40 py-4 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <SearchHeroWrapper isCompact />
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Properti di Sekitar Anda</h1>
            <p className="text-slate-500 text-sm mt-1">Temukan properti idaman terdekat dari lokasi Anda saat ini.</p>
          </div>
        </div>

        {!location ? (
          <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 relative">
              <Navigation className="w-10 h-10 text-blue-600 absolute animate-pulse" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Izinkan Akses Lokasi</h2>
            <p className="text-slate-500 mb-8 max-w-md">
              Untuk menemukan properti di sekitar Anda, kami memerlukan izin untuk mengakses lokasi perangkat Anda.
            </p>
            <Button 
              onClick={requestLocation} 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl text-base shadow-lg shadow-blue-600/20 w-full sm:w-auto"
            >
              <Navigation className="w-5 h-5 mr-2" />
              {loading ? 'Mendeteksi...' : 'Deteksi Lokasi Saya'}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
                <MapPin className="w-4 h-4" />
                Lokasi terdeteksi (-6.2088, 106.8456)
              </div>
              <Button variant="outline" className="text-sm rounded-lg border-slate-200" onClick={requestLocation}>
                Perbarui Lokasi
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {nearbyProperties.map(prop => (
                <PropertyCard key={prop.id} {...prop} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
