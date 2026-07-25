import React from "react";
import { getPropertyAnalytics } from "@/actions/dashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Eye, CalendarCheck, TrendingUp, ArrowUpRight } from "lucide-react";

export default async function PropertyAnalyticsPage(props: {
  params: Promise<{ propertyId: string }> | { propertyId: string };
}) {
  const params = await props.params;
  const propertyId = params.propertyId;

  let analytics;
  try {
    analytics = await getPropertyAnalytics(propertyId);
  } catch (err: any) {
    return (
      <div className="max-w-6xl mx-auto p-6 md:p-8 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Analitik Properti</h1>
        <p className="text-red-500">{err.message || "Gagal memuat analitik properti."}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Analitik Properti</h1>
        <p className="text-slate-500 text-sm md:text-base">
          Pantau performa, jumlah tayangan, dan pemesanan (bookings) untuk <span className="font-semibold text-slate-800">{analytics.propertyTitle}</span>.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Views Tile */}
        <Card className="border-slate-200/60 shadow-sm overflow-hidden bg-white/50 backdrop-blur-xl rounded-2xl transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Views</CardTitle>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Eye className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">{analytics.totalViews.toLocaleString()}</div>
            <div className="flex items-center text-xs text-emerald-600 mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              <span>Real-time traffic view logs</span>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Tile */}
        <Card className="border-slate-200/60 shadow-sm overflow-hidden bg-white/50 backdrop-blur-xl rounded-2xl transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Bookings</CardTitle>
            <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
              <CalendarCheck className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">{analytics.totalBookings.toLocaleString()}</div>
            <div className="flex items-center text-xs text-emerald-600 mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              <span>Permintaan jadwal survei</span>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Rate Tile */}
        <Card className="border-slate-200/60 shadow-sm overflow-hidden bg-white/50 backdrop-blur-xl rounded-2xl transition-all hover:shadow-md md:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Conversion Rate</CardTitle>
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
              <TrendingUp className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">{analytics.conversionRate}</div>
            <div className="flex items-center text-xs text-emerald-600 mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              <span>Rasio booking per tayangan</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Harian */}
      <Card className="border-slate-200/60 shadow-sm overflow-hidden bg-white/50 backdrop-blur-xl rounded-2xl">
        <CardHeader className="border-b border-slate-100 bg-slate-50/30 pb-5">
          <CardTitle className="text-lg font-semibold text-slate-800">Traffic & Engagement</CardTitle>
          <CardDescription className="text-slate-500">
            Statistik statistik interaksi langsung yang dicatat dari basis data.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-[240px] w-full rounded-xl bg-gradient-to-tr from-slate-50 to-slate-100/50 flex flex-col items-center justify-center text-slate-400 border border-slate-200/50 shadow-inner relative overflow-hidden group">
            <TrendingUp className="w-8 h-8 mb-3 text-slate-300 group-hover:text-blue-400 transition-colors duration-500" />
            <span className="font-medium text-sm text-slate-500 z-10 bg-white/80 px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm">
              Aktif • {analytics.totalViews} tayangan terverifikasi
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
