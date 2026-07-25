import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";

export default function SchedulePage() {
  const schedules = [
    { id: 1, property: "Villa Indah Kasih", date: "28 Jul 2026", time: "10:00 WIB", status: "Disetujui", location: "Jl. Dago, Bandung" },
    { id: 2, property: "Apartemen Senayan", date: "30 Jul 2026", time: "14:00 WIB", status: "Menunggu", location: "Senayan, Jakarta" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Jadwal Kunjungan</h1>
        <p className="text-gray-500 mt-2">Kelola jadwal kunjungan properti Anda.</p>
      </div>

      <div className="space-y-4">
        {schedules.map((schedule) => (
          <Card key={schedule.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold">{schedule.property}</h3>
                  <Badge variant={schedule.status === 'Disetujui' ? 'default' : 'secondary'}>
                    {schedule.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4"/> {schedule.date}</div>
                  <div className="flex items-center gap-1.5"><Clock className="w-4 h-4"/> {schedule.time}</div>
                  <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4"/> {schedule.location}</div>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <Button variant="outline" className="flex-1 md:flex-none">Reschedule</Button>
                <Button variant="destructive" className="flex-1 md:flex-none">Batalkan</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
