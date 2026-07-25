import { DashboardLayoutWrapper } from "@/components/shared/DashboardLayoutWrapper";
import { LayoutDashboard, CalendarDays, Image as ImageIcon, ClipboardList } from "lucide-react";
import { ReactNode } from "react";

export default function PhotographerLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayoutWrapper
      title="HomeLink Studio"
      sidebarTheme="dark"
      links={[
        { href: "/photographer", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
        { href: "/photographer/assignments", label: "Assignments", icon: <ClipboardList className="w-5 h-5" /> },
        { href: "/photographer/gallery", label: "Gallery", icon: <ImageIcon className="w-5 h-5" /> },
        { href: "/photographer/schedule", label: "Schedule", icon: <CalendarDays className="w-5 h-5" /> },
      ]}
    >
      {children}
    </DashboardLayoutWrapper>
  );
}
