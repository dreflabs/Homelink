import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/card";
import { ChartCandlestick, UserRound, Wallet, ShieldCheck } from "lucide-react";
import { getAgentReportStats } from "@/actions/agent";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function AgentReportsPage() {
  const t = await getTranslations('PartnerAgent.Reports');
  const stats = await getAgentReportStats();

  const statCards = [
    { label: t('stats.totalLeads'), value: String(stats.totalLeads), icon: UserRound },
    { label: t('stats.propertiesSold'), value: String(stats.closedLeads), icon: ShieldCheck },
    { label: t('stats.totalCommission'), value: formatCurrency(stats.totalCommission), icon: Wallet },
    { label: t('stats.conversionRate'), value: `${stats.conversionRate}%`, icon: ChartCandlestick },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{t('title')}</h1>
        <p className="text-slate-500 mt-1 text-sm">{t('description')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="rounded-2xl shadow-sm border-slate-100 p-5">
              <div className="p-2.5 bg-slate-50 rounded-xl w-fit mb-3">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
            </Card>
          );
        })}
      </div>

      <Card className="rounded-2xl shadow-sm border-slate-100 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">{t('quarterSummary')}</h3>
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-sm text-slate-700">{t('summaryItems.leadsResponseRate')}</span>
            <span className="text-sm font-semibold text-slate-900">{stats.taskCompletionRate}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-slate-500" style={{ width: `${stats.taskCompletionRate}%` }} />
          </div>
        </div>
      </Card>
    </div>
  );
}
