import Image from 'next/image';
import { PropertyMedia } from '@prisma/client';

export function GalleryPreview({ media }: { media: PropertyMedia[] }) {
  const primaryMedia = media.find(m => m.isPrimary) || media[0];
  const otherMedia = media.filter(m => m.id !== primaryMedia?.id).slice(0, 2);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden group cursor-pointer mb-8">
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-2">
        <div className="col-span-4 md:col-span-3 row-span-2 relative h-full w-full overflow-hidden bg-slate-100">
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
          <div key={m.id} className="hidden md:block col-span-1 row-span-1 relative h-full w-full overflow-hidden bg-slate-100">
            <Image
              src={m.s3Url}
              alt={`Property details ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {idx === 1 && media.length > 3 && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors group-hover:bg-black/50">
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
  );
}
