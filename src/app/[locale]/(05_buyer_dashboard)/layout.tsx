export const dynamic = 'force-dynamic';

import { ReactNode } from "react";
import { UserRound, Calendar, LayoutDashboard, FileCheck, MessageCircle, Settings, FileSearch, Heart } from "lucide-react";
import { DashboardLayoutWrapper, SidebarLink } from "@/components/shared/DashboardLayoutWrapper";
import { getTranslations } from "next-intl/server";

export default async function BuyerDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = await getTranslations("BuyerDashboard");

  const buyerLinks: SidebarLink[] = [
    { href: "/dashboard", label: t("layout.links.overview"), icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/dashboard/favorites", label: t("layout.links.favorites"), icon: <Heart className="w-5 h-5" /> },
    { href: "/my-profile", label: t("layout.links.profile"), icon: <UserRound className="w-5 h-5" /> },
    { href: "/schedule", label: t("layout.links.schedule"), icon: <Calendar className="w-5 h-5" /> },
    { href: "/offers", label: t("layout.links.offers"), icon: <FileSearch className="w-5 h-5" /> },
    { href: "/documents", label: t("layout.links.documents"), icon: <FileCheck className="w-5 h-5" /> },
    { href: "/messages", label: t("layout.links.messages"), icon: <MessageCircle className="w-5 h-5" /> },
    { href: "/settings", label: t("layout.links.settings"), icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <DashboardLayoutWrapper title={t("layout.title")} links={buyerLinks} sidebarTheme="light">
      {children}
    </DashboardLayoutWrapper>
  );
}
