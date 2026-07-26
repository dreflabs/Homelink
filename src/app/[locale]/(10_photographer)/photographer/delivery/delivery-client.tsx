"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createNotification } from "@/actions/notification";
import {
  Send,
  ShieldCheck,
  Package,
  Clock,
  MapPin,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";

export function DeliveryClient({ deliveries }: { deliveries: any[] }) {
  const [sending, setSending] = useState<string | null>(null);
  const [sent, setSent] = useState<Set<string>>(new Set(deliveries.filter(d => d.status === "DELIVERED").map(d => d.id)));
  const [error, setError] = useState<string | null>(null);

  const handleSend = async (delivery: any) => {
    setSending(delivery.id);
    setError(null);
    try {
      await createNotification(
        delivery.property.ownerId || 'system',
        "Media Properti Anda Siap! 📸",
        `Halo, foto dan video untuk properti "${delivery.property.title}" (${delivery.mediaCount} file) telah selesai diproses dan siap untuk ditinjau. Silakan masuk ke dashboard Anda untuk mengunduh.`,
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
          { label: "Siap Dikirim", value: deliveries.filter((d) => !sent.has(d.id)).length, color: "text-amber-600", bg: "bg-amber-50", icon: Package },
          { label: "Sudah Dikirim", value: sent.size, color: "text-emerald-600", bg: "bg-emerald-50", icon: ShieldCheck },
          { label: "Total Media", value: deliveries.reduce((a, b) => a + (b.mediaCount || 0), 0), color: "text-indigo-600", bg: "bg-indigo-50", icon: ImageIcon },
        ].map((s) => (
          <Card key={s.label} className="rounded-2xl border-slate-100 shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.bg}`}>
                <s.icon className={`w-6 h-6 ${s.color}`}  />
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
        {deliveries.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Tidak ada pengiriman media.
          </div>
        ) : (
          deliveries.map((delivery) => {
            const isSent = sent.has(delivery.id);
            const isSending = sending === delivery.id;

            return (
              <Card key={delivery.id} className="rounded-2xl border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono text-slate-400">{delivery.id.substring(0, 8)}</span>
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
                      <h3 className="text-lg font-bold text-slate-900">{delivery.property.title}</h3>
                      <div className="flex items-center text-sm text-slate-500 mt-1 gap-1">
                        <MapPin className="w-5 h-5 flex-shrink-0"  />
                        <span className="truncate">{delivery.property.address}</span>
                      </div>

                      <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-indigo-400"  />
                          <span><strong>{delivery.mediaCount}</strong> file media</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 "  />
                          <span>Dipotret: {new Date(delivery.shootDate).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      {isSent ? (
                        <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm bg-emerald-50 px-4 py-2 rounded-xl">
                          <ShieldCheck className="w-5 h-5" />
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
          })
        )}
      </div>
    </div>
  );
}
