import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Bed, Bath, Square, Building } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { getBuyerFavorites } from "@/actions/dashboard";
import { FavoriteButton } from "./FavoriteButton";
import { getTranslations } from "next-intl/server";

export default async function FavoritesPage() {
  const { data: favorites } = await getBuyerFavorites();
  const t = await getTranslations("BuyerDashboard");

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] lg:min-h-[60vh] text-center px-4 animate-in fade-in zoom-in duration-500">
        <div className="bg-primary/5 p-6 rounded-full mb-6">
          <Heart className="w-12 h-12 text-primary/40" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight mb-2">
          {t("favorites.empty.title")}
        </h2>
        <p className="text-muted-foreground max-w-md mb-8">
          {t("favorites.empty.subtitle")}
        </p>
        <Link href="/search-result">
          <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-all">
            <Building className="w-5 h-5 mr-2" />
            {t("favorites.empty.explore")}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">{t("favorites.title")}</h1>
        <p className="text-muted-foreground">
          {t("favorites.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((property) => (
          <Card 
            key={property.id} 
            className="group relative overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 bg-background rounded-2xl flex flex-col h-full"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
              <Image
                src={property.imageUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800"}
                alt={property.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Gradient Overlay for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Favorite Button */}
              <FavoriteButton propertyId={property.id} />
            </div>

            <CardContent className="flex flex-col flex-grow p-5">
              <div className="flex justify-between items-start mb-2">
                <div className="font-semibold text-lg text-foreground line-clamp-1">
                  {formatRupiah(property.price)}
                </div>
              </div>
              
              <CardTitle className="text-base font-medium text-foreground mb-1 line-clamp-1">
                {property.title}
              </CardTitle>
              
              <CardDescription className="flex items-center text-sm text-muted-foreground mb-4">
                <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                <span className="line-clamp-1">{property.address}</span>
              </CardDescription>

              <div className="mt-auto grid grid-cols-3 gap-2 pt-4 border-t border-border/50">
                <div className="flex items-center justify-center text-sm text-muted-foreground gap-1.5">
                  <Bed className="w-4 h-4" />
                  <span>{property.bedrooms}</span>
                </div>
                <div className="flex items-center justify-center text-sm text-muted-foreground gap-1.5 border-x border-border/50">
                  <Bath className="w-4 h-4" />
                  <span>{property.bathrooms}</span>
                </div>
                <div className="flex items-center justify-center text-sm text-muted-foreground gap-1.5">
                  <Square className="w-4 h-4" />
                  <span>{property.surfaceArea}m²</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
