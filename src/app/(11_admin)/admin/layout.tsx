export const dynamic = 'force-dynamic';

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from 'react';
import { DashboardLayoutWrapper } from "@/components/shared/DashboardLayoutWrapper";
import { LayoutDashboard, Users, Home, FileText, CheckSquare, BarChart, Settings } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <DashboardLayoutWrapper
      title="HomeLink Admin"
      sidebarTheme="light"
      links={[
        { href: "/admin", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
        { href: "/admin/users", label: "Users", icon: <Users className="w-5 h-5" /> },
        { href: "/admin/properties", label: "Properties", icon: <Home className="w-5 h-5" /> },
        { href: "/admin/reports", label: "Reports", icon: <FileText className="w-5 h-5" /> },
        { href: "/admin/verification-queue", label: "Queue", icon: <CheckSquare className="w-5 h-5" /> },
        { href: "/admin/analytics", label: "Analytics", icon: <BarChart className="w-5 h-5" /> },
        { href: "/admin/settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
      ]}
    >
      {children}
    </DashboardLayoutWrapper>
  );
}
