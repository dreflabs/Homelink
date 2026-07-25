import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AISearchPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-6xl">
      <div className="flex flex-col items-center justify-center space-y-4 mb-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="bg-blue-100 p-3 rounded-full mb-2">
          <Sparkles className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
          AI Semantic Search
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          Find exactly what you're looking for by describing it naturally. Our AI understands context, amenities, and lifestyle preferences.
        </p>
      </div>

      <form action={async () => {
        'use server';
        // Server action for semantic search placeholder
      }} className="max-w-3xl mx-auto mb-16 relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
          <Search className="h-6 w-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
        </div>
        <Input 
          type="text" 
          name="query"
          placeholder="e.g. 'A quiet apartment near a park with a balcony for my cat'" 
          className="pl-12 pr-32 py-8 text-lg rounded-full shadow-lg border-slate-200 bg-white/80 backdrop-blur-sm focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all relative z-0"
        />
        <div className="absolute inset-y-2 right-2 flex items-center z-10">
          <Button type="submit" className="rounded-full px-6 h-full bg-blue-600 hover:bg-blue-700 text-white shadow-md">
            Search
          </Button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for results grid */}
        <div className="col-span-full py-20 text-center text-slate-400 flex flex-col items-center justify-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
          <Search className="w-12 h-12 mb-4 opacity-50" />
          <p className="text-lg font-medium">Try searching for something specific</p>
          <p className="text-sm">Results will appear here based on semantic relevance.</p>
        </div>
      </div>
    </div>
  );
}
