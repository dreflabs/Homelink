import { getBuyerDashboard, getBuyerFavorites } from "@/actions/dashboard";
import { Suspense } from "react";
import { Sparkles, CalendarClock, Eye, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { EmptyState } from "@/components/shared/EmptyState";
import { PropertyCard } from "@/components/shared/PropertyCard";

function HeroSkeleton() {
  return (
    <div className="bg-slate-100 border border-slate-200 p-8 rounded-3xl h-[120px] animate-pulse w-full"></div>
  );
}

function GridSkeleton() {
  return (
    <div className="mt-8">
      <div className="h-7 w-48 bg-slate-100 rounded mb-6 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-[400px] bg-slate-100 rounded-3xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}

async function DashboardHero() {
  const data = await getBuyerDashboard();
  const t = await getTranslations("BuyerDashboard");
  
  let icon = <Sparkles className="w-5 h-5 text-primary" />;
  let title = `${t("dashboard.welcome")}, ${data.profile.name}!`;
  let subtitle = "Mulai jelajahi properti terverifikasi.";
  let ctaText = "Cari Properti";
  let ctaLink = "/search-result";

  if (data.heroState.upcomingBooking) {
    icon = <CalendarClock className="w-5 h-5 text-primary" />;
    title = `Jadwal Survei Terdekat`;
    subtitle = `Anda memiliki jadwal survei untuk ${data.heroState.upcomingBooking.propertyTitle}.`;
    ctaText = "Lihat Jadwal";
    ctaLink = "/dashboard/bookings";
  } else if (data.heroState.recentlyViewed) {
    icon = <Eye className="w-5 h-5 text-primary" />;
    title = `Lanjutkan Pencarian Anda`;
    subtitle = `Anda terakhir melihat properti: ${data.heroState.recentlyViewed.propertyTitle}.`;
    ctaText = "Lihat Properti";
    ctaLink = `/property/${data.heroState.recentlyViewed.propertyId}`;
  }

  return (
    <div className="bg-white border border-slate-200 p-8 md:p-10 rounded-[2rem] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex gap-5 items-start">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 shrink-0">
          {icon}
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{title}</h1>
          <p className="text-slate-500 mt-2 text-base md:text-lg max-w-xl font-medium">{subtitle}</p>
        </div>
      </div>
      <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 py-6 h-auto text-base font-semibold shrink-0 shadow-sm transition-all duration-300 hover:-translate-y-0.5" asChild>
        <Link href={ctaLink}>{ctaText} <ArrowRight className="ml-2 w-5 h-5" /></Link>
      </Button>
    </div>
  );
}

async function SavedPropertiesGrid() {
  const { data } = await getBuyerFavorites(1, 4);

  if (!data || data.length === 0) {
    return (
      <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Properti Tersimpan</h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full mt-3 mb-8"></div>
        </div>
        <EmptyState 
          icon={Heart}
          title="Belum Ada Properti Tersimpan"
          description="Anda belum menyimpan properti apapun. Mulai jelajahi dan simpan properti impian Anda untuk membandingkannya nanti."
          className="border-dashed border-2 border-slate-200/60 bg-gradient-to-b from-slate-50/50 to-white hover:border-blue-300 transition-colors duration-500 py-16"
          action={
            <Button className="rounded-full mt-4 bg-primary hover:bg-primary text-white px-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5" asChild>
              <Link href="/search-result">Cari Properti <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Properti Tersimpan</h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full mt-3"></div>
        </div>
        <Link href="/dashboard/favorites" className="text-sm font-semibold text-primary hover:text-primary flex items-center group transition-colors">
          Lihat Semua <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((property) => (
          <PropertyCard
            key={property.id}
            id={property.propertyId}
            title={property.title}
            price={property.price}
            address={property.address}
            specs={{
              bed: property.bedrooms || 0,
              bath: property.bathrooms || 0,
              area: property.surfaceArea || 0,
            }}
            imageUrl={property.imageUrl || "/property_1.jpg"}
            isVerified={property.status === "PUBLISHED"}
          />
        ))}
      </div>
    </div>
  );
}

export default async function BuyerDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <Suspense fallback={<HeroSkeleton />}>
        <DashboardHero />
      </Suspense>

      <Suspense fallback={<GridSkeleton />}>
        <SavedPropertiesGrid />
      </Suspense>
    </div>
  );
}
