export const dynamic = 'force-dynamic';

import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { LayoutDashboard, Building, Calendar, FileText, Settings, BarChart2 } from "lucide-react";
import { DashboardLayoutWrapper, SidebarLink } from "@/components/shared/DashboardLayoutWrapper";

const ownerLinks: SidebarLink[] = [
  { href: "/owner/dashboard", label: "Overview", icon: <LayoutDashboard className="w-5 h-5" /> },
  { href: "/owner/properties", label: "Properti Saya", icon: <Building className="w-5 h-5" /> },
  { href: "/owner/property-status", label: "Status & Performa", icon: <BarChart2 className="w-5 h-5" /> },
  { href: "/owner/schedule", label: "Jadwal Kunjungan", icon: <Calendar className="w-5 h-5" /> },
  { href: "/owner/documents", label: "Dokumen", icon: <FileText className="w-5 h-5" /> },
  { href: "/owner/settings", label: "Pengaturan", icon: <Settings className="w-5 h-5" /> },
];

export default async function OwnerDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/owner/dashboard");
  }

  const role = (session.user as any)?.role;
  if (role !== "OWNER" && role !== "ADMIN" && role !== "SUPER_ADMIN") {
    redirect("/unauthorized");
  }

  return (
    <DashboardLayoutWrapper title="Owner Dashboard" links={ownerLinks} sidebarTheme="dark">
      {children}
    </DashboardLayoutWrapper>
  );
}
