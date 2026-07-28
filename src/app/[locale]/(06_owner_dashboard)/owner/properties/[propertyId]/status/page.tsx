import React from "react";
import { getOwnerPropertyStatuses } from "@/actions/dashboard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Eye, MessageCircle, ChartCandlestick, Building } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function PropertyStatusPage() {
  let properties: any[] = [];
  try {
    const res = await getOwnerPropertyStatuses();
    properties = res.data;
  } catch (err: any) {
    console.error("Failed to load property statuses:", err);
  }

  const t = await getTranslations("OwnerDashboard.property_status");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{t("title")}</h1>
          <p className="text-gray-500 mt-2">{t("desc")}</p>
        </div>
      </div>

      <div className="space-y-6">
        {properties.length > 0 ? (
          properties.map((prop) => (
            <Card key={prop.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-64 h-48 md:h-auto bg-slate-100 flex items-center justify-center">
                  {prop.image ? (
                    <Image src={prop.image} alt={prop.name} fill className="object-cover" />
                  ) : (
                    <Building className="w-12 h-12 " />
                  )}
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{prop.name}</h3>
                      <Badge variant={prop.status === 'Aktif' ? 'default' : 'secondary'}>{prop.status}</Badge>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
                      <MapPin className="w-5 h-5" /> {prop.location}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Eye className="w-3 h-3"/> {t("views")}</p>
                      <p className="font-semibold text-lg">{prop.views}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><MessageCircle className="w-3 h-3"/> {t("inquiries")}</p>
                      <p className="font-semibold text-lg">{prop.inquiries}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><ChartCandlestick className="w-3 h-3"/> {t("conversion")}</p>
                      <p className="font-semibold text-lg">{prop.views > 0 ? ((prop.inquiries / prop.views) * 100).toFixed(1) : 0}%</p>
                    </div>
                    <div className="flex items-end justify-end">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/owner/properties/${prop.id}/analytics`}>{t("view_details")}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed">
            <Building className="w-12 h-12  mx-auto mb-3" />
            <h3 className="text-base font-semibold text-gray-900">{t("no_properties")}</h3>
            <p className="text-sm text-gray-500 mt-1">{t("no_properties_desc")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
