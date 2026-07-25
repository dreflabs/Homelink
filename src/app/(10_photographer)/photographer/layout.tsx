import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardLayoutWrapper } from "@/components/shared/DashboardLayoutWrapper";
import { LayoutDashboard, CalendarDays, Image as ImageIcon, ClipboardList } from "lucide-react";
import { ReactNode } from "react";

export default async function PhotographerLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

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
