import { getTranslations } from "next-intl/server";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCheck, Download, Filter, Calendar, FileSpreadsheet, FileBarChart } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const availableReports = [
  {
    id: "REP-01",
    title: "Monthly Revenue Report",
    description: "Detailed breakdown of all revenue sources, commissions, and fees.",
    type: "Financial",
    frequency: "Monthly",
    format: "PDF, Excel",
    icon: FileBarChart,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    id: "REP-02",
    title: "Property Acquisition Report",
    description: "Metrics on new properties added, verified, and rejected.",
    type: "Operations",
    frequency: "Weekly",
    format: "PDF",
    icon: FileCheck,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    id: "REP-03",
    title: "Agent Performance",
    description: "Transaction volumes and lead conversion rates by agent.",
    type: "Performance",
    frequency: "Monthly",
    format: "Excel",
    icon: FileSpreadsheet,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    id: "REP-04",
    title: "Customer Support SLA",
    description: "Ticket resolution times, volume, and satisfaction scores.",
    type: "Support",
    frequency: "Weekly",
    format: "PDF",
    icon: FileCheck,
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  }
];

export default async function ReportsPage() {
  const t = await getTranslations("InternalAgent");
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t("reports")}</h1>
          <p className="text-gray-500">{t("reports_desc")}</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <FileCheck className="w-5 h-5 mr-2" />
          {t("custom_report")}
        </Button>
      </div>

      <Card>
        <CardContent className="p-4 flex gap-4 items-center border-b bg-gray-50/50">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            <span className="font-medium">{t("filters")}</span>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-white cursor-pointer hover:bg-gray-50">All {t("type")}s</Badge>
            <Badge variant="outline" className="bg-white cursor-pointer hover:bg-gray-50">{t("financial")}</Badge>
            <Badge variant="outline" className="bg-white cursor-pointer hover:bg-gray-50">{t("operations")}</Badge>
            <Badge variant="outline" className="bg-white cursor-pointer hover:bg-gray-50">{t("performance")}</Badge>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8">
              <Calendar className="w-4 h-4 mr-2" />
              {t("this_month")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableReports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${report.bgColor}`}>
                  <report.icon className={`w-6 h-6 ${report.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900">{report.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {report.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 mb-4">
                    {report.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-500 flex gap-4">
                      <span>{t("freq")}<span className="font-medium text-gray-700">{report.frequency}</span></span>
                      <span>{t("format")}<span className="font-medium text-gray-700">{report.format}</span></span>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 text-blue-600 border-blue-200 hover:bg-blue-50">
                      <Download className="w-3.5 h-3.5 mr-1.5" />
                      {t("generate")}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("recent_downloads")}</CardTitle>
          <CardDescription>{t("recent_downloads_desc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileCheck className="w-5 h-5 " />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Weekly Ops Summary - W{40-i}</p>
                    <p className="text-xs text-gray-500">Generated Oct {25-i}, 2023</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-600">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
