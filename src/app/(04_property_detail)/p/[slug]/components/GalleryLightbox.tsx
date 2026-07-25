'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PropertyMedia } from '@prisma/client';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export function GalleryLightbox({ media }: { media: PropertyMedia[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const primaryMedia = media.find(m => m.isPrimary) || media[0];
  const otherMedia = media.filter(m => m.id !== primaryMedia?.id).slice(0, 2);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  return (
    <>
      <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden group mb-8">
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-2">
          <div 
            className="col-span-4 md:col-span-3 row-span-2 relative h-full w-full overflow-hidden bg-slate-100 cursor-pointer"
            onClick={() => openLightbox(0)}
          >
            {primaryMedia && (
              <Image
                src={primaryMedia.s3Url}
                alt="Hero Property"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
            )}
          </div>
          
          {otherMedia.map((m, idx) => (
            <div 
              key={m.id} 
              className="hidden md:block col-span-1 row-span-1 relative h-full w-full overflow-hidden bg-slate-100 cursor-pointer"
              onClick={() => openLightbox(idx + 1)}
            >
              <Image
                src={m.s3Url}
                alt={`Property details ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {idx === 1 && media.length > 3 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors hover:bg-black/50">
                  <span className="text-white font-medium text-lg">+{media.length - 3} Foto</span>
                </div>
              )}
            </div>
          ))}
          
          {/* Fill empty spots if less than 3 media */}
          {otherMedia.length === 0 && (
            <>
              <div className="hidden md:block col-span-1 row-span-1 relative h-full w-full bg-slate-100 overflow-hidden" />
              <div className="hidden md:block col-span-1 row-span-1 relative h-full w-full bg-slate-100 overflow-hidden" />
            </>
          )}
          {otherMedia.length === 1 && (
            <div className="hidden md:block col-span-1 row-span-1 relative h-full w-full bg-slate-100 overflow-hidden" />
          )}
        </div>
      </div>

      {/* Lightbox Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center backdrop-blur-sm" onClick={closeLightbox}>
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2"
            onClick={closeLightbox}
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="relative w-full max-w-5xl aspect-video flex items-center justify-center px-12">
            <button 
              className="absolute left-4 p-2 text-white/70 hover:text-white rounded-full bg-black/20 hover:bg-black/40 transition-colors"
              onClick={prevImage}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <div className="relative w-full h-full">
              <Image
                src={media[currentIndex]?.s3Url}
                alt={`Gallery image ${currentIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>
            
            <button 
              className="absolute right-4 p-2 text-white/70 hover:text-white rounded-full bg-black/20 hover:bg-black/40 transition-colors"
              onClick={nextImage}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
          <div className="text-white/70 mt-4 font-medium">
            {currentIndex + 1} / {media.length}
          </div>
        </div>
      )}
    </>
  );
}
