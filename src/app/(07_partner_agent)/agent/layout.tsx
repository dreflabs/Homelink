import { ReactNode } from "react";
import {
  LayoutDashboard,
  Users,
  Wallet,
  CalendarDays,
  ListChecks,
  FileText,
  BarChart3,
  UserCircle,
  Settings,
  Target,
} from "lucide-react";
import { DashboardLayoutWrapper, SidebarLink } from "@/components/shared/DashboardLayoutWrapper";

const agentLinks: SidebarLink[] = [
  { href: "/agent", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { href: "/agent/clients", label: "Klien", icon: <Users className="w-5 h-5" /> },
  { href: "/agent/leads", label: "Leads", icon: <Target className="w-5 h-5" /> },
  { href: "/agent/commission", label: "Komisi", icon: <Wallet className="w-5 h-5" /> },
  { href: "/agent/calendar", label: "Kalender", icon: <CalendarDays className="w-5 h-5" /> },
  { href: "/agent/tasks", label: "Tugas", icon: <ListChecks className="w-5 h-5" /> },
  { href: "/agent/documents", label: "Dokumen", icon: <FileText className="w-5 h-5" /> },
  { href: "/agent/reports", label: "Laporan", icon: <BarChart3 className="w-5 h-5" /> },
  { href: "/agent/profile", label: "Profil", icon: <UserCircle className="w-5 h-5" /> },
  { href: "/agent/settings", label: "Pengaturan", icon: <Settings className="w-5 h-5" /> },
];

export default function PartnerAgentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DashboardLayoutWrapper title="Partner Portal" links={agentLinks} sidebarTheme="light">
      {children}
    </DashboardLayoutWrapper>
  );
}
