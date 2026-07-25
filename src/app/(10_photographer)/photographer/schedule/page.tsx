import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, User, ChevronRight, Camera } from "lucide-react";
import { getPhotographerTasks } from "@/actions/photographer";

const statusMap = {
  CONFIRMED: { label: "Terkonfirmasi", className: "bg-emerald-100 text-emerald-700" },
  PENDING: { label: "Menunggu", className: "bg-amber-100 text-amber-700" },
  COMPLETED: { label: "Selesai", className: "bg-blue-100 text-blue-700" },
  CANCELLED: { label: "Dibatalkan", className: "bg-red-100 text-red-700" },
};

export default async function SchedulePage() {
  const tasks = await getPhotographerTasks();
  const confirmed = tasks.filter((s) => s.status === "CONFIRMED").length;
  const pending = tasks.filter((s) => s.status === "PENDING").length;

  return (
    <div className="min-h-screen bg-white p-6 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Jadwal Pemotretan</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Daftar jadwal pemotretan properti yang ditugaskan kepada Anda.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Jadwal", value: tasks.length, color: "text-indigo-600", bg: "bg-indigo-50", icon: Calendar },
          { label: "Terkonfirmasi", value: confirmed, color: "text-emerald-600", bg: "bg-emerald-50", icon: Camera },
          { label: "Menunggu", value: pending, color: "text-amber-600", bg: "bg-amber-50", icon: Clock },
        ].map((s) => (
          <Card key={s.label} className="rounded-2xl border-slate-100 shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.bg}`}>
                <s.icon className={`w-6 h-6 ${s.color}`} strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{s.value}</div>
                <div className="text-sm text-slate-500">{s.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Calendar View - Simple List */}
      <Card className="rounded-2xl border-slate-100 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold text-slate-900">Agenda Mendatang</CardTitle>
          <Badge variant="secondary" className="rounded-full bg-indigo-100 text-indigo-700 px-3">
            Bulan Ini
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          {tasks.map((schedule) => {
            const status = statusMap[schedule.status as keyof typeof statusMap] || { label: schedule.status, className: "bg-slate-100 text-slate-700" };
            return (
              <div
                key={schedule.id}
                className="flex gap-4 p-5 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-slate-50/50 transition-all group"
              >
                {/* Date Column */}
                <div className="w-24 flex-shrink-0 flex flex-col items-center justify-start pt-1">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex flex-col items-center justify-center">
                    <Calendar className="w-5 h-5 text-indigo-500 mb-0.5" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-slate-400">{schedule.id.substring(0, 8)}</span>
                        <Badge variant="secondary" className={`rounded-full text-xs px-2.5 ${status.className}`}>
                          {status.label}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">{schedule.property.title}</h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mt-3">
                    <div className="flex items-center text-sm text-slate-600 gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                      <span>{schedule.scheduledAt ? new Date(schedule.scheduledAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        }) : 'Belum Dijadwalkan'}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600 gap-2">
                      <Clock className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                      <span>{schedule.scheduledAt ? new Date(schedule.scheduledAt).toLocaleTimeString('id-ID', {
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : '-'}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600 gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                      <span className="truncate">{schedule.property.address}</span>
                    </div>
                  </div>

                  {schedule.notes && (
                    <div className="mt-3 p-3 bg-amber-50 border border-amber-100 rounded-lg text-sm text-amber-800">
                      <strong>Catatan:</strong> {schedule.notes}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          {tasks.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Tidak ada jadwal pemotretan.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
