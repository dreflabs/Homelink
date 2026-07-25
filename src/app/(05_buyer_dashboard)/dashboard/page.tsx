import { getBuyerDashboard } from "@/actions/dashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Heart, Calendar, FileText, MessageSquare, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export default async function BuyerDashboardPage() {
  const data = await getBuyerDashboard();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Selamat Datang, {data.profile.name}!</h1>
        <p className="text-gray-500 mt-2 text-lg">Berikut adalah ringkasan aktivitas pencarian properti Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Properti Tersimpan</CardTitle>
            <Heart className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{data.stats.totalSavedProperties}</div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Jadwal Kunjungan</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{data.stats.totalBookings}</div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Penawaran Aktif</CardTitle>
            <FileText className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{data.stats.totalLeads}</div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pesan Belum Dibaca</CardTitle>
            <MessageSquare className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{data.stats.totalSavedSearches}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>Pembaruan terbaru dari interaksi Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {data.recentActivities.map((activity) => (
                <div key={activity.id} className="flex gap-4 items-start">
                  <div className="bg-blue-50 p-2 rounded-full mt-1">
                    <Clock className="h-4 w-4 text-blue-600" />
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
            <div className="mt-6">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/messages">Lihat Semua Aktivitas</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="h-full bg-gradient-to-br from-indigo-900 to-slate-800 text-white border-0">
          <CardHeader>
            <CardTitle className="text-indigo-50">Lengkapi Profil Anda</CardTitle>
            <CardDescription className="text-indigo-200">
              Profil yang lengkap akan mempercepat proses pengajuan penawaran.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2 text-indigo-100">
                <span>Kelengkapan Profil</span>
                <span>80%</span>
              </div>
              <div className="w-full bg-indigo-950/50 rounded-full h-2.5">
                <div className="bg-indigo-400 h-2.5 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <Button className="bg-white text-indigo-900 hover:bg-indigo-50" asChild>
              <Link href="/dashboard/my-profile">Perbarui Profil</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
