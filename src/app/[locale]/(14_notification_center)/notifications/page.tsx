import { Card } from "@/components/ui/card";
import { Mail, MessageCircle, ShieldAlert, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const NOTIFICATIONS = [
  {
    id: 1,
    type: "email",
    title: "New Viewing Request",
    message: "John Doe requested a viewing for 'Luxury Villa in Canggu'. Please respond within 24 hours to confirm.",
    date: "10 mins ago",
    unread: true,
    icon: Mail,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    id: 2,
    type: "sms",
    title: "Payment Received",
    message: "Your payment of $1,200 for Invoice #INV-8392 has been successfully confirmed.",
    date: "2 hours ago",
    unread: true,
    icon: MessageCircle,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    id: 3,
    type: "alert",
    title: "Document Missing",
    message: "Please upload your ID to complete the verification process for your agent profile.",
    date: "Yesterday",
    unread: false,
    icon: ShieldAlert,
    color: "text-rose-600",
    bgColor: "bg-rose-100",
  },
  {
    id: 4,
    type: "success",
    title: "Listing Approved",
    message: "Your property 'Modern Apartment in Sudirman' is now live and visible to buyers.",
    date: "2 days ago",
    unread: false,
    icon: ShieldCheck,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Inbox</h2>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
          Mark all as read
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {NOTIFICATIONS.map((notif) => (
          <Card
            key={notif.id}
            className={cn(
              "group relative flex cursor-pointer items-start gap-4 p-4 transition-all duration-300",
              "hover:shadow-md hover:-translate-y-0.5 rounded-2xl md:rounded-3xl",
              notif.unread 
                ? "bg-white border-blue-100 shadow-sm" 
                : "bg-slate-50/50 border-slate-100 shadow-none hover:bg-white"
            )}
          >
            <div className={cn("mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110", notif.bgColor)}>
              <notif.icon className={cn("h-5 w-5", notif.color)}  aria-hidden="true" />
            </div>
            
            <div className="flex flex-1 flex-col gap-1.5 py-1">
              <div className="flex items-center justify-between">
                <h3 className={cn("text-base font-semibold", notif.unread ? "text-slate-900" : "text-slate-700")}>
                  {notif.title}
                </h3>
                <span className="text-xs font-medium text-slate-500 whitespace-nowrap ml-4">{notif.date}</span>
              </div>
              <p className={cn("text-sm leading-relaxed line-clamp-2", notif.unread ? "text-slate-600 font-medium" : "text-slate-500")}>
                {notif.message}
              </p>
            </div>

            {notif.unread && (
              <div className="absolute top-1/2 right-6 -translate-y-1/2 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
