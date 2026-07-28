import { auth } from "@/lib/auth";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { Bell, BellOff, CalendarCheck2, ShieldCheck, MessageCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EmptyState } from "@/components/shared/EmptyState";

export default async function Page() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const t = await getTranslations("BuyerDashboard.notifications");

  const dummyNotifications = [
    {
      id: "1",
      type: "BOOKING_UPDATE",
      title: "Jadwal Survei Dikonfirmasi",
      description: "Owner telah menyetujui jadwal survei Anda untuk properti Vila Modern Kemang pada 30 Juli 2026 pukul 10:00 WIB.",
      timestamp: "10 menit yang lalu",
      isRead: false,
    },
    {
      id: "2",
      type: "VERIFICATION_UPDATE",
      title: "Verifikasi Legalitas Selesai",
      description: "Dokumen legalitas untuk Apartemen Sudirman Suites telah diverifikasi oleh tim HomeLink dan dinyatakan Valid.",
      timestamp: "2 jam yang lalu",
      isRead: false,
    },
    {
      id: "3",
      type: "SYSTEM",
      title: "Selamat datang di HomeLink!",
      description: "Akun Anda telah berhasil dibuat. Mulai jelajahi ribuan properti terverifikasi sekarang.",
      timestamp: "Kemarin",
      isRead: true,
    },
  ];

  const isEmpty = false;

  const getIcon = (type: string) => {
    switch (type) {
      case "BOOKING_UPDATE": return <CalendarCheck2 className="w-5 h-5 text-blue-600" />;
      case "VERIFICATION_UPDATE": return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case "NEW_MESSAGE": return <MessageCircle className="w-5 h-5 text-purple-600" />;
      default: return <Bell className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{t("title")}</h1>
          <p className="text-slate-500 mt-2 text-lg">{t("subtitle")}</p>
        </div>
        {!isEmpty && (
          <Button variant="ghost" className="text-primary hover:bg-primary/10 transition-colors font-semibold">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Tandai Semua Dibaca
          </Button>
        )}
      </div>

      {isEmpty ? (
        <EmptyState 
          icon={BellOff}
          title="Tidak ada notifikasi"
          description="Anda belum memiliki notifikasi apapun saat ini. Pembaruan aktivitas Anda akan muncul di sini."
          className="border-dashed border-2 border-slate-200/60 bg-gradient-to-b from-slate-50/50 to-white py-20"
          action={
            <Button className="rounded-full mt-4 bg-primary hover:bg-primary text-white px-8 shadow-sm transition-all hover:-translate-y-0.5" asChild>
              <Link href="/dashboard">Kembali ke Dashboard <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          }
        />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="divide-y divide-slate-100">
            {dummyNotifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`p-6 sm:p-8 flex gap-5 sm:gap-6 transition-colors hover:bg-slate-50 cursor-pointer ${notif.isRead ? 'bg-white' : 'bg-blue-50/40'}`}
              >
                <div className="shrink-0 pt-1 relative">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${notif.isRead ? 'bg-slate-100' : 'bg-white shadow-sm border border-blue-100'}`}>
                    {getIcon(notif.type)}
                  </div>
                  {!notif.isRead && (
                    <div className="absolute top-1 right-0 w-3.5 h-3.5 bg-primary border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4">
                    <h3 className={`text-lg font-semibold ${notif.isRead ? 'text-slate-700' : 'text-slate-900'}`}>
                      {notif.title}
                    </h3>
                    <span className="text-sm font-medium text-slate-500 whitespace-nowrap">
                      {notif.timestamp}
                    </span>
                  </div>
                  <p className={`text-base leading-relaxed ${notif.isRead ? 'text-slate-500' : 'text-slate-700'}`}>
                    {notif.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
