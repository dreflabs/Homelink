export const dynamic = 'force-dynamic';

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from 'react';
import { DashboardLayoutWrapper } from "@/components/shared/DashboardLayoutWrapper";
import { LayoutDashboard, UserRound, Building, FileCheck, CheckSquare, ChartArea, Settings } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  const role = (session.user as any)?.role;
  if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
    redirect("/unauthorized");
  }

  const logoNode = (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg leading-none">H</span>
      </div>
      <span className="text-xl font-bold tracking-tight text-slate-900">HomeLink</span>
    </div>
  );

  return (
    <DashboardLayoutWrapper
      title="HomeLink Admin"
      sidebarTheme="light"
      logoutLabel="Sign Out"
      roleBadge="Super Admin"
      logoNode={logoNode}
      links={[
        { href: "/admin", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
        { href: "/admin/users", label: "UserRound", icon: <UserRound className="w-5 h-5" /> },
        { href: "/admin/properties", label: "Properties", icon: <Building className="w-5 h-5" /> },
        { href: "/admin/reports", label: "Reports", icon: <FileCheck className="w-5 h-5" /> },
        { href: "/admin/verification-queue", label: "Queue", icon: <CheckSquare className="w-5 h-5" /> },
        { href: "/admin/analytics", label: "Analytics", icon: <ChartArea className="w-5 h-5" /> },
        { href: "/admin/settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
      ]}
    >
      {children}
    </DashboardLayoutWrapper>
  );
}
