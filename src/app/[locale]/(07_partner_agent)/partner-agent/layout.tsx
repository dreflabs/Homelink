export const dynamic = 'force-dynamic';
import { getTranslations } from "next-intl/server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import {
  LayoutDashboard,
  UserRound,
  Wallet,
  CalendarDays,
  ListChecks,
  FileCheck,
  BarChart3,
  UserCircle,
  Settings,
  Target,
} from "lucide-react";
import { DashboardLayoutWrapper, SidebarLink } from "@/components/shared/DashboardLayoutWrapper";

export default async function PartnerAgentLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  const role = (session.user as any)?.role;
  if (role !== "PARTNER_AGENT" && role !== "ADMIN" && role !== "SUPER_ADMIN") {
    redirect("/unauthorized");
  }

  const t = await getTranslations('PartnerAgent.Layout');

  const agentLinks: SidebarLink[] = [
    { href: "/partner-agent", label: t('dashboard'), icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/partner-agent/clients", label: t('clients'), icon: <UserRound className="w-5 h-5" /> },
    { href: "/partner-agent/leads", label: t('leads'), icon: <Target className="w-5 h-5" /> },
    { href: "/partner-agent/commission", label: t('commission'), icon: <Wallet className="w-5 h-5" /> },
    { href: "/partner-agent/calendar", label: t('calendar'), icon: <CalendarDays className="w-5 h-5" /> },
    { href: "/partner-agent/tasks", label: t('tasks'), icon: <ListChecks className="w-5 h-5" /> },
    { href: "/partner-agent/documents", label: t('documents'), icon: <FileCheck className="w-5 h-5" /> },
    { href: "/partner-agent/reports", label: t('reports'), icon: <BarChart3 className="w-5 h-5" /> },
    { href: "/partner-agent/profile", label: t('profile'), icon: <UserCircle className="w-5 h-5" /> },
    { href: "/partner-agent/settings", label: t('settings'), icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <DashboardLayoutWrapper title={t('partnerPortal')} links={agentLinks} sidebarTheme="light">
      {children}
    </DashboardLayoutWrapper>
  );
}
