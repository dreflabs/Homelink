export const dynamic = 'force-dynamic';

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from 'react';
import { DashboardLayoutWrapper } from "@/components/shared/DashboardLayoutWrapper";
import { 
  LayoutDashboard, 
  Building, 
  CheckSquare, 
  UserCheck, 
  Users, 
  HeadphonesIcon, 
  CircleDollarSign, 
  BarChart3, 
  Calendar, 
  FileText, 
  CheckCircle2 
} from 'lucide-react';

export default async function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <DashboardLayoutWrapper
      title="Internal Agent"
      sidebarTheme="light"
      links={[
        { href: "/internal", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
        { href: "/internal/properties", label: "Properties", icon: <Building className="w-5 h-5" /> },
        { href: "/internal/property-verification", label: "Property Verification", icon: <CheckSquare className="w-5 h-5" /> },
        { href: "/internal/owner-verification", label: "Owner Verification", icon: <UserCheck className="w-5 h-5" /> },
        { href: "/internal/lead-management", label: "Lead Management", icon: <Users className="w-5 h-5" /> },
        { href: "/internal/customer-support", label: "Customer Support", icon: <HeadphonesIcon className="w-5 h-5" /> },
        { href: "/internal/commission", label: "Commission", icon: <CircleDollarSign className="w-5 h-5" /> },
        { href: "/internal/analytics", label: "Analytics", icon: <BarChart3 className="w-5 h-5" /> },
        { href: "/internal/calendar", label: "Calendar", icon: <Calendar className="w-5 h-5" /> },
        { href: "/internal/reports", label: "Reports", icon: <FileText className="w-5 h-5" /> },
        { href: "/internal/tasks", label: "Tasks", icon: <CheckCircle2 className="w-5 h-5" /> },
      ]}
    >
      {children}
    </DashboardLayoutWrapper>
  );
}
