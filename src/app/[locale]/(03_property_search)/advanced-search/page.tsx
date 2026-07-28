"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { SearchHeroWrapper } from '@/components/shared/SearchHeroWrapper';
import { SlidersHorizontal } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("PropertySearch.AdvancedSearch");
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
            <h1 className="text-2xl font-bold text-slate-900">{t("pageTitle")}</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Lokasi & Tipe Properti */}
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">{t("locationLabel")}</label>
                  <input type="text" {...register("city")} placeholder={t("locationPlaceholder")} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">{t("propertyTypeLabel")}</label>
                  <select {...register("type")} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20">
                    <option value="">{t("allTypes")}</option>
                    <option value="house">{t("house")}</option>
                    <option value="apartment">{t("apartment")}</option>
                    <option value="land">{t("land")}</option>
                  </select>
                </div>
              </div>

              {/* Harga */}
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">{t("minPriceLabel")}</label>
                  <input type="number" {...register("minPrice")} placeholder={t("minPricePlaceholder")} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">{t("maxPriceLabel")}</label>
                  <input type="number" {...register("maxPrice")} placeholder={t("maxPricePlaceholder")} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>

              {/* Spesifikasi */}
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">{t("minBedroomsLabel")}</label>
                  <select {...register("bedrooms")} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20">
                    <option value="">{t("any")}</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">{t("minBathroomsLabel")}</label>
                  <select {...register("bathrooms")} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20">
                    <option value="">{t("any")}</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                  </select>
                </div>
              </div>

              {/* Fasilitas Tambahan */}
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">{t("minAreaLabel")}</label>
                  <input type="number" {...register("minArea")} placeholder={t("minAreaPlaceholder")} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-3">{t("specialFacilitiesLabel")}</label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" {...register("pool")} className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary" />
                      <span className="text-sm text-slate-700">{t("pool")}</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" {...register("garage")} className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary" />
                      <span className="text-sm text-slate-700">{t("garage")}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
              <Button type="button" onClick={() => reset()} variant="outline" className="px-6 rounded-xl border-slate-200 h-12">{t("reset")}</Button>
              <Button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white px-8 rounded-xl h-12 shadow-md">{t("applyFilters")}</Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
