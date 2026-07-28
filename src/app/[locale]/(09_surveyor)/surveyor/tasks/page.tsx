import { getTranslations } from 'next-intl/server';
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MapPin, Calendar, Upload, Clock, ShieldCheck, ShieldAlert, ChevronRight } from "lucide-react"
import { getSurveyTasks } from "@/actions/surveyor"
import Link from "next/link"
import { TableEmptyState } from "@/components/shared/TableEmptyState"

export const metadata = {
  title: "Daftar Penugasan Surveyor | HomeLink 2.0",
  description: "Kelola daftar penugasan properti surveyor",
}

const getStatusBadge = (status: string, t: any) => {
  switch (status) {
    case "PENDING":
      return (
        <Badge variant="secondary" className="flex items-center gap-1 w-fit bg-amber-100 text-amber-800 hover:bg-amber-100 border-none">
          <Clock className="w-3 h-3" /> {t("statusPending")}
        </Badge>
      )
    case "IN_PROGRESS":
      return (
        <Badge variant="default" className="bg-primary hover:bg-primary flex items-center gap-1 w-fit">
          <Clock className="w-3 h-3" /> {t("statusInProgress")}
        </Badge>
      )
    case "URGENT":
      return (
        <Badge variant="destructive" className="flex items-center gap-1 w-fit">
          <ShieldAlert className="w-3 h-3" /> {t("statusUrgent")}
        </Badge>
      )
    case "COMPLETED":
      return (
        <Badge variant="default" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none flex items-center gap-1 w-fit">
          <ShieldCheck className="w-3 h-3" /> {t("statusCompleted")}
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default async function SurveyorAssignmentsPage() {
  const t = await getTranslations('SurveyorDashboard.tasks');
  const assignments = await getSurveyTasks();
  
  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("desc")}</p>
      </div>

      <div className="flex gap-2 pb-2 overflow-x-auto hide-scrollbar">
        <Badge variant="default" className="whitespace-nowrap px-4 py-1.5 cursor-pointer">{t("allTasks")} ({assignments.length})</Badge>
        <Badge variant="secondary" className="whitespace-nowrap px-4 py-1.5 cursor-pointer hover:bg-slate-200">{t("statusPending")}</Badge>
        <Badge variant="secondary" className="whitespace-nowrap px-4 py-1.5 cursor-pointer hover:bg-slate-200">{t("statusCompleted")}</Badge>
      </div>

      <div className="flex flex-col gap-4">
        {assignments.length === 0 ? (
          <Card className="border-dashed border-2 bg-slate-50/50">
            <CardContent className="pt-6">
              <TableEmptyState
                title={t("noTasks")}
                description={t("noTasksDesc")}
              />
            </CardContent>
          </Card>
        ) : (
          assignments.map((assignment) => (
            <Card key={assignment.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow border-slate-200">
              <div className="p-4 flex flex-col gap-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusBadge(assignment.status, t)}
                      <span className="text-xs font-mono text-slate-400">#{assignment.id.substring(0, 6)}</span>
                    </div>
                    <h3 className="font-semibold text-base leading-tight text-slate-900">{assignment.property.title}</h3>
                    <p className="flex items-start text-sm text-slate-500">
                      <MapPin className="w-4 h-4 mr-1.5 mt-0.5 shrink-0 text-slate-400" />
                      <span className="line-clamp-2">{assignment.property.address}</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center text-xs font-medium text-slate-600">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                    {assignment.scheduledAt ? new Date(assignment.scheduledAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                    }) : t("notScheduled")}
                  </div>
                  
                  {assignment.status !== "COMPLETED" ? (
                    <Button asChild size="sm" className="h-9 px-4 rounded-full shadow-sm hover:scale-105 transition-transform">
                      <Link href={`/surveyor/tasks/${assignment.id}/form`} className="flex items-center">
                        <Upload className="w-3.5 h-3.5 mr-1.5" />
                        {t("startSurvey")}
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="secondary" size="sm" className="h-9 px-4 rounded-full" disabled>
                      <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                      {t("statusCompleted")}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
