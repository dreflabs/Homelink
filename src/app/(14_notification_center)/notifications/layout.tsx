import { ReactNode } from "react";
import Link from "next/link";
import { Inbox, Mail, MessageSquare, BellRing } from "lucide-react";
import { cn } from "@/lib/utils";

// For demo purposes, we're hardcoding 'All' as active. 
// In a real app, you would use usePathname or useSearchParams in a Client Component.
const NAV_ITEMS = [
  { label: "All", icon: Inbox, href: "/notifications", active: true },
  { label: "Unread", icon: BellRing, href: "/notifications?filter=unread", badge: 3 },
  { label: "Emails", icon: Mail, href: "/notifications?filter=emails" },
  { label: "SMS", icon: MessageSquare, href: "/notifications?filter=sms" },
];

export default function NotificationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50/50">
      {/* Sidebar Nav */}
      <aside className="hidden w-64 border-r border-slate-200 bg-white px-4 py-8 md:block">
        <div className="mb-8 px-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Notifications</h1>
        </div>
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                item.active
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <item.icon
                className={cn(
                  "h-4 w-4 transition-transform duration-200 group-hover:scale-110", 
                  item.active ? "text-blue-700" : "text-slate-500 group-hover:text-slate-900"
                )}
                strokeWidth={1.5}
                aria-hidden="true"
              />
              {item.label}
              {item.badge && (
                <span className="ml-auto inline-flex h-5 items-center justify-center rounded-full bg-blue-600 px-2 text-[10px] font-bold text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-slate-50">
        <div className="mx-auto max-w-4xl p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
