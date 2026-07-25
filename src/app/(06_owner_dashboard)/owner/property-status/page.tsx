import React from "react";
import { getOwnerPropertyStatuses } from "@/actions/dashboard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Eye, MessageSquare, TrendingUp, Building } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function PropertyStatusPage() {
  let properties: any[] = [];
  try {
    properties = await getOwnerPropertyStatuses();
  } catch (err) {
    console.error("Failed to load property statuses:", err);
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Status & Performa</h1>
          <p className="text-gray-500 mt-2">Pantau status listing dan metrik performa masing-masing properti Anda.</p>
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
                    <Building className="w-12 h-12 text-slate-300" />
                  )}
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{prop.name}</h3>
                      <Badge variant={prop.status === 'Aktif' ? 'default' : 'secondary'}>{prop.status}</Badge>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
                      <MapPin className="w-4 h-4" /> {prop.location}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Eye className="w-3 h-3"/> Tayangan</p>
                      <p className="font-semibold text-lg">{prop.views}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><MessageSquare className="w-3 h-3"/> Pertanyaan</p>
                      <p className="font-semibold text-lg">{prop.inquiries}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> Konversi</p>
                      <p className="font-semibold text-lg">{prop.views > 0 ? ((prop.inquiries / prop.views) * 100).toFixed(1) : 0}%</p>
                    </div>
                    <div className="flex items-end justify-end">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/owner/properties/${prop.id}/analytics`}>Lihat Detail</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed">
            <Building className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-gray-900">Belum ada properti</h3>
            <p className="text-sm text-gray-500 mt-1">Tambahkan properti untuk memantau status dan performanya.</p>
          </div>
        )}
      </div>
    </div>
  );
}
