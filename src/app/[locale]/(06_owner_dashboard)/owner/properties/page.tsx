import { Suspense } from "react";
import Link from "next/link";
import { SlidersHorizontal, Building } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getOwnerProperties } from "@/actions/dashboard";
import { PropertiesClient } from "@/components/dashboard/properties-client";
import { getTranslations } from "next-intl/server";

type PropertyStatus = "ALL" | "DRAFT" | "PENDING_REVIEW" | "PUBLISHED" | "REJECTED";
type PropertyType = "ALL" | "HOUSE" | "APARTMENT" | "LAND";

function PropertiesSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-2xl border bg-white p-4 h-80">
          <Skeleton className="w-full h-40 rounded-xl mb-4" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <Skeleton className="h-6 w-1/3" />
        </div>
      ))}
    </div>
  );
}

async function PropertiesList({ statusFilter, typeFilter }: { statusFilter: string; typeFilter: string }) {
  const res = await getOwnerProperties(statusFilter, typeFilter);
  const properties = (res as any).data ?? [];
  return <PropertiesClient initialProperties={properties} />;
}

export default function MyPropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; type?: string }>;
}) {
  return (
    <OwnerPropertiesPageInner searchParams={searchParams} />
  );
}

async function OwnerPropertiesPageInner({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; type?: string }>;
}) {
  const params = await searchParams;
  const statusFilter = (params.status as PropertyStatus) || "ALL";
  const typeFilter = (params.type as PropertyType) || "ALL";

  const buildUrl = (key: string, value: string) => {
    const q = new URLSearchParams();
    if (key !== "status" && statusFilter !== "ALL") q.set("status", statusFilter);
    if (key !== "type" && typeFilter !== "ALL") q.set("type", typeFilter);
    if (value !== "ALL") q.set(key, value);
    const qs = q.toString();
    return `/owner/properties${qs ? `?${qs}` : ""}`;
  };

  const t = await getTranslations("OwnerDashboard.properties");

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t("my_listings")}</h1>
          <p className="text-gray-500 text-sm mt-1">{t("manage_desc")}</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary">
          <Link href="/owner/properties/new">{t("add_property")}</Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 p-4 rounded-xl border">
        <Tabs defaultValue={statusFilter} className="w-full sm:w-auto">
          <TabsList className="w-full sm:w-auto overflow-x-auto justify-start">
            {(["ALL", "PUBLISHED", "PENDING_REVIEW", "DRAFT", "REJECTED"] as const).map((s) => (
              <TabsTrigger key={s} value={s} nativeButton={false} render={
                <Link href={buildUrl("status", s)} />
              }>
                {s === "ALL" ? t("filter_all") : s === "PUBLISHED" ? t("filter_published") : s === "PENDING_REVIEW" ? t("filter_pending") : s === "DRAFT" ? t("filter_draft") : t("filter_rejected")}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <SlidersHorizontal className="w-5 h-5 text-gray-500" />
          <Select value={typeFilter} defaultValue={typeFilter}>
            <SelectTrigger className="w-full sm:w-[180px] bg-white">
              <SelectValue placeholder={t("property_type")} />
            </SelectTrigger>
            <SelectContent>
              {(["ALL", "HOUSE", "APARTMENT", "LAND"] as const).map((tVal) => (
                <SelectItem key={tVal} value={tVal}>
                  <Link href={buildUrl("type", tVal)}>
                    {tVal === "ALL" ? t("type_all") : tVal === "HOUSE" ? t("type_house") : tVal === "APARTMENT" ? t("type_apartment") : t("type_land")}
                  </Link>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Suspense fallback={<PropertiesSkeleton />}>
        <PropertiesList statusFilter={statusFilter} typeFilter={typeFilter} />
      </Suspense>
    </div>
  );
}
