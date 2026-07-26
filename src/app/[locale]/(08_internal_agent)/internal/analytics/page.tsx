import { getTranslations } from "next-intl/server";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, ChartCandlestick, PieChart, Activity, Download } from 'lucide-react';

export default async function AnalyticsPage() {
  const t = await getTranslations("InternalAgent");
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t("analytics_dashboard")}</h1>
          <p className="text-gray-500">{t("analytics_dashboard_desc")}</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Download className="w-4 h-4 mr-2" />
          {t("export_data")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Active {t("user")}s</p>
                <h3 className="text-2xl font-bold mt-1">24.5k</h3>
                <p className="text-xs text-green-600 mt-1">+12% {t("from_last_month")}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{t("total_listings")}</p>
                <h3 className="text-2xl font-bold mt-1">8,234</h3>
                <p className="text-xs text-green-600 mt-1">+5% {t("from_last_month")}</p>
              </div>
              <div className="p-2 bg-indigo-50 rounded-lg">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{t("conversion_rate")}</p>
                <h3 className="text-2xl font-bold mt-1">3.8%</h3>
                <p className="text-xs text-red-600 mt-1">-0.2% {t("from_last_month")}</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <ChartCandlestick className="w-5 h-5 " />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{t("revenue")}</p>
                <h3 className="text-2xl font-bold mt-1">Rp 4.2B</h3>
                <p className="text-xs text-green-600 mt-1">+18% {t("from_last_month")}</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <PieChart className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="h-96">
          <CardHeader>
            <CardTitle>{t("user")} Growth</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-full pb-16">
            <div className="text-center text-gray-400 flex flex-col items-center">
              <ChartCandlestick className="w-12 h-12 mb-2 " />
              <p>Chart Placeholder ({t("user")} Growth)</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="h-96">
          <CardHeader>
            <CardTitle>{t("revenue")} by {t("category")}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-full pb-16">
            <div className="text-center text-gray-400 flex flex-col items-center">
              <PieChart className="w-12 h-12 mb-2 text-gray-300" />
              <p>Chart Placeholder ({t("revenue")} Breakdown)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
