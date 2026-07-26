import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, CalendarX } from "lucide-react";
import Link from "next/link";
import { getBuyerBookings } from "@/actions/dashboard";
import { getTranslations } from "next-intl/server";

export default async function SchedulePage() {
  const { data: schedules } = await getBuyerBookings();
  const t = await getTranslations("BuyerDashboard.schedulePage");

  if (schedules.length === 0) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{t("title")}</h1>
          <p className="text-gray-500 mt-2">{t("subtitle")}</p>
        </div>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 animate-in fade-in zoom-in duration-500">
          <div className="bg-primary/5 p-6 rounded-full mb-6">
            <CalendarX className="w-12 h-12 text-primary/40" />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight mb-2">
            {t("empty.title")}
          </h2>
          <p className="text-muted-foreground max-w-md mb-8">
            {t("empty.subtitle")}
          </p>
          <Link href="/search-result">
            <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-all">
              {t("empty.searchProperties")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{t("title")}</h1>
        <p className="text-gray-500 mt-2">{t("subtitle")}</p>
      </div>

      <div className="space-y-4">
        {schedules.map((schedule) => (
          <Card key={schedule.id} className="hover:shadow-md transition-shadow border-0 shadow-sm bg-white/50 backdrop-blur-xl">
            <CardContent className="p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold">{schedule.title}</h3>
                  <Badge variant={schedule.status === 'CONFIRMED' ? 'default' : schedule.status === 'PENDING' ? 'secondary' : 'destructive'}>
                    {schedule.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4"/> {new Date(schedule.surveyDate).toLocaleDateString("id-ID", { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                  <div className="flex items-center gap-1.5"><Clock className="w-5 h-5"/> {schedule.timeSlot}</div>
                  <div className="flex items-center gap-1.5"><MapPin className="w-5 h-5"/> {schedule.address}</div>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <Button variant="outline" className="flex-1 md:flex-none" disabled={schedule.status === 'CANCELLED' || schedule.status === 'REJECTED'}>{t("reschedule")}</Button>
                <Button variant="destructive" className="flex-1 md:flex-none" disabled={schedule.status === 'CANCELLED' || schedule.status === 'REJECTED'}>{t("cancel")}</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
