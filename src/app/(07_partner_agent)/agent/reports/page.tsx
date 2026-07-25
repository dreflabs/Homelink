import { Card } from "@/components/ui/card";
import {
  TrendingUp,
  Users,
  DollarSign,
  Home,
  CheckCircle2,
  Star,
  BarChart3,
} from "lucide-react";

const stats = [
  { label: "Total Leads Ditangani", value: "48", change: "+12%", positive: true, icon: Users },
  { label: "Properti Berhasil Dijual", value: "9", change: "+3 dari bulan lalu", positive: true, icon: Home },
  { label: "Total Komisi Diterima", value: "Rp 780M", change: "+18%", positive: true, icon: DollarSign },
  { label: "Conversion Rate", value: "18.75%", change: "+2.3%", positive: true, icon: TrendingUp },
  { label: "Rating Klien", value: "4.8 / 5", change: "Dari 36 ulasan", positive: true, icon: Star },
  { label: "Tugas Diselesaikan", value: "94%", change: "vs target 85%", positive: true, icon: CheckCircle2 },
];

const monthlyData = [
  { month: "Jan", leads: 6, sales: 1 },
  { month: "Feb", leads: 8, sales: 1 },
  { month: "Mar", leads: 5, sales: 0 },
  { month: "Apr", leads: 10, sales: 2 },
  { month: "Mei", leads: 7, sales: 2 },
  { month: "Jun", leads: 12, sales: 3 },
];

const maxLeads = Math.max(...monthlyData.map((d) => d.leads));

export default function AgentReportsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Laporan Performa</h1>
        <p className="text-slate-500 mt-1 text-sm">
          Ringkasan performa Anda selama 6 bulan terakhir.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="rounded-2xl shadow-sm border-slate-100 p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-blue-50 rounded-xl">
                  <Icon className="w-4 h-4 text-blue-600" />
                </div>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    stat.positive
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart Placeholder */}
        <Card className="rounded-2xl shadow-sm border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-900">Leads per Bulan</h3>
              <p className="text-xs text-slate-400 mt-0.5">Jan – Jun 2026</p>
            </div>
            <BarChart3 className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex items-end justify-between gap-3 h-40">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex flex-col items-center gap-1.5 flex-1">
                <span className="text-xs text-slate-500 font-medium">{d.leads}</span>
                <div
                  className="w-full bg-blue-500 rounded-t-md transition-all"
                  style={{ height: `${(d.leads / maxLeads) * 120}px` }}
                />
                <span className="text-xs text-slate-400">{d.month}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Conversion Chart Placeholder */}
        <Card className="rounded-2xl shadow-sm border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-900">Penjualan per Bulan</h3>
              <p className="text-xs text-slate-400 mt-0.5">Jan – Jun 2026</p>
            </div>
            <TrendingUp className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex items-end justify-between gap-3 h-40">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex flex-col items-center gap-1.5 flex-1">
                <span className="text-xs text-slate-500 font-medium">{d.sales}</span>
                <div
                  className="w-full bg-emerald-500 rounded-t-md transition-all"
                  style={{ height: `${Math.max(d.sales * 40, 4)}px` }}
                />
                <span className="text-xs text-slate-400">{d.month}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card className="rounded-2xl shadow-sm border-slate-100 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Ringkasan Kuartal</h3>
        <div className="space-y-3">
          {[
            { label: "Target Penjualan Q2 2026", progress: 90, color: "bg-blue-500" },
            { label: "Kepuasan Klien", progress: 96, color: "bg-emerald-500" },
            { label: "Tingkat Respon Leads", progress: 78, color: "bg-amber-500" },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm text-slate-700">{item.label}</span>
                <span className="text-sm font-semibold text-slate-900">{item.progress}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.color}`}
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
