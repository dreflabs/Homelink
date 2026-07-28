import { auth } from "@/lib/auth";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { History, Clock, Trash2, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EmptyState } from "@/components/shared/EmptyState";
import { PropertyCard } from "@/components/shared/PropertyCard";

export default async function Page() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const t = await getTranslations("BuyerDashboard.recentlyViewed");

  // Dummy data for static UI presentation until backend is ready
  const dummyHistory = [
    {
      id: "1",
      title: "Vila Modern Kemang",
      price: 5500000000,
      address: "Kemang, Jakarta Selatan",
      imageUrl: "/property_1.jpg",
      viewedAt: "2 jam lalu",
      bedrooms: 4,
      bathrooms: 3,
      surfaceArea: 250,
    },
    {
      id: "2",
      title: "Apartemen Sudirman Suites",
      price: 2100000000,
      address: "Sudirman, Jakarta Pusat",
      imageUrl: "/property_1.jpg",
      viewedAt: "Kemarin",
      bedrooms: 2,
      bathrooms: 2,
      surfaceArea: 85,
    },
  ];

  const isEmpty = false; // Toggle this to test Empty State

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{t("title")}</h1>
          <p className="text-slate-500 mt-2 text-lg">{t("subtitle")}</p>
        </div>
        {!isEmpty && (
          <Button variant="outline" className="text-slate-500 hover:text-red-600 hover:border-red-200 transition-colors">
            <Trash2 className="w-4 h-4 mr-2" />
            Hapus Semua Riwayat
          </Button>
        )}
      </div>

      {isEmpty ? (
        <EmptyState 
          icon={History}
          title="Belum ada properti yang dilihat"
          description="Anda belum melihat detail properti apapun. Riwayat properti yang Anda buka akan muncul di sini."
          className="border-dashed border-2 border-slate-200/60 bg-gradient-to-b from-slate-50/50 to-white py-20"
          action={
            <Button className="rounded-full mt-4 bg-primary hover:bg-primary text-white px-8 shadow-sm transition-all hover:-translate-y-0.5" asChild>
              <Link href="/search-result">Jelajahi Properti <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dummyHistory.map((item) => (
            <div key={item.id} className="relative group">
              <PropertyCard
                id={item.id}
                title={item.title}
                price={item.price}
                address={item.address}
                specs={{ bed: item.bedrooms, bath: item.bathrooms, area: item.surfaceArea }}
                imageUrl={item.imageUrl}
                isVerified={true}
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 z-10 border border-slate-100">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-xs font-medium text-slate-700">{item.viewedAt}</span>
              </div>
              <Button 
                variant="destructive" 
                size="icon" 
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-md h-8 w-8 rounded-full"
                title="Hapus dari Riwayat"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
