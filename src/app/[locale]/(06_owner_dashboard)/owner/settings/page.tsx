import { getUserProfile } from "@/actions/dashboard";
import { SettingsClient } from "./SettingsClient";

export default async function OwnerSettingsPage() {
  let profile = null;
  try {
    profile = await getUserProfile();
  } catch (err) {
    console.error("Failed to load owner profile:", err);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Pengaturan</h1>
        <p className="text-gray-500 mt-2">Kelola profil bisnis dan preferensi notifikasi Anda.</p>
      </div>

      <SettingsClient profile={profile} />
    </div>
  );
}
