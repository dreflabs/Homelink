import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Image as ImageIcon, ShieldCheck, Clock, MapPin, ChevronRight } from "lucide-react";

export default function PhotographerDashboard() {
  const statTiles = [
    {
      title: "Jadwal Pemotretan",
      value: "5",
      description: "Minggu ini",
      icon: Calendar,
      color: "text-blue-700",
      bgColor: "bg-blue-50",
    },
    {
      title: "Foto Diproses",
      value: "12",
      description: "Dalam editing",
      icon: ImageIcon,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      title: "Proyek Selesai",
      value: "48",
      description: "Total bulan ini",
      icon: ShieldCheck,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
  ];

  const upcomingSchedules = [
    {
      id: "SCH-001",
      property: "Vila Indah Kemang",
      address: "Jl. Kemang Raya No 12, Jakarta Selatan",
      date: "25 Jul 2026",
      time: "10:00 WIB",
      status: "Menunggu",
    },
    {
      id: "SCH-002",
      property: "Apartemen Sudirman Suites",
      address: "Jl. Jend. Sudirman Kav 36, Jakarta Pusat",
      date: "26 Jul 2026",
      time: "14:00 WIB",
      status: "Terkonfirmasi",
    },
    {
      id: "SCH-003",
      property: "Rumah Modern Bintaro",
      address: "Bintaro Sektor 7, Tangerang Selatan",
      date: "28 Jul 2026",
      time: "09:00 WIB",
      status: "Menunggu",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-6 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Fotografer</h1>
        <p className="text-muted-foreground mt-2 text-lg">Selamat datang kembali! Berikut adalah ringkasan pekerjaan Anda.</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statTiles.map((stat, index) => (
          <Card key={index} className="rounded-2xl border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
              <div className={`p-2 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`}  />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Schedules */}
      <Card className="rounded-2xl border-slate-100 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-slate-900">Jadwal Terdekat</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Daftar pemotretan properti Anda dalam waktu dekat.</p>
          </div>
          <Button variant="outline" className="rounded-xl text-blue-700 border-blue-200 hover:bg-blue-50">
            Lihat Semua Jadwal
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-slate-100 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-semibold text-slate-700">ID</TableHead>
                  <TableHead className="font-semibold text-slate-700">Properti</TableHead>
                  <TableHead className="font-semibold text-slate-700">Waktu</TableHead>
                  <TableHead className="font-semibold text-slate-700">Status</TableHead>
                  <TableHead className="text-right font-semibold text-slate-700">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingSchedules.map((schedule) => (
                  <TableRow key={schedule.id} className="hover:bg-slate-50/50">
                    <TableCell className="font-medium text-slate-900">{schedule.id}</TableCell>
                    <TableCell>
                      <div className="font-medium text-slate-900">{schedule.property}</div>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <MapPin className="w-3 h-3 mr-1"  />
                        {schedule.address}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-slate-700">
                        <Calendar className="w-4 h-4 mr-2 text-slate-400"  />
                        {schedule.date}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Clock className="w-3.5 h-3.5 mr-2 "  />
                        {schedule.time}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary" 
                        className={`rounded-full px-3 py-1 font-medium ${
                          schedule.status === "Terkonfirmasi" 
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" 
                            : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                        }`}
                      >
                        {schedule.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="rounded-full text-slate-400 hover:text-blue-700 hover:bg-blue-50">
                        <ChevronRight className="w-5 h-5"  />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
