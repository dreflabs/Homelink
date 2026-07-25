"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createNotification } from "@/actions/notification";
import {
  Send,
  CheckCircle2,
  Package,
  Clock,
  MapPin,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";

const mockDeliveries = [
  {
    id: "DEL-001",
    property: "Vila Indah Kemang",
    address: "Jl. Kemang Raya No 12, Jakarta Selatan",
    ownerId: "owner-uuid-001", // would be real UUID in production
    ownerName: "Budi Santoso",
    mediaCount: 24,
    shootDate: "20 Jul 2026",
    status: "ready" as const,
  },
  {
    id: "DEL-002",
    property: "Apartemen Sudirman Suites",
    address: "Jl. Jend. Sudirman Kav 36, Jakarta Pusat",
    ownerId: "owner-uuid-002",
    ownerName: "Siti Rahayu",
    mediaCount: 18,
    shootDate: "21 Jul 2026",
    status: "ready" as const,
  },
  {
    id: "DEL-003",
    property: "Rumah Modern Bintaro",
    address: "Bintaro Sektor 7, Tangerang Selatan",
    ownerId: "owner-uuid-003",
    ownerName: "Andi Wijaya",
    mediaCount: 31,
    shootDate: "22 Jul 2026",
    status: "sent" as const,
  },
];

export default function DeliveryPage() {
  const [sending, setSending] = useState<string | null>(null);
  const [sent, setSent] = useState<Set<string>>(new Set(["DEL-003"]));
  const [error, setError] = useState<string | null>(null);

  const handleSend = async (delivery: (typeof mockDeliveries)[0]) => {
    setSending(delivery.id);
    setError(null);
    try {
      await createNotification(
        delivery.ownerId,
        "Media Properti Anda Siap! 📸",
        `Halo ${delivery.ownerName}, foto dan video untuk properti "${delivery.property}" (${delivery.mediaCount} file) telah selesai diproses dan siap untuk ditinjau. Silakan masuk ke dashboard Anda untuk mengunduh.`,
        "MEDIA_READY",
        delivery.id
      );
      setSent((prev) => new Set([...prev, delivery.id]));
    } catch (err: any) {
      setError(`Gagal mengirim notifikasi: ${err.message}`);
    } finally {
      setSending(null);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Pengiriman Media</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Kirim notifikasi ke Owner bahwa media properti sudah siap.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Siap Dikirim", value: mockDeliveries.filter((d) => !sent.has(d.id)).length, color: "text-amber-600", bg: "bg-amber-50", icon: Package },
          { label: "Sudah Dikirim", value: sent.size, color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle2 },
          { label: "Total Media", value: mockDeliveries.reduce((a, b) => a + b.mediaCount, 0), color: "text-indigo-600", bg: "bg-indigo-50", icon: ImageIcon },
        ].map((s) => (
          <Card key={s.label} className="rounded-2xl border-slate-100 shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.bg}`}>
                <s.icon className={`w-6 h-6 ${s.color}`} strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{s.value}</div>
                <div className="text-sm text-slate-500">{s.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delivery List */}
      <div className="space-y-4">
        {mockDeliveries.map((delivery) => {
          const isSent = sent.has(delivery.id);
          const isSending = sending === delivery.id;

          return (
            <Card key={delivery.id} className="rounded-2xl border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono text-slate-400">{delivery.id}</span>
                      <Badge
                        variant="secondary"
                        className={`rounded-full text-xs px-3 ${
                          isSent
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {isSent ? "Terkirim" : "Siap Kirim"}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{delivery.property}</h3>
                    <div className="flex items-center text-sm text-slate-500 mt-1 gap-1">
                      <MapPin className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                      <span className="truncate">{delivery.address}</span>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-indigo-400" strokeWidth={1.5} />
                        <span><strong>{delivery.mediaCount}</strong> file media</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                        <span>Dipotret: {delivery.shootDate}</span>
                      </div>
                    </div>

                    <div className="mt-3 text-sm text-slate-500">
                      Owner: <span className="font-medium text-slate-700">{delivery.ownerName}</span>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    {isSent ? (
                      <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm bg-emerald-50 px-4 py-2 rounded-xl">
                        <CheckCircle2 className="w-4 h-4" />
                        Notifikasi Terkirim
                      </div>
                    ) : (
                      <Button
                        className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                        onClick={() => handleSend(delivery)}
                        disabled={isSending}
                      >
                        {isSending ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Mengirim...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Kirim Notifikasi
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
