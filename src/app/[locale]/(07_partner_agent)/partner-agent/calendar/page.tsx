import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CalendarDays } from "lucide-react";

import { getTranslations } from "next-intl/server";
import { getAgentCalendarEvents } from "@/actions/agent";

export default async function AgentCalendarPage() {
  const t = await getTranslations('PartnerAgent');
  const events = await getAgentCalendarEvents();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{t('Calendar.title')}</h1>
        <p className="text-slate-500 mt-1 text-sm">{t('Calendar.subtitle')}</p>
      </div>

      {events.length === 0 ? (
        <Card className="rounded-2xl shadow-sm border-slate-100 p-8 min-h-96 flex flex-col items-center justify-center gap-3">
          <CalendarDays className="w-10 h-10 text-slate-300" />
          <p className="text-slate-500">Tidak ada jadwal mendatang.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <Card key={event.id} className="rounded-2xl shadow-sm border-slate-100 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs bg-slate-50 text-primary border-slate-200">
                  {event.type}
                </Badge>
                {event.dueDate && (
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {new Intl.DateTimeFormat("id-ID", { dateStyle: "full", timeStyle: "short" }).format(new Date(event.dueDate))}
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-slate-900 text-sm leading-snug">{event.title}</h3>
              {event.description && (
                <p className="text-xs text-slate-500 mt-1">{event.description}</p>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
