"use client";

import React, { useState } from "react";
import { Sparkles, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AiSearchInputProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export function AiSearchInput({ onSearch, isLoading }: AiSearchInputProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="w-full relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center bg-white p-2 rounded-3xl shadow-lg border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all"
      >
        <div className="flex items-center pl-4 pr-2">
          <Sparkles className="w-6 h-6 text-indigo-500" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari dengan bahasa natural: Rumah dekat stasiun MRT, budget 2M"
          className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 placeholder-slate-400 font-medium px-2 py-3 md:py-4 md:text-lg outline-none w-full"
          disabled={isLoading}
        />
        <Button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="rounded-full bg-slate-900 hover:bg-indigo-600 text-white px-6 h-12 flex items-center gap-2 transition-colors ml-2"
        >
          {isLoading ? (
            <span className="animate-pulse">Mencari...</span>
          ) : (
            <>
              <span className="hidden sm:inline">Cari AI</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
