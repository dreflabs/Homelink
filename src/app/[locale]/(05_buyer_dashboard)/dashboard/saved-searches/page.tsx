import { auth } from "@/lib/auth";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { Search, BookmarkPlus, SlidersHorizontal, BellRing, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { EmptyState } from "@/components/shared/EmptyState";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default async function Page() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const t = await getTranslations("BuyerDashboard.savedSearches");

  const dummySearches = [
    {
      id: "1",
      label: "Rumah Bandung < 2M",
      filters: ["Rumah", "Rp 1M - Rp 2M", "Bandung, Jawa Barat", "3+ Kamar Tidur"],
    },
    {
      id: "2",
      label: "Apartemen Studio Jaksel",
      filters: ["Apartemen", "< Rp 1M", "Jakarta Selatan", "Studio"],
    },
  ];

  const isEmpty = false;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{t("title")}</h1>
          <p className="text-slate-500 mt-2 text-lg">{t("subtitle")}</p>
        </div>
      </div>

      {isEmpty ? (
        <EmptyState 
          icon={Search}
          title="Belum ada pencarian tersimpan"
          description="Simpan kriteria pencarian favorit Anda agar mudah diakses kembali tanpa harus mengatur filter dari awal."
          className="border-dashed border-2 border-slate-200/60 bg-gradient-to-b from-slate-50/50 to-white py-20"
          action={
            <Button className="rounded-full mt-4 bg-primary hover:bg-primary text-white px-8 shadow-sm transition-all hover:-translate-y-0.5" asChild>
              <Link href="/search-result">Mulai Pencarian <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          }
        />
      ) : (
        <div className="space-y-4">
          {dummySearches.map((search) => (
            <Card key={search.id} className="p-6 border-slate-200 shadow-sm hover:shadow-md transition-shadow rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <BookmarkPlus className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold text-slate-900">{search.label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {search.filters.map((filter, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-slate-100 text-slate-600 font-medium hover:bg-slate-200 border-none">
                      <SlidersHorizontal className="w-3 h-3 mr-1.5" />
                      {filter}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 opacity-60 cursor-not-allowed">
                        <BellRing className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-medium text-slate-500">Beri tahu saya</span>
                        <div className="w-8 h-4 bg-slate-200 rounded-full ml-2 relative">
                          <div className="w-3 h-3 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Fitur notifikasi segera hadir</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/5 rounded-xl font-semibold">
                  Jalankan Pencarian
                </Button>
                
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl">
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
