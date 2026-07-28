import { Badge } from '@/components/ui/badge';
import { MapPin, Building, BadgeCheck, Bed, Bath, Maximize } from 'lucide-react';
import prisma from "@/lib/prisma";
import { notFound } from 'next/navigation';
import { GalleryLightbox } from './components/GalleryLightbox';
import { FloorPlanViewer } from './components/FloorPlanViewer';
import { InteractiveStickyBookingPanel } from './components/InteractiveStickyBookingPanel';
import { getTranslations } from 'next-intl/server';

import { Metadata, ResolvingMetadata } from 'next';

export const revalidate = 60; // ISR Caching: revalidate every 60 seconds

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const property = await prisma.property.findUnique({
    where: { slug: params.slug },
    include: { media: true },
  });

  if (!property) {
    return { title: 'Property Not Found | HomeLink 2.0' };
  }

  const imageUrl = property.media[0]?.s3Url || '/og-image.jpg';

  return {
    title: `${property.title} | HomeLink 2.0`,
    description: property.description.substring(0, 160),
    openGraph: {
      title: property.title,
      description: property.description.substring(0, 160),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: property.title,
      description: property.description.substring(0, 160),
      images: [imageUrl],
    },
  };
}

export default async function PropertyDetailPage({ params }: { params: { slug: string } }) {
  const t = await getTranslations('PropertyDetail');
  
  const property = await prisma.property.findUnique({
    where: { slug: params.slug },
    include: { media: true, owner: true }
  });

  if (!property) {
    notFound();
  }

  // Cari URL denah dari media jika ada, biasanya ada tag khusus atau dari nama file
  // Mock sementara kita pakai gambar pertama sebagai floor plan jika tidak ada yang spesifik
  const floorPlanUrl = property.media.find(m => m.s3Url?.includes('floorplan'))?.s3Url || property.media[0]?.s3Url;

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
                  <BadgeCheck className="w-5 h-5 mr-1.5" />
                  {t('fullyVerified')}
                </Badge>
                <span className="text-sm text-slate-500 flex items-center">
                  <Building className="w-5 h-5 mr-1" />
                  {property.propertyType === 'HOUSE' ? t('house') : property.propertyType === 'APARTMENT' ? t('apartment') : t('land')}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                {property.title}
              </h1>
              
              <div className="flex items-center text-slate-500 text-base">
                <MapPin className="w-5 h-5 mr-2 " />
                {property.address}
              </div>
            </div>

            <div className="h-px bg-slate-100 w-full my-8" />

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <Bed className="w-6 h-6 text-slate-600 mb-2" />
                <span className="text-2xl font-bold text-slate-900">-</span>
                <span className="text-sm text-slate-500">{t('bedrooms')}</span>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <Bath className="w-6 h-6 text-slate-600 mb-2" />
                <span className="text-2xl font-bold text-slate-900">-</span>
                <span className="text-sm text-slate-500">{t('bathrooms')}</span>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <Maximize className="w-6 h-6 text-slate-600 mb-2" />
                <span className="text-2xl font-bold text-slate-900">-<span className="text-lg">m²</span></span>
                <span className="text-sm text-slate-500">{t('buildingArea')}</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('propertyDescription')}</h2>
              <div className="text-slate-600 leading-relaxed space-y-4 whitespace-pre-wrap">
                {property.description}
              </div>
            </div>

            <div className="h-px bg-slate-100 w-full my-8" />
            
            <div className="mb-8 bg-slate-50 rounded-2xl p-6 border border-slate-100">
               <h2 className="text-xl font-bold text-slate-900 mb-4">{t('verifiedLegality')}</h2>
               <ul className="space-y-3">
                  <li className="flex items-center text-slate-700">
                    <BadgeCheck className="w-5 h-5  mr-3" /> {t('shm')}
                  </li>
                  <li className="flex items-center text-slate-700">
                    <BadgeCheck className="w-5 h-5  mr-3" /> {t('imb')}
                  </li>
                  <li className="flex items-center text-slate-700">
                    <BadgeCheck className="w-5 h-5  mr-3" /> {t('pbb')}
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
