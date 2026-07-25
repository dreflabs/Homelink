import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, User, ChevronRight, Camera } from "lucide-react";

const mockSchedules = [
  {
    id: "SCH-001",
    property: "Vila Indah Kemang",
    address: "Jl. Kemang Raya No 12, Jakarta Selatan",
    ownerName: "Budi Santoso",
    ownerPhone: "0812-3456-7890",
    date: "Jumat, 25 Jul 2026",
    time: "10:00 - 14:00 WIB",
    status: "CONFIRMED",
    type: "Foto + Video",
    notes: "Fokus pada ruang tamu, dapur, dan taman belakang.",
  },
  {
    id: "SCH-002",
    property: "Apartemen Sudirman Suites",
    address: "Jl. Jend. Sudirman Kav 36, Lantai 12, Jakarta Pusat",
    ownerName: "Siti Rahayu",
    ownerPhone: "0821-9876-5432",
    date: "Sabtu, 26 Jul 2026",
    time: "14:00 - 17:00 WIB",
    status: "PENDING",
    type: "Foto",
    notes: "Properti sudah dibersihkan. Hubungi owner 1 jam sebelumnya.",
  },
  {
    id: "SCH-003",
    property: "Rumah Modern Bintaro",
    address: "Bintaro Sektor 7, Tangerang Selatan",
    ownerName: "Andi Wijaya",
    ownerPhone: "0815-5555-1234",
    date: "Senin, 28 Jul 2026",
    time: "09:00 - 12:00 WIB",
    status: "CONFIRMED",
    type: "Foto + Video + Drone",
    notes: "Drone sudah diizinkan. Bawa DJI Mini 3 Pro.",
  },
  {
    id: "SCH-004",
    property: "Villa Mediterania Cengkareng",
    address: "Jl. Mediterania Raya No 5, Jakarta Barat",
    ownerName: "Dewi Putri",
    ownerPhone: "0856-7777-8888",
    date: "Rabu, 30 Jul 2026",
    time: "08:00 - 11:00 WIB",
    status: "PENDING",
    type: "Foto",
    notes: "",
  },
];

const statusMap = {
  CONFIRMED: { label: "Terkonfirmasi", className: "bg-emerald-100 text-emerald-700" },
  PENDING: { label: "Menunggu", className: "bg-amber-100 text-amber-700" },
  CANCELLED: { label: "Dibatalkan", className: "bg-red-100 text-red-700" },
};

export default function SchedulePage() {
  const confirmed = mockSchedules.filter((s) => s.status === "CONFIRMED").length;
  const pending = mockSchedules.filter((s) => s.status === "PENDING").length;

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
          { label: "Total Jadwal", value: mockSchedules.length, color: "text-indigo-600", bg: "bg-indigo-50", icon: Calendar },
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
            Juli 2026
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockSchedules.map((schedule) => {
            const status = statusMap[schedule.status as keyof typeof statusMap];
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
                        <span className="text-xs font-mono text-slate-400">{schedule.id}</span>
                        <Badge variant="secondary" className={`rounded-full text-xs px-2.5 ${status.className}`}>
                          {status.label}
                        </Badge>
                        <Badge variant="secondary" className="rounded-full text-xs px-2.5 bg-slate-100 text-slate-600">
                          {schedule.type}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">{schedule.property}</h3>
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
                      <span>{schedule.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600 gap-2">
                      <Clock className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                      <span>{schedule.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600 gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                      <span className="truncate">{schedule.address}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600 gap-2">
                      <User className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                      <span>{schedule.ownerName} · {schedule.ownerPhone}</span>
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
        </CardContent>
      </Card>
    </div>
  );
}
