"use client";

import { useState, useTransition } from "react";
import { updateBookingStatus } from "@/actions/dashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, UserRound, ShieldCheck, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export function ScheduleClient({ initialSchedules }: { initialSchedules: any[] }) {
  const t = useTranslations("OwnerDashboard.schedule");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [schedules, setSchedules] = useState(initialSchedules);

  const handleUpdateStatus = (id: string, status: string) => {
    startTransition(async () => {
      try {
        await updateBookingStatus(id, status);
        setSchedules(prev => prev.map(s => s.id === id ? { ...s, status: status === "CONFIRMED" ? "Disetujui" : "Ditolak" } : s));
        router.refresh();
      } catch (err) {
        alert(t("fail_update"));
      }
    });
  };

  return (
    <div className="space-y-4">
      {schedules.length > 0 ? (
        schedules.map((schedule) => (
          <Card key={schedule.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold">{schedule.property}</h3>
                  <Badge variant={schedule.status === 'Disetujui' ? 'default' : 'outline'} className={schedule.status === 'Menunggu Konfirmasi' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}>
                    {schedule.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5"><UserRound className="w-5 h-5"/> {schedule.buyer}</div>
                  <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4"/> {schedule.date}</div>
                  <div className="flex items-center gap-1.5"><Clock className="w-5 h-5"/> {schedule.time}</div>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                {schedule.status === 'Menunggu Konfirmasi' ? (
                  <>
                    <Button 
                      onClick={() => handleUpdateStatus(schedule.id, "CONFIRMED")} 
                      disabled={isPending} 
                      className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <ShieldCheck className="mr-1.5 h-5 w-5" />
                      {t("approve")}
                    </Button>
                    <Button 
                      onClick={() => handleUpdateStatus(schedule.id, "CANCELLED")} 
                      disabled={isPending} 
                      variant="outline" 
                      className="flex-1 md:flex-none text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <XCircle className="mr-1.5 h-4 w-4" />
                      {t("reject")}
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" disabled className="flex-1 md:flex-none">
                    {t("status_done")}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-gray-900">{t("no_schedule")}</h3>
          <p className="text-sm text-gray-500 mt-1">{t("no_schedule_desc")}</p>
        </div>
      )}
    </div>
  );
}
