"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AiSearchInputProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export function AiSearchInput({ onSearch, isLoading }: AiSearchInputProps) {
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  if (!isExpanded) {
    return (
      <button 
        type="button"
        onClick={() => setIsExpanded(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white shadow-sm hover:border-indigo-300 hover:shadow-md transition-all text-sm font-medium text-slate-700 group"
      >
        <Sparkles className="w-4 h-4 text-indigo-500 group-hover:text-indigo-600" strokeWidth={1.75} />
        <span>Gunakan AI untuk pencarian spesifik...</span>
      </button>
    );
  }

  return (
    <div className="w-full relative group max-w-2xl">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-[2px] opacity-50 transition duration-500"></div>
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center bg-white p-1.5 rounded-full shadow-sm border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-300 transition-all h-12"
      >
        <div className="flex items-center pl-4 pr-2">
          <Sparkles className="w-5 h-5 text-indigo-500" strokeWidth={1.75} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari rumah dekat tol budget 2 M..."
          className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 placeholder-slate-400 font-medium px-2 py-2 text-sm outline-none w-full"
          disabled={isLoading}
          autoFocus
        />
        <Button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="rounded-full bg-slate-900 hover:bg-slate-800 text-white px-5 h-9 flex items-center gap-2 transition-colors ml-2"
        >
          {isLoading ? (
            <span className="animate-pulse text-xs">Mencari...</span>
          ) : (
            <>
              <span className="hidden sm:inline text-xs font-semibold">Cari</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
