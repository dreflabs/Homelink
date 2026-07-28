import { getTranslations } from "next-intl/server";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, UserRound } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { getUpcomingTasks } from "@/actions/internal";

export default async function CalendarPage() {
  const t = await getTranslations("InternalAgent");
  const upcomingTasks = await getUpcomingTasks();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t("schedule_calendar")}</h1>
          <p className="text-gray-500">{t("schedule_calendar_desc")}</p>
        </div>
        <Button className="bg-primary hover:bg-primary text-white">
          <CalendarIcon className="w-4 h-4 mr-2" />
          {t("add_event")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-4">
                <CardTitle className="text-lg">
                  {new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" }).format(new Date())}
                </CardTitle>
                <div className="flex gap-1">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8">{t("today")}</Button>
                <div className="border-l mx-1"></div>
                <Button variant="ghost" size="sm" className="h-8 bg-gray-100">{t("month")}</Button>
                <Button variant="ghost" size="sm" className="h-8">{t("week")}</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] border rounded-lg flex items-center justify-center bg-gray-50 text-gray-400 flex-col">
                <CalendarIcon className="h-16 w-16 mb-4 text-gray-300" />
                <p>{t("full_calendar_ui")}</p>
                <p className="text-sm mt-2 max-w-sm text-center">{t("full_calendar_desc")}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t("upcoming_today")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingTasks.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">Tidak ada agenda mendatang.</p>
              ) : (
                upcomingTasks.map((task) => (
                  <div key={task.id} className="flex gap-4 p-3 border rounded-lg hover:border-blue-300 transition-colors">
                    <div className="flex flex-col items-center justify-center w-12 text-primary">
                      <span className="text-sm font-semibold">
                        {task.dueDate ? new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "short" }).format(new Date(task.dueDate)) : "-"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {task.dueDate ? new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit" }).format(new Date(task.dueDate)) : ""}
                      </span>
                    </div>
                    <div className="flex-1 border-l pl-4">
                      <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <UserRound className="w-3 h-3" />
                        <span>{task.assignee?.name ?? "-"}</span>
                      </div>
                      <div className="mt-2 flex gap-1">
                        <Badge variant="outline" className="text-[10px] h-5 bg-slate-50 text-primary">{task.type}</Badge>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
