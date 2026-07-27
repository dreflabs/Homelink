export const dynamic = 'force-dynamic';

import { DashboardLayoutWrapper } from "@/components/shared/DashboardLayoutWrapper";
import { Inbox, Mail, MessageCircle, BellRing } from "lucide-react";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function NotificationLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

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
