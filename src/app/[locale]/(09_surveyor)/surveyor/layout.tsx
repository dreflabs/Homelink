export const dynamic = 'force-dynamic';

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardLayoutWrapper } from "@/components/shared/DashboardLayoutWrapper";
import { LayoutDashboard, ClipboardList, FileCheck, CheckSquare, Camera, Video, Calendar } from "lucide-react";

export default async function SurveyorLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  const role = (session.user as any)?.role;
  if (role !== "SURVEYOR" && role !== "ADMIN" && role !== "SUPER_ADMIN") {
    redirect("/unauthorized");
  }

  return (
    <DashboardLayoutWrapper
      title="Surveyor"
      sidebarTheme="light"
      links={[
        { href: "/surveyor", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
        { href: "/surveyor/assignments", label: "Assignments", icon: <ClipboardList className="w-5 h-5" /> },
        { href: "/surveyor/survey-form", label: "Survey Form", icon: <FileCheck className="w-5 h-5" /> },
        { href: "/surveyor/verification", label: "Verification", icon: <CheckSquare className="w-5 h-5" /> },
        { href: "/surveyor/upload-photo", label: "Upload Photo", icon: <Camera className="w-5 h-5" /> },
        { href: "/surveyor/upload-video", label: "Upload Video", icon: <Video className="w-5 h-5" /> },
        { href: "/surveyor/reports", label: "Reports", icon: <FileCheck className="w-5 h-5" /> },
        { href: "/surveyor/schedule", label: "Schedule", icon: <Calendar className="w-5 h-5" /> },
      ]}
    >
      {children}
    </DashboardLayoutWrapper>
  );
}
