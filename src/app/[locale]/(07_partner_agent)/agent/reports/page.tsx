import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/card";
import {
  ChartCandlestick,
  UserRound,
  Wallet,
  Building,
  ShieldCheck,
  Star,
  BarChart3,
} from "lucide-react";

export default async function AgentReportsPage() {
  const t = await getTranslations('PartnerAgent.Reports');

  const stats = [
    { label: t('stats.totalLeads'), value: "48", change: "+12%", positive: true, icon: UserRound },
    { label: t('stats.propertiesSold'), value: "9", change: t('stats.propertiesSoldChange'), positive: true, icon: Building },
    { label: t('stats.totalCommission'), value: "Rp 780M", change: "+18%", positive: true, icon: Wallet },
    { label: t('stats.conversionRate'), value: "18.75%", change: "+2.3%", positive: true, icon: ChartCandlestick },
    { label: t('stats.clientRating'), value: "4.8 / 5", change: t('stats.clientRatingChange'), positive: true, icon: Star },
    { label: t('stats.tasksCompleted'), value: "94%", change: t('stats.tasksCompletedChange'), positive: true, icon: ShieldCheck },
  ];

  const monthlyData = [
    { month: t('months.jan'), leads: 6, sales: 1 },
    { month: t('months.feb'), leads: 8, sales: 1 },
    { month: t('months.mar'), leads: 5, sales: 0 },
    { month: t('months.apr'), leads: 10, sales: 2 },
    { month: t('months.may'), leads: 7, sales: 2 },
    { month: t('months.jun'), leads: 12, sales: 3 },
  ];

  const maxLeads = Math.max(...monthlyData.map((d) => d.leads));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{t('title')}</h1>
        <p className="text-slate-500 mt-1 text-sm">
          {t('description')}
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
              <h3 className="font-semibold text-slate-900">{t('leadsPerMonth')}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{t('janJun2026')}</p>
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
              <h3 className="font-semibold text-slate-900">{t('salesPerMonth')}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{t('janJun2026')}</p>
            </div>
            <ChartCandlestick className="w-5 h-5 " />
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
        <h3 className="font-semibold text-slate-900 mb-4">{t('quarterSummary')}</h3>
        <div className="space-y-3">
          {[
            { label: t('summaryItems.q2Target'), progress: 90, color: "bg-blue-500" },
            { label: t('summaryItems.clientSatisfaction'), progress: 96, color: "bg-emerald-500" },
            { label: t('summaryItems.leadsResponseRate'), progress: 78, color: "bg-amber-500" },
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
