"use client";

import React, { useState } from "react";
import { AiSearchInput } from "./AiSearchInput";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { semanticSearch } from "@/actions/ai-search";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPinOff } from "lucide-react";

export function AiSearchSection() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setHasSearched(true);
    try {
      const res = await semanticSearch(query);
      setResults(res.data);
    } catch (error) {
      console.error(error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mb-10 flex flex-col gap-6">
      <div className="max-w-3xl">
        <AiSearchInput onSearch={handleSearch} isLoading={loading} />
      </div>

      {hasSearched && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">Hasil Pencarian AI</h2>
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
          ) : results && results.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
              {results.map((prop) => (
                <PropertyCard key={prop.id} {...prop} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center border border-slate-200 rounded-3xl bg-white shadow-sm">
              <MapPinOff className="w-10 h-10  mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Tidak ada kecocokan</h3>
              <p className="text-slate-500 max-w-md">
                Coba gunakan kata kunci yang berbeda.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
