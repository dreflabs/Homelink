"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { SearchHeroWrapper } from '@/components/shared/SearchHeroWrapper';
import { SlidersHorizontal } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

const searchSchema = z.object({
  city: z.string().optional(),
  type: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  minArea: z.string().optional(),
  pool: z.boolean().optional(),
  garage: z.boolean().optional(),
});

type SearchFormValues = z.infer<typeof searchSchema>;

export default function AdvancedSearchPage() {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      pool: false,
      garage: false,
    }
  });

  const onSubmit = (data: SearchFormValues) => {
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        params.set(key, value.toString());
      }
    });
    router.push(`/search-result?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-12">
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-16 z-40 py-4 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <SearchHeroWrapper isCompact />
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl py-12">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-6">
            <SlidersHorizontal className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-slate-900">Pencarian Lanjutan</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Lokasi & Tipe Properti */}
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">Lokasi / Area</label>
                  <input type="text" {...register("city")} placeholder="Pilih kota atau area..." className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">Tipe Properti</label>
                  <select {...register("type")} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20">
                    <option value="">Semua Tipe</option>
                    <option value="house">Rumah</option>
                    <option value="apartment">Apartemen</option>
                    <option value="land">Tanah</option>
                  </select>
                </div>
              </div>

              {/* Harga */}
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">Harga Minimum (Rp)</label>
                  <input type="number" {...register("minPrice")} placeholder="Contoh: 500000000" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">Harga Maksimum (Rp)</label>
                  <input type="number" {...register("maxPrice")} placeholder="Contoh: 2000000000" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>

              {/* Spesifikasi */}
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">Kamar Tidur Minimum</label>
                  <select {...register("bedrooms")} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20">
                    <option value="">Bebas</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">Kamar Mandi Minimum</label>
                  <select {...register("bathrooms")} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20">
                    <option value="">Bebas</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                  </select>
                </div>
              </div>

              {/* Fasilitas Tambahan */}
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">Luas Tanah Min (m²)</label>
                  <input type="number" {...register("minArea")} placeholder="Contoh: 100" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-3">Fasilitas Khusus</label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" {...register("pool")} className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary" />
                      <span className="text-sm text-slate-700">Kolam Renang</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" {...register("garage")} className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary" />
                      <span className="text-sm text-slate-700">Garasi</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
              <Button type="button" onClick={() => reset()} variant="outline" className="px-6 rounded-xl border-slate-200 h-12">Reset</Button>
              <Button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white px-8 rounded-xl h-12 shadow-md">Terapkan Filter</Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
