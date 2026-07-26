import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Clock, UserRound } from "lucide-react";

import { getTranslations } from "next-intl/server";

export default async function AgentCalendarPage() {
  const t = await getTranslations('PartnerAgent');
  const agendas = [
    {
      id: 1,
      date: "Senin, 28 Jul 2026",
      time: "09:00 – 10:00 WIB",
      title: "Property Showing – Villa Indah Kemang",
      client: "Budi Santoso",
      location: "Jl. Kemang Raya No. 12, Jakarta Selatan",
      type: "Showing",
      typeColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      id: 2,
      date: "Senin, 28 Jul 2026",
      time: "13:30 – 14:30 WIB",
      title: "Follow-up Dokumen KPR",
      client: "Siti Rahma",
      location: "Kantor BCA KPR – Sudirman",
      type: "Meeting",
      typeColor: "bg-violet-50 text-violet-700 border-violet-200",
    },
    {
      id: 3,
      date: "Selasa, 29 Jul 2026",
      time: "10:00 – 11:30 WIB",
      title: "Negosiasi Harga – Pondok Indah Mansion",
      client: "Kevin Wijaya",
      location: "Virtual – Google Meet",
      type: "Negosiasi",
      typeColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      id: 4,
      date: "Rabu, 30 Jul 2026",
      time: "08:00 – 09:00 WIB",
      title: "Rapat Internal Tim Agen",
      client: "Tim HomeLink",
      location: "HQ HomeLink – Lantai 5",
      type: "Internal",
      typeColor: "bg-slate-100 text-slate-600 border-slate-200",
    },
    {
      id: 5,
      date: "Kamis, 31 Jul 2026",
      time: "15:00 – 16:00 WIB",
      title: "Penandatanganan AJB – Pakubuwono Signature",
      client: "Dewi Kusuma",
      location: "Notaris Hendra & Partners, SCBD",
      type: "Closing",
      typeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
  ];
  
  const weekDays = [t('Calendar.sen'), t('Calendar.sel'), t('Calendar.rab'), t('Calendar.kam'), t('Calendar.jum'), t('Calendar.sab'), t('Calendar.min')];
  const calDates = Array.from({ length: 31 }, (_, i) => i + 1);

  const todayDate = 28;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{t('Calendar.title')}</h1>
        <p className="text-slate-500 mt-1 text-sm">
          {t('Calendar.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mini Calendar */}
        <Card className="rounded-2xl shadow-sm border-slate-100 p-5 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">{t('Calendar.july2026')}</h3>
            <CalendarDays className="w-4 h-4 text-slate-400" />
          </div>

          <div className="grid grid-cols-7 text-center mb-2">
            {weekDays.map((d) => (
              <div key={d} className="text-[10px] font-semibold text-slate-400 py-1">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 text-center gap-y-1">
            {/* Offset for July 2026 starting on Wednesday */}
            {[1, 2].map((i) => (
              <div key={`e-${i}`} />
            ))}
            {calDates.map((d) => {
              const hasEvent = agendas.some((a) => a.date.startsWith("Sel") ? d === 29 : a.date.startsWith("Rab") ? d === 30 : a.date.startsWith("Kam") ? d === 31 : a.date.startsWith("Sen") ? d === 28 : false);
              const isToday = d === todayDate;
              return (
                <button
                  key={d}
                  className={`w-7 h-7 mx-auto rounded-full text-xs font-medium flex items-center justify-center transition-colors
                    ${isToday ? "bg-blue-600 text-white shadow-sm" : "text-slate-700 hover:bg-slate-100"}
                    ${hasEvent && !isToday ? "font-semibold text-blue-600" : ""}`}
                >
                  {d}
                  {hasEvent && !isToday && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
              {t('Calendar.agendaType')}
            </p>
            {[
              { label: "Showing", color: "bg-blue-500" },
              { label: "Meeting", color: "bg-violet-500" },
              { label: "Negosiasi", color: "bg-amber-500" },
              { label: "Closing", color: "bg-emerald-500" },
              { label: "Internal", color: "bg-slate-400" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 py-1">
                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                <span className="text-xs text-slate-600">{item.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Agenda List */}
        <div className="lg:col-span-2 space-y-3">
          {agendas.map((agenda) => (
            <Card
              key={agenda.id}
              className="rounded-2xl shadow-sm border-slate-100 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className={`text-xs ${agenda.typeColor}`}>
                      {agenda.type}
                    </Badge>
                    <span className="text-xs text-slate-400">{agenda.date}</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm leading-snug">
                    {agenda.title}
                  </h3>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      {agenda.time}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      {agenda.location}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <UserRound className="w-3.5 h-3.5 shrink-0" />
                      {agenda.client}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
