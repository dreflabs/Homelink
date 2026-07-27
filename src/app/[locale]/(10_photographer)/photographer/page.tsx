import { getTranslations } from 'next-intl/server';
import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Image as ImageIcon, ShieldCheck, Clock, MapPin, ChevronRight } from "lucide-react";
import { getPhotographerTasks, getPhotographerDashboardStats } from "@/actions/photographer";

export default async function PhotographerDashboard() {
  const tTable = await getTranslations('Common.table');

  const [stats, tasks] = await Promise.all([
    getPhotographerDashboardStats(),
    getPhotographerTasks(),
  ]);

  const statTiles = [
    {
      title: "Jadwal Pemotretan",
      value: String(stats.scheduledThisWeek),
      description: "Minggu ini",
      icon: Calendar,
      color: "text-primary",
      bgColor: "bg-slate-50",
    },
    {
      title: "Foto Diproses",
      value: String(stats.deliveriesPending),
      description: "Dalam editing",
      icon: ImageIcon,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      title: "Proyek Selesai",
      value: String(stats.deliveriesDoneThisMonth),
      description: "Total bulan ini",
      icon: ShieldCheck,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
  ];

  const upcomingSchedules = tasks.slice(0, 5);

  return (
    <div className="min-h-screen bg-white p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Fotografer</h1>
        <p className="text-muted-foreground mt-2 text-lg">Selamat datang kembali! Berikut adalah ringkasan pekerjaan Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statTiles.map((stat, index) => (
          <Card key={index} className="rounded-2xl border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
              <div className={`p-2 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-2xl border-slate-100 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-slate-900">Jadwal Terdekat</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Daftar pemotretan properti Anda dalam waktu dekat.</p>
          </div>
          <Button asChild variant="outline" className="rounded-xl text-primary border-slate-200 hover:bg-slate-50">
            <Link href="/photographer/assignments">Lihat Semua Jadwal</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-slate-100 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-semibold text-slate-700">Properti</TableHead>
                  <TableHead className="font-semibold text-slate-700">Waktu</TableHead>
                  <TableHead className="font-semibold text-slate-700">{tTable('status')}</TableHead>
                  <TableHead className="text-right font-semibold text-slate-700">{tTable('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingSchedules.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                      Tidak ada jadwal pemotretan mendatang.
                    </TableCell>
                  </TableRow>
                ) : (
                  upcomingSchedules.map((task) => (
                    <TableRow key={task.id} className="hover:bg-slate-50/50">
                      <TableCell>
                        <div className="font-medium text-slate-900">{task.property.title}</div>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {task.property.address}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-slate-700">
                          <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                          {task.scheduledAt ? new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(task.scheduledAt)) : "-"}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Clock className="w-3.5 h-3.5 mr-2" />
                          {task.scheduledAt ? new Intl.DateTimeFormat("id-ID", { timeStyle: "short" }).format(new Date(task.scheduledAt)) : "-"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`rounded-full px-3 py-1 font-medium ${
                            task.status === "CONFIRMED"
                              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                              : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                          }`}
                        >
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="ghost" size="icon" className="rounded-full text-slate-400 hover:text-primary hover:bg-slate-50">
                          <Link href="/photographer/assignments">
                            <ChevronRight className="w-5 h-5" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
