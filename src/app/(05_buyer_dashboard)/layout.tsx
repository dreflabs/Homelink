import { ReactNode } from "react";
import { User, Calendar, LayoutDashboard, FileText, MessageSquare, Settings, FileSearch } from "lucide-react";
import { DashboardLayoutWrapper, SidebarLink } from "@/components/shared/DashboardLayoutWrapper";

const buyerLinks: SidebarLink[] = [
  { href: "/dashboard", label: "Overview", icon: <LayoutDashboard className="w-5 h-5" /> },
  { href: "/my-profile", label: "Profil", icon: <User className="w-5 h-5" /> },
  { href: "/schedule", label: "Jadwal Kunjungan", icon: <Calendar className="w-5 h-5" /> },
  { href: "/offers", label: "Penawaran", icon: <FileSearch className="w-5 h-5" /> },
  { href: "/documents", label: "Dokumen", icon: <FileText className="w-5 h-5" /> },
  { href: "/messages", label: "Pesan", icon: <MessageSquare className="w-5 h-5" /> },
  { href: "/settings", label: "Pengaturan", icon: <Settings className="w-5 h-5" /> },
];

export default function BuyerDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DashboardLayoutWrapper title="Buyer Dashboard" links={buyerLinks} sidebarTheme="light">
      {children}
    </DashboardLayoutWrapper>
  );
}
