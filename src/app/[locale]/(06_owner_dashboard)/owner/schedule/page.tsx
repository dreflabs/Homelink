import { getOwnerSchedules } from "@/actions/dashboard";
import { ScheduleClient } from "./ScheduleClient";
import { getTranslations } from "next-intl/server";

export default async function OwnerSchedulePage() {
  let schedules: any[] = [];
  try {
    const res = await getOwnerSchedules();
    schedules = res.data;
  } catch (err: any) {
    console.error("Failed to load schedules:", err);
  }

  const t = await getTranslations("OwnerDashboard.schedule");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{t("title")}</h1>
        <p className="text-gray-500 mt-2">{t("desc")}</p>
      </div>

      <ScheduleClient initialSchedules={schedules} />
    </div>
  );
}
