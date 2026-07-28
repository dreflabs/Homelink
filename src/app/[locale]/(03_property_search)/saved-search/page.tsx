import React from 'react';
import { SearchHeroWrapper } from '@/components/shared/SearchHeroWrapper';
import { Bookmark, Bell, ChevronRight, SlidersHorizontal, MapPin } from "lucide-react";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function SavedSearchPage() {
  const t = useTranslations("PropertySearch.SavedSearch");
  const savedSearches = [
    {
      id: "search-1",
      title: "Rumah di Jakarta Selatan",
      filters: "Rumah • Rp 2M - Rp 5M • 3+ Kamar Tidur",
      dateAdded: "2 hari yang lalu",
      newResults: 12,
      alertEnabled: true
    },
    {
      id: "search-2",
      title: "Apartemen Studio Sudirman",
      filters: "Apartemen • Di bawah Rp 1.5M • 1 Kamar Tidur",
      dateAdded: "1 minggu yang lalu",
      newResults: 3,
      alertEnabled: false
    },
    {
      id: "search-3",
      title: "Tanah Kavling BSD",
      filters: "Tanah • Luas > 200m²",
      dateAdded: "2 minggu yang lalu",
      newResults: 0,
      alertEnabled: true
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-12">
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-16 z-40 py-4 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <SearchHeroWrapper isCompact />
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-slate-100 text-primary rounded-xl">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{t("pageTitle")}</h1>
            <p className="text-slate-500 text-sm mt-1">{t("pageDesc")}</p>
          </div>
        </div>

        <div className="space-y-4">
          {savedSearches.map((search) => (
            <div key={search.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors group">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">{search.title}</h3>
                    {search.newResults > 0 && (
                      <span className="bg-slate-100 text-primary text-xs font-bold px-2 py-1 rounded-md">
                        {search.newResults} {t("newProperties")}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                    <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                    <span>{search.filters}</span>
                  </div>
                  
                  <p className="text-xs text-slate-400">{t("savedOn", { date: search.dateAdded })}</p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" 
                      defaultChecked={search.alertEnabled}
                    />
                    <Bell className="w-5 h-5" />
                    {t("emailNotification")}
                  </label>
                  
                  <Link href={`/search-result?q=${encodeURIComponent(search.title)}`} className="ml-auto md:ml-0">
                    <Button className="bg-slate-50 text-primary hover:bg-slate-100 border-0 shadow-none rounded-xl">
                      {t("viewResults")} <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
