import React, { Suspense } from "react";
import Link from "next/link";
import { PropertyCard } from "./PropertyCard";
import { FadeIn } from "./FadeIn";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import prisma from "@/lib/prisma";
import { getTranslations } from "next-intl/server";

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-3xl shadow-card bg-white h-[400px] overflow-hidden flex flex-col animate-pulse">
          <div className="aspect-[4/3] bg-slate-200"></div>
          <div className="p-5 flex flex-col gap-4">
            <div className="h-6 bg-slate-200 rounded w-3/4"></div>
            <div className="h-6 bg-slate-200 rounded w-1/2"></div>
            <div className="h-4 bg-slate-200 rounded w-full mt-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// In a real app, you'd pass a filter string or object. For now we use the default.
export async function FeaturedPropertiesGrid({ filter = "terbaru" }: { filter?: string }) {
  const t = await getTranslations("Public.HomePage");
  
  // Apply filter context logic
  let orderBy: any = { createdAt: "desc" };
  
  // Since we only requested to filter by context visually in tabs, we can implement basic logic here
  // In a full implementation, you might filter by tags or specific locations
  
  const featuredProperties = await prisma.property.findMany({
    where: { 
      status: { in: ["FULLY_VERIFIED", "PHYSICAL_VERIFIED"] } 
    },
    take: 8,
    orderBy,
    include: { media: true },
  }); // Removed .catch() to allow bubbling to error.tsx

  if (featuredProperties.length === 0) {
    return (
      <div className="text-center py-24 bg-slate-50 rounded-3xl border border-slate-100 shadow-card max-w-3xl mx-auto">
        <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-6" strokeWidth={1.5} />
        <h3 className="text-2xl font-bold text-slate-900 mb-3">{t("Collections.empty_title")}</h3>
        <p className="text-slate-500 text-base mb-8 max-w-md mx-auto">
          {t("Collections.empty_desc")}
        </p>
        <Button asChild className="rounded-full bg-primary hover:bg-primary text-white px-8">
          <Link href="/search-result">{t("Collections.empty_button")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {featuredProperties.map((prop, index) => (
        <FadeIn key={prop.id} delay={0.05 * (index + 1)}>
          <PropertyCard 
            id={prop.id}
            title={prop.title}
            price={Number(prop.price)}
            address={prop.address}
            specs={{ 
              bed: (prop as any).bedroom ?? 0, 
              bath: (prop as any).bathroom ?? 0, 
              area: (prop as any).buildingArea ?? (prop as any).landArea ?? 0 
            }}
            imageUrl={prop.media?.[0]?.s3Url || "/property_1.jpg"}
            isVerified={prop.status === 'FULLY_VERIFIED'}
            isFeatured={true}
          />
        </FadeIn>
      ))}
    </div>
  );
}

export async function ContextualCollectionsTabs() {
  const t = await getTranslations("FeaturedProperties");
  return (
    <div className="flex overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar">
      <button className="px-5 py-2 rounded-full bg-slate-900 text-white text-sm font-semibold whitespace-nowrap">{t("tab_1")}</button>
      <button className="px-5 py-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 text-sm font-semibold whitespace-nowrap transition-colors">{t("tab_2")}</button>
      <button className="px-5 py-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 text-sm font-semibold whitespace-nowrap transition-colors">{t("tab_3")}</button>
      <button className="px-5 py-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 text-sm font-semibold whitespace-nowrap transition-colors">{t("tab_4")}</button>
    </div>
  );
}
