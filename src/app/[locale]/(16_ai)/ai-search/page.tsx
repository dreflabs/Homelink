"use client";

import { useState } from "react";
import { Search, Sparkles, SearchX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { semanticSearch } from "@/actions/ai-search";

type SearchResult = {
  id: string;
  title: string;
  price: number;
  address: string;
  specs: { bed: number; bath: number; area: number };
  imageUrl: string;
  isVerified: boolean;
  isFeatured: boolean;
};

export default function AISearchPage() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const res = await semanticSearch(query);
      setResults(res.data as SearchResult[]);
      setHasSearched(true);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-6xl">
      <div className="flex flex-col items-center justify-center space-y-4 mb-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="bg-slate-100 p-3 rounded-full mb-2">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
          AI Semantic Search
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          Find exactly what you're looking for by describing it naturally. Our AI understands context, amenities, and lifestyle preferences.
        </p>
      </div>

      <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-16 relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
          <Search className="h-6 w-6 text-slate-400 group-focus-within:text-primary transition-colors" />
        </div>
        <Input
          type="text"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. 'A quiet apartment near a park with a balcony for my cat'"
          className="pl-12 pr-32 py-8 text-lg rounded-full shadow-lg border-slate-200 bg-white/80 backdrop-blur-sm focus-visible:ring-primary focus-visible:ring-offset-2 transition-all relative z-0"
          disabled={isSearching}
        />
        <div className="absolute inset-y-2 right-2 flex items-center z-10">
          <Button
            type="submit"
            disabled={!query.trim() || isSearching}
            className="rounded-full px-6 h-full bg-primary hover:bg-primary text-white shadow-md disabled:opacity-60"
          >
            {isSearching ? "Mencari..." : "Search"}
          </Button>
        </div>
      </form>

      {isSearching ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-3xl overflow-hidden border border-slate-100 bg-white">
              <Skeleton className="aspect-[4/3] w-full rounded-none" />
              <div className="p-5 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : hasSearched ? (
        results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result) => (
              <PropertyCard key={result.id} {...result} />
            ))}
          </div>
        ) : (
          <div className="col-span-full py-20 text-center text-slate-400 flex flex-col items-center justify-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
            <SearchX className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">Tidak ada hasil yang cocok</p>
            <p className="text-sm">Coba deskripsikan properti yang Anda cari dengan cara lain.</p>
          </div>
        )
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-full py-20 text-center text-slate-400 flex flex-col items-center justify-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
            <Search className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">Try searching for something specific</p>
            <p className="text-sm">Results will appear here based on semantic relevance.</p>
          </div>
        </div>
      )}
    </div>
  );
}
