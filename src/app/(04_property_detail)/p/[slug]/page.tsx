import { Badge } from '@/components/ui/badge';
import { MapPin, Home, BadgeCheck, Bed, Bath, Maximize } from 'lucide-react';
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import { GalleryLightbox } from './components/GalleryLightbox';
import { FloorPlanViewer } from './components/FloorPlanViewer';
import { InteractiveStickyBookingPanel } from './components/InteractiveStickyBookingPanel';

export default async function PropertyDetailPage({ params }: { params: { slug: string } }) {
  const prisma = new PrismaClient();
  const property = await prisma.property.findUnique({
    where: { id: params.slug },
    include: { media: true, owner: true }
  });

  if (!property) {
    notFound();
  }

  // Cari URL denah dari media jika ada, biasanya ada tag khusus atau dari nama file
  // Mock sementara kita pakai gambar pertama sebagai floor plan jika tidak ada yang spesifik
  const floorPlanUrl = property.media.find(m => m.url?.includes('floorplan'))?.s3Url || property.media[0]?.s3Url;

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Gallery Preview with Lightbox */}
        <GalleryLightbox media={property.media} />

        {/* Layout 65/35 */}
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Kolom Kiri: 65% - Info Properti */}
          <div className="w-full lg:w-[65%]">
            
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-200 border-0 rounded-full px-3 py-1 text-sm font-medium flex items-center">
                  <BadgeCheck className="w-4 h-4 mr-1.5" />
                  Fully Verified
                </Badge>
                <span className="text-sm text-slate-500 flex items-center">
                  <Home className="w-4 h-4 mr-1" />
                  {property.propertyType === 'HOUSE' ? 'Rumah Tapak' : property.propertyType === 'APARTMENT' ? 'Apartemen' : 'Tanah'}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                {property.title}
              </h1>
              
              <div className="flex items-center text-slate-500 text-base">
                <MapPin className="w-5 h-5 mr-2 text-slate-400" />
                {property.address}
              </div>
            </div>

            <div className="h-px bg-slate-100 w-full my-8" />

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <Bed className="w-6 h-6 text-slate-600 mb-2" />
                <span className="text-2xl font-bold text-slate-900">-</span>
                <span className="text-sm text-slate-500">Kamar Tidur</span>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <Bath className="w-6 h-6 text-slate-600 mb-2" />
                <span className="text-2xl font-bold text-slate-900">-</span>
                <span className="text-sm text-slate-500">Kamar Mandi</span>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <Maximize className="w-6 h-6 text-slate-600 mb-2" />
                <span className="text-2xl font-bold text-slate-900">-<span className="text-lg">m²</span></span>
                <span className="text-sm text-slate-500">Luas Bangunan</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Deskripsi Properti</h2>
              <div className="text-slate-600 leading-relaxed space-y-4 whitespace-pre-wrap">
                {property.description}
              </div>
            </div>

            <div className="h-px bg-slate-100 w-full my-8" />
            
            <div className="mb-8 bg-slate-50 rounded-2xl p-6 border border-slate-100">
               <h2 className="text-xl font-bold text-slate-900 mb-4">Legalitas Terverifikasi</h2>
               <ul className="space-y-3">
                  <li className="flex items-center text-slate-700">
                    <BadgeCheck className="w-5 h-5 text-green-500 mr-3" /> Sertifikat Hak Milik (SHM)
                  </li>
                  <li className="flex items-center text-slate-700">
                    <BadgeCheck className="w-5 h-5 text-green-500 mr-3" /> Izin Mendirikan Bangunan (IMB) lengkap
                  </li>
                  <li className="flex items-center text-slate-700">
                    <BadgeCheck className="w-5 h-5 text-green-500 mr-3" /> Pajak Bumi dan Bangunan (PBB) lunas
                  </li>
               </ul>
            </div>

            {/* Floor Plan Viewer Component */}
            <FloorPlanViewer floorPlanUrl={floorPlanUrl} />

          </div>

          {/* Kolom Kanan: 35% - Interactive Booking Panel */}
          <div className="w-full lg:w-[35%] relative">
            <InteractiveStickyBookingPanel propertyId={property.id} price={Number(property.price)} />
          </div>

        </div>
      </main>
    </div>
  );
}
