"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, MapPin, Bed, Bath, Square, Home } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock Data
const mockFavorites = [
  {
    id: "1",
    title: "The Minimalist Haven",
    price: "Rp 4.500.000.000",
    location: "Jakarta Selatan, DKI Jakarta",
    beds: 3,
    baths: 2,
    area: 120,
    imageUrl:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    title: "Urban Oasis Loft",
    price: "Rp 2.850.000.000",
    location: "Jakarta Pusat, DKI Jakarta",
    beds: 2,
    baths: 2,
    area: 85,
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    title: "Suburban Family Home",
    price: "Rp 3.200.000.000",
    location: "Tangerang Selatan, Banten",
    beds: 4,
    baths: 3,
    area: 200,
    imageUrl:
      "https://images.unsplash.com/photo-1600607687920-4e2a09be1587?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "4",
    title: "Modern Glass Villa",
    price: "Rp 12.000.000.000",
    location: "Canggu, Bali",
    beds: 4,
    baths: 4,
    area: 350,
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
  },
];

export default function FavoritesPage() {
  // Simulate fetching data, can set to [] to test EmptyState
  const [favorites, setFavorites] = useState(mockFavorites);

  const toggleFavorite = (id: string) => {
    // In a real app, this would call an API and possibly remove it from the list
    // if the user un-favorites it, or just toggle the visual state.
    // Here we'll simulate removing it from favorites on click for demonstration.
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-in fade-in zoom-in duration-500">
        <div className="bg-primary/5 p-6 rounded-full mb-6">
          <Heart className="w-12 h-12 text-primary/40" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight mb-2">
          Belum ada properti favorit
        </h2>
        <p className="text-muted-foreground max-w-md mb-8">
          Jelajahi berbagai properti premium dan simpan yang paling Anda sukai di sini untuk mempermudah pencarian Anda nanti.
        </p>
        <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-all">
          <Home className="w-4 h-4 mr-2" />
          Jelajahi Properti
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Properti Favorit Anda</h1>
        <p className="text-muted-foreground">
          Koleksi properti pilihan yang telah Anda simpan.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((property) => (
          <Card 
            key={property.id} 
            className="group relative overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 bg-background rounded-2xl flex flex-col h-full"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={property.imageUrl}
                alt={property.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Gradient Overlay for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(property.id)}
                className={cn(
                  "absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-rose-500 shadow-sm transition-all duration-300 hover:scale-110 active:scale-95",
                  "hover:bg-rose-50 hover:text-rose-600"
                )}
                aria-label="Remove from favorites"
              >
                <Heart className="w-5 h-5 fill-current" />
              </button>
            </div>

            <CardContent className="flex flex-col flex-grow p-5">
              <div className="flex justify-between items-start mb-2">
                <div className="font-semibold text-lg text-foreground line-clamp-1">
                  {property.price}
                </div>
              </div>
              
              <CardTitle className="text-base font-medium text-foreground mb-1 line-clamp-1">
                {property.title}
              </CardTitle>
              
              <CardDescription className="flex items-center text-sm text-muted-foreground mb-4">
                <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                <span className="line-clamp-1">{property.location}</span>
              </CardDescription>

              <div className="mt-auto grid grid-cols-3 gap-2 pt-4 border-t border-border/50">
                <div className="flex items-center justify-center text-sm text-muted-foreground gap-1.5">
                  <Bed className="w-4 h-4" />
                  <span>{property.beds}</span>
                </div>
                <div className="flex items-center justify-center text-sm text-muted-foreground gap-1.5 border-x border-border/50">
                  <Bath className="w-4 h-4" />
                  <span>{property.baths}</span>
                </div>
                <div className="flex items-center justify-center text-sm text-muted-foreground gap-1.5">
                  <Square className="w-4 h-4" />
                  <span>{property.area}m²</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
