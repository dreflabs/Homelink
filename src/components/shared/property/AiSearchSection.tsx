"use client";

import React, { useState } from "react";
import { AiSearchInput } from "./AiSearchInput";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { semanticSearch } from "@/actions/ai-search";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

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
    <div className="w-full mb-6">
      <div className="flex justify-center mb-8">
        <AiSearchInput onSearch={handleSearch} isLoading={loading} />
      </div>

      {hasSearched && (
        <div className="mb-10 bg-indigo-50/50 rounded-3xl p-6 border border-indigo-100">
          {loading ? (
            <div className="flex items-center gap-2 text-indigo-600 font-medium mb-4">
              <Sparkles className="w-5 h-5 animate-pulse" strokeWidth={1.75} />
              <span>AI sedang memindai ribuan properti untuk Anda...</span>
            </div>
          ) : results && results.length > 0 ? (
            <>
              <div className="flex items-center gap-2 text-indigo-600 font-semibold mb-6 bg-white w-fit px-4 py-2 rounded-full shadow-sm border border-indigo-100">
                <Sparkles className="w-4 h-4" strokeWidth={1.75} />
                <span>AI menemukan {results.length} properti yang sesuai kebutuhan Anda</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.slice(0, 3).map((prop) => (
                  <PropertyCard key={prop.id} {...prop} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Sparkles className="w-8 h-8 text-indigo-300 mb-3" strokeWidth={1.75} />
              <h3 className="text-lg font-bold text-slate-800 mb-1">Tidak ada kecocokan spesifik</h3>
              <p className="text-slate-500 text-sm max-w-md">
                Asisten AI tidak dapat menemukan properti yang tepat. Menampilkan hasil pencarian standar di bawah ini.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
