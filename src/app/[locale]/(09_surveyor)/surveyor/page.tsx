import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, CheckCircle2, Clock, MapPin, AlertTriangle } from "lucide-react";
import { getSurveyorStats } from "@/actions/surveyor";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function SurveyorDashboard() {
  const t = await getTranslations("SurveyorDashboard.page");
  const stats = await getSurveyorStats();

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
      
      {/* GPS Permission Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3 shadow-sm">
        <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-amber-900">{t("locationRequired")}</h3>
          <p className="text-xs text-amber-700 mt-1">
            {t("locationDesc")}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {t("dashboardTitle")}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t("dashboardDesc")}
        </p>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
        <Card className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 shadow-sm col-span-2 md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {t("todayTasks")}
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-primary dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.todayTasks}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {t("todayTasksDesc")}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {t("completed")}
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.completed}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {t("completedDesc")}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {t("pending")}
            </CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.pending}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {t("pendingDesc")}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <h2 className="text-lg font-semibold">{t("startWorking")}</h2>
        <Card className="bg-white border-primary/20 shadow-md">
          <CardContent className="p-6 flex flex-col items-center text-center gap-4">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{t("readyToField")}</h3>
              <p className="text-sm text-gray-500 mt-1 max-w-sm">
                {t("readyToFieldDesc")}
              </p>
            </div>
            <Link href="/surveyor/tasks" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto mt-2">
                {t("viewTasks")}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
