import { getOwnerDashboard } from "@/actions/dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Eye, MessageSquare, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default async function OwnerDashboardPage() {
  const data = await getOwnerDashboard();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Halo, {data.profile.name}!</h1>
        <p className="text-gray-500 mt-2 text-lg">Ringkasan performa properti Anda hari ini.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Properti</CardTitle>
            <Building className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{data.stats.totalProperties}</div>
            <p className="text-xs text-gray-500 mt-1">{data.stats.activeListings} Listing Aktif</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Tayangan</CardTitle>
            <Eye className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{data.stats.totalViews}</div>
            <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12% bulan ini
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pesan Masuk</CardTitle>
            <MessageSquare className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{data.stats.inquiries}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>Pembaruan terbaru dari properti Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {data.recentActivities.map((activity) => (
                <div key={activity.id} className="flex gap-4 items-start">
                  <div className="bg-slate-100 p-2 rounded-full mt-1">
                    <Clock className="h-4 w-4 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(activity.date).toLocaleString("id-ID", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>Performa Bulanan</CardTitle>
            <CardDescription>Tren tayangan properti Anda</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center min-h-[250px] bg-slate-50 rounded-lg border border-slate-100">
            {/* Placeholder for chart */}
            <div className="text-slate-400 flex flex-col items-center gap-2">
              <TrendingUp className="w-8 h-8 opacity-50" />
              <p className="text-sm">Grafik performa akan tampil di sini</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
