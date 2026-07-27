"use client";

import React, { useState } from "react";
import { Filter, ChevronDown, Check, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 10000000000]);
  const [activeQuickFilters, setActiveQuickFilters] = useState<string[]>([]);

  const toggleQuickFilter = (filter: string) => {
    setActiveQuickFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const QUICK_FILTERS = [
    { id: "verified", label: "Verified Only", icon: ShieldCheck, color: "text-emerald-500" },
    { id: "ready", label: "Siap Huni" },
    { id: "mrt", label: "Dekat MRT" },
    { id: "shm", label: "Free SHM" },
    { id: "pricedrop", label: "Harga Turun" },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-slate-700" strokeWidth={1.75} />
          <h2 className="text-lg font-bold text-slate-900">Filter</h2>
        </div>
        <button className="text-sm text-primary font-medium hover:underline">Reset</button>
      </div>

      <div className="space-y-8">
        {/* Quick Filters */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-900">Quick Filters</h3>
          <div className="flex flex-wrap gap-2">
            {QUICK_FILTERS.map(filter => {
              const isActive = activeQuickFilters.includes(filter.id);
              const Icon = filter.icon;
              return (
                <button
                  key={filter.id}
                  onClick={() => toggleQuickFilter(filter.id)}
                  className={`px-3 py-1.5 rounded-full border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                    isActive 
                      ? "border-primary bg-primary/5 text-primary" 
                      : "border-slate-200 text-slate-600 hover:border-slate-300 bg-white"
                  }`}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${filter.color || ""}`} strokeWidth={1.75} />}
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Existing Filters */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-900">Harga (Rp)</h3>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Min"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <span className="text-slate-400">-</span>
            <input
              type="text"
              placeholder="Max"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-900">Kota</h3>
          <div className="relative">
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              <option value="">Semua Kota</option>
              <option value="Jakarta Selatan">Jakarta Selatan</option>
              <option value="Jakarta Barat">Jakarta Barat</option>
              <option value="Tangerang Selatan">Tangerang Selatan</option>
              <option value="Depok">Depok</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" strokeWidth={1.75} />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-900">Kamar Tidur</h3>
          <div className="flex flex-wrap gap-2">
            {['1', '2', '3', '4', '5+'].map((num) => (
              <button
                key={num}
                className="w-10 h-10 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-primary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 bg-white"
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-900">Tipe Properti</h3>
          <div className="relative">
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              <option value="">Semua Tipe</option>
              <option value="Rumah">Rumah</option>
              <option value="Apartemen">Apartemen</option>
              <option value="Ruko">Ruko</option>
              <option value="Tanah">Tanah</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" strokeWidth={1.75} />
          </div>
        </div>

      </div>

      <Button className="w-full mt-8 rounded-xl font-semibold h-12 shadow-sm text-white hover:bg-slate-800 transition-colors bg-slate-900">
        Terapkan Filter
      </Button>
    </div>
  );
}
