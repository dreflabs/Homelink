import React from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, BedDouble, Bath, Maximize2, ShieldCheck } from "lucide-react"
import { FavoriteButton } from "./FavoriteButton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DEFAULT_BLUR_DATA_URL } from "@/lib/utils/image-blur"

export interface PropertyCardProps {
  id: string
  title: string
  price: number
  address: string
  specs: {
    bed: number
    bath: number
    area: number
  }
  imageUrl: string
  isVerified: boolean
  isFeatured?: boolean
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price)
}

export function PropertyCard({
  id,
  title,
  price,
  address,
  specs,
  imageUrl,
  isVerified,
  isFeatured,
}: PropertyCardProps) {
  return (
    <Link href={`/property/${id}`} className="block h-full">
      <Card className="group flex flex-col overflow-hidden border-slate-100 rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-300 bg-white h-full cursor-pointer active:scale-[0.99]">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <Image
            src={imageUrl}
            alt={title}
            fill
            placeholder="blur"
            blurDataURL={DEFAULT_BLUR_DATA_URL}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {isVerified ? (
              <Badge variant="secondary" className="bg-emerald-100/90 hover:bg-emerald-100/90 text-emerald-700 border-emerald-200 backdrop-blur-md shadow-sm gap-1.5 px-2.5 py-1 font-semibold rounded-full">
                <ShieldCheck className="w-3.5 h-3.5"  />
                Terverifikasi
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-amber-100/90 hover:bg-amber-100/90 text-amber-700 border-amber-200 backdrop-blur-md shadow-sm px-2.5 py-1 font-medium rounded-full">
                Menunggu
              </Badge>
            )}
          </div>

          {/* Wishlist Heart Button */}
          <FavoriteButton />
        </div>

        <CardHeader className="p-5 pb-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="text-lg font-bold text-slate-900 leading-tight line-clamp-2 group-hover:text-blue-700 transition-colors">
              {title}
            </h3>
          </div>
          <div className="text-xl font-bold text-blue-700 mb-3">
            {formatPrice(price)}
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 text-sm">
            <MapPin className="w-5 h-5 flex-shrink-0 "  aria-hidden="true" />
            <span className="truncate">{address}</span>
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-4 mt-auto">
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-slate-600 text-sm">
            <div className="flex items-center gap-1.5" title="Kamar Tidur">
              <BedDouble className="w-4 h-4 text-slate-400"  />
              <span className="font-medium">{specs.bed}</span>
            </div>
            <div className="flex items-center gap-1.5" title="Kamar Mandi">
              <Bath className="w-4 h-4 text-slate-400"  />
              <span className="font-medium">{specs.bath}</span>
            </div>
            <div className="flex items-center gap-1.5" title="Luas Bangunan">
              <Maximize2 className="w-4 h-4 text-slate-400"  />
              <span className="font-medium">{specs.area} m&sup2;</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
