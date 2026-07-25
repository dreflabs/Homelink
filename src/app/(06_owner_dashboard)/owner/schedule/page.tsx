import { getOwnerSchedules } from "@/actions/dashboard";
import { ScheduleClient } from "./ScheduleClient";

export default async function OwnerSchedulePage() {
  let schedules: any[] = [];
  try {
    schedules = await getOwnerSchedules();
  } catch (err) {
    console.error("Failed to load schedules:", err);
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Jadwal Kunjungan</h1>
        <p className="text-gray-500 mt-2">Kelola permintaan kunjungan dari calon pembeli atau penyewa.</p>
      </div>

      <ScheduleClient initialSchedules={schedules} />
    </div>
  );
}
