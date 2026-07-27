import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getTranslations } from 'next-intl/server';

export default async function AnalyticsPage() {
  const t = await getTranslations("AdminDashboard.analytics");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">{t("total_users")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12,450</div>
            <p className="text-xs text-green-600 mt-1">+12% {t("from_last_month")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">{t("active_properties")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3,892</div>
            <p className="text-xs text-green-600 mt-1">+5% {t("from_last_month")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">{t("transactions")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">842</div>
            <p className="text-xs text-green-600 mt-1">+18% {t("from_last_month")}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("user_growth_chart")}</CardTitle>
          <CardDescription>{t("chart_desc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/50 text-muted-foreground">
            {t("chart_placeholder")}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
