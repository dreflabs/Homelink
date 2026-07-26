export const dynamic = 'force-dynamic';

import { DashboardLayoutWrapper } from "@/components/shared/DashboardLayoutWrapper";
import { Inbox, Mail, MessageCircle, BellRing } from "lucide-react";
import { ReactNode } from "react";

export default function NotificationLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayoutWrapper
      title="Notifications"
      sidebarTheme="light"
      links={[
        { href: "/notifications", label: "All", icon: <Inbox className="w-5 h-5" /> },
        { href: "/notifications?filter=unread", label: "Unread", icon: <BellRing className="w-5 h-5" /> },
        { href: "/notifications?filter=emails", label: "Emails", icon: <Mail className="w-5 h-5" /> },
        { href: "/notifications?filter=sms", label: "SMS", icon: <MessageCircle className="w-5 h-5" /> },
      ]}
    >
      {children}
    </DashboardLayoutWrapper>
  );
}
