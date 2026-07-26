export const dynamic = 'force-dynamic';

import { getTranslations } from "next-intl/server";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from 'react';
import { DashboardLayoutWrapper } from "@/components/shared/DashboardLayoutWrapper";
import { 
  LayoutDashboard, 
  Building, 
  CheckSquare, 
  UserCheck, 
  UserRound, 
  HeadphonesIcon, 
  CircleDollarSign, 
  BarChart3, 
  Calendar, 
  FileCheck, 
  ShieldCheck 
} from 'lucide-react';

export default async function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("InternalAgent");

  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  const role = (session.user as any)?.role;
  if (role !== "INTERNAL_AGENT" && role !== "ADMIN" && role !== "SUPER_ADMIN") {
    redirect("/unauthorized");
  }

  return (
    <DashboardLayoutWrapper
      title="Internal Agent"
      sidebarTheme="light"
      links={[
        { href: "/internal", label: t("dashboard"), icon: <LayoutDashboard className="w-5 h-5" /> },
        { href: "/internal/properties", label: t("properties_menu"), icon: <Building className="w-5 h-5" /> },
        { href: "/internal/property-verification", label: t("property_verification_event"), icon: <CheckSquare className="w-5 h-5" /> },
        { href: "/internal/owner-verification", label: t("owner_verification_menu"), icon: <UserCheck className="w-5 h-5" /> },
        { href: "/internal/lead-management", label: t("lead_management_menu"), icon: <UserRound className="w-5 h-5" /> },
        { href: "/internal/customer-support", label: t("customer_support_title"), icon: <HeadphonesIcon className="w-5 h-5" /> },
        { href: "/internal/commission", label: t("commission"), icon: <CircleDollarSign className="w-5 h-5" /> },
        { href: "/internal/analytics", label: t("analytics_menu"), icon: <BarChart3 className="w-5 h-5" /> },
        { href: "/internal/calendar", label: t("calendar_menu"), icon: <Calendar className="w-5 h-5" /> },
        { href: "/internal/reports", label: t("reports_menu"), icon: <FileCheck className="w-5 h-5" /> },
        { href: "/internal/tasks", label: t("tugas"), icon: <ShieldCheck className="w-5 h-5" /> },
      ]}
    >
      {children}
    </DashboardLayoutWrapper>
  );
}
