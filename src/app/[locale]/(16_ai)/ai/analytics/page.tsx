"use client";

import { Activity, Coins, Cpu, Clock, Zap, ChartCandlestick, BarChart3, Database, Bot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import type { LucideIcon } from "lucide-react";

type StatItem = {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
  colorClass: string;
  bgClass: string;
};

// Static stats — icon components defined here, never from API response
const DEFAULT_STATS: StatItem[] = [
  {
    title: "Total Token Digunakan",
    value: "—",
    change: "—",
    isPositive: true,
    icon: Coins,
    colorClass: "text-amber-600",
    bgClass: "bg-amber-50",
  },
  {
    title: "Rata-rata Waktu Respon",
    value: "—",
    change: "—",
    isPositive: true,
    icon: Clock,
    colorClass: "text-emerald-600",
    bgClass: "bg-emerald-50",
  },
  {
    title: "Akurasi Prediksi Harga",
    value: "—",
    change: "—",
    isPositive: true,
    icon: ChartCandlestick,
    colorClass: "text-blue-600",
    bgClass: "bg-blue-50",
  },
  {
    title: "Beban Server AI",
    value: "—",
    change: "—",
    isPositive: false,
    icon: Cpu,
    colorClass: "text-rose-600",
    bgClass: "bg-rose-50",
  },
];

const CHART_HEIGHTS = [40, 60, 45, 80, 55, 90, 75, 100, 65, 85, 50, 70];

export default function AIAnalyticsPage() {
  const [stats, setStats] = useState<StatItem[]>(DEFAULT_STATS);
  const [chartHeights, setChartHeights] = useState<number[]>(CHART_HEIGHTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch("/api/ai/analytics");
        if (res.ok) {
          const data = await res.json();
          // Merge API values (strings) into our local stat definitions
          if (Array.isArray(data.stats)) {
            setStats((prev) =>
              prev.map((s, i) => ({
                ...s,
                value: data.stats[i]?.value ?? s.value,
                change: data.stats[i]?.change ?? s.change,
                isPositive: data.stats[i]?.isPositive ?? s.isPositive,
              }))
            );
          }
          if (Array.isArray(data.chartHeights)) {
            setChartHeights(data.chartHeights);
          }
        }
      } catch {
        // silently fail — default placeholders remain
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  return (
    <div className="flex flex-col h-full max-w-7xl mx-auto p-6 md:p-10 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            AI Performance Analytics
          </h1>
          <p className="text-slate-500">
            Monitor metrik penggunaan, biaya token, dan performa model AI secara real-time.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700 text-sm font-medium">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          Sistem Optimal
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgClass}`}>
                  <Icon className={`w-4 h-4 ${stat.colorClass}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 mb-1">
                  {loading ? <span className="text-slate-300">—</span> : stat.value}
                </div>
                <p className={`text-xs font-medium flex items-center gap-1 ${
                  stat.isPositive ? "text-emerald-600" : "text-rose-600"
                }`}>
                  {stat.isPositive ? "↑" : "↓"} {stat.change} dari bulan lalu
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Token Usage Chart */}
        <Card className="lg:col-span-2 bg-white border border-slate-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Grafik Penggunaan Token
                </CardTitle>
                <p className="text-sm text-slate-500 mt-1">Estimasi biaya berdasarkan model (GPT-4o & Claude 3.5)</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-900">$142.50</div>
                <div className="text-xs text-slate-400">Total Biaya Bulan Ini</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-64 flex items-end justify-between gap-2 pt-4">
            {chartHeights.map((height: number, i: number) => (
              <div key={i} className="w-full flex flex-col items-center gap-2 group">
                <div className="w-full relative h-48 bg-slate-100 rounded-t-sm flex items-end overflow-hidden">
                  <div
                    className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm group-hover:opacity-100 opacity-80 transition-all"
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400">M{i + 1}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="bg-white border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-rose-500" />
              Kesehatan Sistem AI
            </CardTitle>
            <p className="text-sm text-slate-500 mt-1">Status modul core AI saat ini</p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" /> Latensi API
                </span>
                <span className="text-slate-900 font-semibold">124ms</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 w-[20%] rounded-full" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 flex items-center gap-2">
                  <Database className="w-4 h-4 text-cyan-500" /> Kapasitas Vector DB
                </span>
                <span className="text-slate-900 font-semibold">68%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 w-[68%] rounded-full" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-blue-500" /> Rate Limit Assistant
                </span>
                <span className="text-slate-900 font-semibold">85%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[85%] rounded-full" />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 animate-pulse shrink-0" />
                <p className="text-xs text-blue-700 leading-relaxed">
                  Traffic prediksi harga sedang tinggi. Sistem telah mengalokasikan 2 node tambahan untuk menjaga stabilitas.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
