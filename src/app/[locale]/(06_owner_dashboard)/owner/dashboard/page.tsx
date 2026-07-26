import { getOwnerDashboard } from "@/actions/dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Eye, MessageCircle, ChartCandlestick, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function OwnerDashboardPage() {
  const data = await getOwnerDashboard();
  const t = await getTranslations("OwnerDashboard.dashboard");

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{t("hello")}, {data.profile.name}!</h1>
        <p className="text-gray-500 mt-2 text-lg">{t("summary")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/50 backdrop-blur-xl rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">{t("total_properties")}</CardTitle>
            <Building className="h-5 w-5 " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{data.stats.totalProperties}</div>
            <p className="text-xs text-gray-500 mt-1">{data.stats.activeListings} {t("active_listings")}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/50 backdrop-blur-xl rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">{t("total_views")}</CardTitle>
            <Eye className="h-5 w-5 " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{data.stats.totalViews}</div>
            <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
              <ChartCandlestick className="w-3 h-3" /> +12% {t("this_month")}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/50 backdrop-blur-xl rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">{t("inbox")}</CardTitle>
            <MessageCircle className="h-5 w-5 " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{data.stats.inquiries}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-full bg-white/50 backdrop-blur-xl rounded-2xl border border-white/20 shadow-sm">
          <CardHeader>
            <CardTitle>{t("recent_activity")}</CardTitle>
            <CardDescription>{t("recent_updates")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {data.recentActivities.map((activity) => (
                <div key={activity.id} className="flex gap-4 items-start">
                  <div className="bg-slate-100 p-2 rounded-full mt-1">
                    <Clock className="h-5 w-5 " />
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

        <Card className="h-full bg-white/50 backdrop-blur-xl rounded-2xl border border-white/20 shadow-sm">
          <CardHeader>
            <CardTitle>{t("monthly_performance")}</CardTitle>
            <CardDescription>{t("view_trends")}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center min-h-[250px] bg-slate-50 rounded-lg border border-slate-100">
            {/* Placeholder for chart */}
            <div className="text-slate-400 flex flex-col items-center gap-2">
              <ChartCandlestick className="w-8 h-8 opacity-50" />
              <p className="text-sm">{t("chart_placeholder")}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
