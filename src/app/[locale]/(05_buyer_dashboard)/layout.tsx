export const dynamic = 'force-dynamic';

import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { UserRound, Calendar, LayoutDashboard, FileCheck, MessageCircle, Settings, FileSearch, Heart } from "lucide-react";
import { DashboardLayoutWrapper, SidebarLink } from "@/components/shared/DashboardLayoutWrapper";
import { getTranslations } from "next-intl/server";
import { auth } from "@/lib/auth";

export default async function BuyerDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const t = await getTranslations("BuyerDashboard");

  const buyerLinks: SidebarLink[] = [
    { href: "/dashboard", label: t("layout.links.overview"), icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/dashboard/saved", label: t("layout.links.favorites"), icon: <Heart className="w-5 h-5" /> },
    { href: "/dashboard/profile", label: t("layout.links.profile"), icon: <UserRound className="w-5 h-5" /> },
    { href: "/dashboard/bookings", label: t("layout.links.schedule"), icon: <Calendar className="w-5 h-5" /> },
    { href: "/dashboard/offers", label: t("layout.links.offers"), icon: <FileSearch className="w-5 h-5" /> },
    { href: "/dashboard/documents", label: t("layout.links.documents"), icon: <FileCheck className="w-5 h-5" /> },
    { href: "/dashboard/messages", label: t("layout.links.messages"), icon: <MessageCircle className="w-5 h-5" /> },
    { href: "/dashboard/settings", label: t("layout.links.settings"), icon: <Settings className="w-5 h-5" /> },
  ];

  const logoNode = (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg leading-none">H</span>
      </div>
      <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">HomeLink</span>
    </div>
  );

  return (
    <DashboardLayoutWrapper 
      title={t("layout.title")} 
      links={buyerLinks} 
      sidebarTheme="light"
      logoutLabel={t("layout.links.logout")}
      roleBadge="Portal Pembeli"
      logoNode={logoNode}
    >
      {children}
    </DashboardLayoutWrapper>
  );
}
