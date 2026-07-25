import { DashboardLayoutWrapper } from "@/components/shared/DashboardLayoutWrapper";
import {
  LayoutDashboard,
  FileText,
  Tags,
  HelpCircle,
  Image as ImageIcon,
  ImagePlay,
  MessageSquare,
  FileCode2,
  Search,
  LayoutTemplate
} from "lucide-react";

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayoutWrapper
      title="CMS Admin"
      sidebarTheme="light"
      links={[
        { href: "/cms/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
        { href: "/cms/articles", label: "Articles", icon: <FileText className="w-5 h-5" /> },
        { href: "/cms/categories", label: "Categories", icon: <Tags className="w-5 h-5" /> },
        { href: "/cms/media-library", label: "Media Library", icon: <ImageIcon className="w-5 h-5" /> },
        { href: "/cms/banner", label: "Banner", icon: <ImagePlay className="w-5 h-5" /> },
        { href: "/cms/testimonials", label: "Testimonials", icon: <MessageSquare className="w-5 h-5" /> },
        { href: "/cms/faq-management", label: "FAQ Management", icon: <HelpCircle className="w-5 h-5" /> },
        { href: "/cms/static-pages", label: "Static Pages", icon: <FileCode2 className="w-5 h-5" /> },
        { href: "/cms/seo-settings", label: "SEO Settings", icon: <Search className="w-5 h-5" /> },
        { href: "/cms/homepage-builder", label: "Homepage Builder", icon: <LayoutTemplate className="w-5 h-5" /> },
      ]}
    >
      {children}
    </DashboardLayoutWrapper>
  );
}
