import { DashboardLayoutWrapper } from "@/components/shared/DashboardLayoutWrapper";
import { LayoutDashboard, ClipboardList, FileText, CheckSquare, Camera, Video, Calendar } from "lucide-react";

export default function SurveyorLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayoutWrapper
      title="Surveyor"
      sidebarTheme="light"
      links={[
        { href: "/surveyor", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
        { href: "/surveyor/assignments", label: "Assignments", icon: <ClipboardList className="w-5 h-5" /> },
        { href: "/surveyor/survey-form", label: "Survey Form", icon: <FileText className="w-5 h-5" /> },
        { href: "/surveyor/verification", label: "Verification", icon: <CheckSquare className="w-5 h-5" /> },
        { href: "/surveyor/upload-photo", label: "Upload Photo", icon: <Camera className="w-5 h-5" /> },
        { href: "/surveyor/upload-video", label: "Upload Video", icon: <Video className="w-5 h-5" /> },
        { href: "/surveyor/reports", label: "Reports", icon: <FileText className="w-5 h-5" /> },
        { href: "/surveyor/schedule", label: "Schedule", icon: <Calendar className="w-5 h-5" /> },
      ]}
    >
      {children}
    </DashboardLayoutWrapper>
  );
}
