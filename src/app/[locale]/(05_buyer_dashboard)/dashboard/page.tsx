import { getBuyerDashboard } from "@/actions/dashboard";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Calendar, FileCheck, MessageCircle, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-28 rounded-2xl" />)}
    </div>
  );
}

function ContentSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Skeleton className="h-64 rounded-2xl" />
      <Skeleton className="h-64 rounded-2xl" />
    </div>
  );
}

async function DashboardContent() {
  const data = await getBuyerDashboard();
  const t = await getTranslations("BuyerDashboard");
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">{t("dashboard.stats.savedProperties")}</CardTitle>
            <Heart className="h-5 w-5 " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{data.stats.totalSavedProperties}</div>
          </CardContent>
        </GlassCard>
        <GlassCard>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">{t("dashboard.stats.schedule")}</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{data.stats.totalBookings}</div>
          </CardContent>
        </GlassCard>
        <GlassCard>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">{t("dashboard.stats.activeOffers")}</CardTitle>
            <FileCheck className="h-5 w-5 " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{data.stats.totalLeads}</div>
          </CardContent>
        </GlassCard>
        <GlassCard>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">{t("dashboard.stats.unreadMessages")}</CardTitle>
            <MessageCircle className="h-5 w-5 " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{data.stats.totalSavedSearches}</div>
          </CardContent>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="h-full">
          <CardHeader>
            <CardTitle>{t("dashboard.activity.title")}</CardTitle>
            <CardDescription>{t("dashboard.activity.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {data.recentActivities.map((activity) => (
                <div key={activity.id} className="flex gap-4 items-start">
                  <div className="bg-blue-50 p-2 rounded-full mt-1">
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
            <div className="mt-6">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/notifications">{t("dashboard.activity.viewAll")}</Link>
              </Button>
            </div>
          </CardContent>
        </GlassCard>

        <Card className="h-full bg-gradient-to-br from-indigo-900 to-slate-800 text-white border-0">
          <CardHeader>
            <CardTitle className="text-indigo-50">{t("dashboard.profile.title")}</CardTitle>
            <CardDescription className="text-indigo-200">
              {t("dashboard.profile.subtitle")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2 text-indigo-100">
                <span>{t("dashboard.profile.completeness")}</span>
                <span>80%</span>
              </div>
              <div className="w-full bg-indigo-950/50 rounded-full h-2.5">
                <div className="bg-indigo-400 h-2.5 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <Button className="bg-white text-indigo-900 hover:bg-indigo-50" asChild>
              <Link href="/my-profile">{t("dashboard.profile.update")}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default async function BuyerDashboardPage() {
  const data = await getBuyerDashboard();
  const t = await getTranslations("BuyerDashboard");
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{t("dashboard.welcome")}, {data.profile.name}!</h1>
        <p className="text-gray-500 mt-2 text-lg">{t("dashboard.subtitle")}</p>
      </div>
      <Suspense fallback={<StatsSkeleton />}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}
