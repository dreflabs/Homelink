'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Maximize2, X } from "lucide-react";

export function FloorPlanViewer({ floorPlanUrl }: { floorPlanUrl?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!floorPlanUrl) return null;

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Denah / Floor Plan</h2>
        <div 
          className="relative w-full h-[300px] md:h-[400px] bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden group cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <Image
            src={floorPlanUrl}
            alt="Floor Plan"
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <div className="bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
              <Maximize2 className="w-5 h-5 text-slate-700" />
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center backdrop-blur-sm p-4 md:p-8"
          onClick={() => setIsOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="relative w-full max-w-4xl aspect-square md:aspect-video flex items-center justify-center">
            <Image
              src={floorPlanUrl}
              alt="Floor Plan View"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
