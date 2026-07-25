"use client";

import React, { useEffect, useState } from "react";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { semanticSearch } from "@/actions/ai-search";
import { Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  specs: { bed: number; bath: number; area: number };
  imageUrl: string;
  isVerified: boolean;
  isFeatured?: boolean;
}

export function AiRecommendationPanel() {
  const [recommendations, setRecommendations] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecommendations() {
      try {
        // Dummy query to get recommendations
        const res = await semanticSearch("Rekomendasi properti terbaik");
        setRecommendations(res.data);
      } catch (error) {
        console.error("Failed to load AI recommendations", error);
      } finally {
        setLoading(false);
      }
    }
    loadRecommendations();
  }, []);

  if (!loading && recommendations.length === 0) return null;

  return (
    <section className="w-full py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-sm">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-700">
            Rekomendasi Cerdas AI
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Properti yang paling cocok untuk Anda berdasarkan preferensi
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-4">
              <Skeleton className="h-[250px] w-full rounded-3xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
          {recommendations.map((prop) => (
            <PropertyCard key={prop.id} {...prop} />
          ))}
        </div>
      )}
    </section>
  );
}
