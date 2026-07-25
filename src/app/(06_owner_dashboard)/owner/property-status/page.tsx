import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, MapPin, Eye, MessageSquare, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function PropertyStatusPage() {
  const properties = [
    { id: 1, name: "Villa Indah Kasih", status: "Aktif", views: 850, inquiries: 12, location: "Bandung", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80" },
    { id: 2, name: "Apartemen Senayan", status: "Menunggu Review", views: 0, inquiries: 0, location: "Jakarta", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Status & Performa</h1>
          <p className="text-gray-500 mt-2">Pantau status listing dan metrik performa masing-masing properti.</p>
        </div>
      </div>

      <div className="space-y-6">
        {properties.map((prop) => (
          <Card key={prop.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-64 h-48 md:h-auto">
                <Image src={prop.image} alt={prop.name} fill className="object-cover" />
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
                    <Button variant="outline" size="sm">Lihat Detail</Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
