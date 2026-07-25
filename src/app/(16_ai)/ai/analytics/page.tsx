"use client";

import { Activity, Coins, Cpu, Clock, Zap, TrendingUp, BarChart3, Database, Bot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AIAnalyticsPage() {
  const stats = [
    {
      title: "Total Token Digunakan",
      value: "842,509",
      change: "+12.5%",
      isPositive: true,
      icon: Coins,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      border: "border-amber-400/20"
    },
    {
      title: "Rata-rata Waktu Respon",
      value: "1.2s",
      change: "-0.3s",
      isPositive: true,
      icon: Clock,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/20"
    },
    {
      title: "Akurasi Prediksi Harga",
      value: "94.8%",
      change: "+2.1%",
      isPositive: true,
      icon: TrendingUp,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20"
    },
    {
      title: "Beban Server AI",
      value: "42%",
      change: "+5%",
      isPositive: false,
      icon: Cpu,
      color: "text-rose-400",
      bg: "bg-rose-400/10",
      border: "border-rose-400/20"
    }
  ];

  return (
    <div className="flex flex-col h-full max-w-7xl mx-auto p-4 md:p-8 overflow-y-auto relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent inline-block mb-2">
            AI Performance Analytics
          </h1>
          <p className="text-zinc-400">
            Monitor metrik penggunaan, biaya token, dan performa model AI secara real-time.
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          Sistem Optimal
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <Card key={idx} className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 shadow-xl overflow-hidden group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg} ${stat.border} border`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1 group-hover:scale-105 transition-transform origin-left">
                {stat.value}
              </div>
              <p className={`text-xs font-medium flex items-center gap-1 ${
                stat.isPositive ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {stat.isPositive ? '↑' : '↓'} {stat.change} dari bulan lalu
              </p>
            </CardContent>
            {/* Hover glow effect */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${stat.isPositive ? 'from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:via-emerald-500/10 group-hover:to-emerald-500/5' : 'from-rose-500/0 via-rose-500/0 to-rose-500/0 group-hover:from-rose-500/5 group-hover:via-rose-500/10 group-hover:to-rose-500/5'} blur-lg transition-all duration-500`} />
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Token Usage Chart (Mock) */}
        <Card className="lg:col-span-2 bg-zinc-900/50 backdrop-blur-sm border-zinc-800 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-400" />
                  Grafik Penggunaan Token
                </CardTitle>
                <p className="text-sm text-zinc-400 mt-1">Estimasi biaya berdasarkan model (GPT-4o & Claude 3.5)</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">$142.50</div>
                <div className="text-xs text-zinc-500">Total Biaya Bulan Ini</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-64 flex items-end justify-between gap-2 pt-4">
            {/* Mock Bars */}
            {[40, 60, 45, 80, 55, 90, 75, 100, 65, 85, 50, 70].map((height, i) => (
              <div key={i} className="w-full flex flex-col items-center gap-2 group">
                <div className="w-full relative h-48 bg-zinc-800/30 rounded-t-sm flex items-end overflow-hidden">
                  <div 
                    className="w-full bg-gradient-to-t from-indigo-600/80 to-cyan-400/80 rounded-t-sm group-hover:opacity-100 opacity-70 transition-all relative"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20"></div>
                  </div>
                </div>
                <span className="text-[10px] text-zinc-500">M{i+1}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-rose-400" />
              Kesehatan Sistem AI
            </CardTitle>
            <p className="text-sm text-zinc-400 mt-1">Status modul core AI saat ini</p>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-300 flex items-center gap-2"><Zap className="w-4 h-4 text-amber-400"/> Latensi API</span>
                <span className="text-white font-medium">124ms</span>
              </div>
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 w-[20%] rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-300 flex items-center gap-2"><Database className="w-4 h-4 text-cyan-400"/> Kapasitas Vector DB</span>
                <span className="text-white font-medium">68%</span>
              </div>
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 w-[68%] rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-300 flex items-center gap-2"><Bot className="w-4 h-4 text-indigo-400"/> Rate Limit Assistant</span>
                <span className="text-white font-medium">85%</span>
              </div>
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[85%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-zinc-800">
              <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 animate-pulse shrink-0"></div>
                <p className="text-xs text-indigo-200 leading-relaxed">
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
