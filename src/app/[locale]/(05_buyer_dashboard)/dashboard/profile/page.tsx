import { getBuyerDashboard } from "@/actions/dashboard";
import { ProfileForm } from "@/components/dashboard/profile-form";
import { getTranslations } from "next-intl/server";

export default async function MyProfilePage() {
  const data = await getBuyerDashboard();
  const t = await getTranslations("BuyerDashboard.profilePage");
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{t("title")}</h1>
        <p className="text-gray-500 mt-2">{t("subtitle")}</p>
      </div>

      <ProfileForm initialData={data.profile} />
    </div>
  );
}
