import { SettingsForm } from "@/components/dashboard/SettingsForm";
import { getTranslations } from "next-intl/server";

export default async function SettingsPage() {
  const t = await getTranslations("BuyerDashboard.settingsPage");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{t("title")}</h1>
        <p className="text-gray-500 mt-2">{t("subtitle")}</p>
      </div>

      <SettingsForm />
    </div>
  );
}
