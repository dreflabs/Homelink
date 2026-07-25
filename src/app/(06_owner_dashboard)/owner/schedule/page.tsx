import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, User } from "lucide-react";

export default function OwnerSchedulePage() {
  const schedules = [
    { id: 1, buyer: "Budi Santoso", property: "Villa Indah Kasih", date: "28 Jul 2026", time: "10:00 WIB", status: "Menunggu Konfirmasi" },
    { id: 2, buyer: "Andi Wijaya", property: "Apartemen Senayan", date: "29 Jul 2026", time: "15:00 WIB", status: "Disetujui" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Jadwal Kunjungan</h1>
        <p className="text-gray-500 mt-2">Kelola permintaan kunjungan dari calon pembeli atau penyewa.</p>
      </div>

      <div className="space-y-4">
        {schedules.map((schedule) => (
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
                  <div className="flex items-center gap-1.5"><User className="w-4 h-4"/> {schedule.buyer}</div>
                  <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4"/> {schedule.date}</div>
                  <div className="flex items-center gap-1.5"><Clock className="w-4 h-4"/> {schedule.time}</div>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                {schedule.status === 'Menunggu Konfirmasi' ? (
                  <>
                    <Button className="flex-1 md:flex-none">Setujui</Button>
                    <Button variant="outline" className="flex-1 md:flex-none text-red-600 border-red-200 hover:bg-red-50">Tolak</Button>
                  </>
                ) : (
                  <Button variant="outline" className="flex-1 md:flex-none">Reschedule</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
