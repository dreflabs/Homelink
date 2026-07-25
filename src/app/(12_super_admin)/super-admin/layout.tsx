export const dynamic = 'force-dynamic';

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from 'react';
import { DashboardLayoutWrapper } from "@/components/shared/DashboardLayoutWrapper";
import { 
  Home, 
  Users, 
  ScrollText, 
  Settings, 
  Building2, 
  ShieldCheck, 
  ToggleLeft, 
  Activity, 
  SlidersHorizontal, 
  Blocks,
  ListOrdered,
  Database,
  Sparkles,
  Shield,
  Archive
} from "lucide-react";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  if (session.user.role !== "SUPER_ADMIN") {
    redirect("/unauthorized");
  }

  return (
    <DashboardLayoutWrapper
      title="Super Admin"
      sidebarTheme="light"
      links={[
        { href: "/super-admin", label: "Home", icon: <Home className="w-5 h-5" /> },
        { href: "/super-admin/system-health", label: "System Health", icon: <Activity className="w-5 h-5" /> },
        { href: "/super-admin/audit-logs", label: "Audit Logs", icon: <ScrollText className="w-5 h-5" /> },
        { href: "/super-admin/tenant-management", label: "Tenants", icon: <Building2 className="w-5 h-5" /> },
        { href: "/super-admin/roles-permissions", label: "RBAC", icon: <ShieldCheck className="w-5 h-5" /> },
        { href: "/super-admin/feature-flags", label: "Feature Flags", icon: <ToggleLeft className="w-5 h-5" /> },
        { href: "/super-admin/queue", label: "Task Queue", icon: <ListOrdered className="w-5 h-5" /> },
        { href: "/super-admin/db-monitor", label: "DB Monitor", icon: <Database className="w-5 h-5" /> },
        { href: "/super-admin/ai-monitor", label: "AI Monitor", icon: <Sparkles className="w-5 h-5" /> },
        { href: "/super-admin/security", label: "Security", icon: <Shield className="w-5 h-5" /> },
        { href: "/super-admin/backup", label: "Backup", icon: <Archive className="w-5 h-5" /> },
        { href: "/super-admin/environment-config", label: "Environment", icon: <SlidersHorizontal className="w-5 h-5" /> },
        { href: "/super-admin/integrations", label: "Integrations", icon: <Blocks className="w-5 h-5" /> },
      ]}
    >
      {children}
    </DashboardLayoutWrapper>
  );
}
