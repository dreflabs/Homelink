export const dynamic = 'force-dynamic';

import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { LayoutDashboard, Building, Calendar, FileCheck, Settings, ChartArea } from "lucide-react";
import { DashboardLayoutWrapper, SidebarLink } from "@/components/shared/DashboardLayoutWrapper";



import { getTranslations } from "next-intl/server";

export default async function OwnerDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = await getTranslations("OwnerDashboard.layout");
  const session = await auth();

  const ownerLinks: SidebarLink[] = [
    { href: "/owner/dashboard", label: t("links.overview"), icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/owner/properties", label: t("links.my_properties"), icon: <Building className="w-5 h-5" /> },
    { href: "/owner/property-status", label: t("links.status_performance"), icon: <ChartArea className="w-5 h-5" /> },
    { href: "/owner/schedule", label: t("links.schedule"), icon: <Calendar className="w-5 h-5" /> },
    { href: "/owner/documents", label: t("links.documents"), icon: <FileCheck className="w-5 h-5" /> },
    { href: "/owner/settings", label: t("links.settings"), icon: <Settings className="w-5 h-5" /> },
  ];

  if (!session?.user) {
    redirect("/login?callbackUrl=/owner/dashboard");
  }

  const role = (session.user as any)?.role;
  if (role !== "OWNER" && role !== "ADMIN" && role !== "SUPER_ADMIN") {
    redirect("/unauthorized");
  }

  const logoNode = (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg leading-none">H</span>
      </div>
      <span className="text-xl font-bold tracking-tight text-white">HomeLink</span>
    </div>
  );

  return (
    <DashboardLayoutWrapper 
      title={t("title")} 
      links={ownerLinks} 
      sidebarTheme="dark"
      logoutLabel="Sign Out"
      roleBadge="Portal Pemilik"
      logoNode={logoNode}
    >
      {children}
    </DashboardLayoutWrapper>
  );
}
