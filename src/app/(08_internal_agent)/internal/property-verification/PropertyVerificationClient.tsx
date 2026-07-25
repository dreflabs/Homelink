"use client";

import { useState } from "react";
import { approveProperty, rejectProperty } from "@/actions/admin";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, Home, MapPin, User } from "lucide-react";
import { toast } from "sonner";
import { FadeIn } from "@/components/shared/FadeIn";
import { EmptyState } from "@/components/shared/EmptyState";

interface PropertyItem {
  id: string;
  title: string;
  address: string;
  owner: string;
  status: string;
  submittedAt: string;
  surveyor?: string;
}

export default function PropertyVerificationClient({ initialQueue }: { initialQueue: PropertyItem[] }) {
  const [queue, setQueue] = useState(initialQueue);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleApprove(id: string) {
    setLoadingId(id);
    try {
      await approveProperty(id);
      setQueue((q) => q.filter((p) => p.id !== id));
      toast.success("Properti berhasil disetujui!");
    } catch {
      toast.error("Gagal menyetujui properti.");
    } finally {
      setLoadingId(null);
    }
  }

  async function handleReject(id: string) {
    setLoadingId(id);
    try {
      await rejectProperty(id);
      setQueue((q) => q.filter((p) => p.id !== id));
      toast.success("Properti ditolak.");
    } catch {
      toast.error("Gagal menolak properti.");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <FadeIn delay={0.1}>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Verifikasi Properti
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Antrean properti yang menunggu review dan persetujuan internal.
          </p>
        </div>
      </FadeIn>

      {/* Stats */}
      <FadeIn delay={0.2} className="flex flex-wrap gap-3">
        <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
          {queue.filter((p) => p.status === "PENDING_REVIEW").length} Menunggu Review
        </span>
        <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
          {queue.filter((p) => p.status === "DRAFT").length} Draft
        </span>
      </FadeIn>

      {/* Queue Cards */}
      <FadeIn delay={0.3}>
      {queue.length === 0 ? (
        <EmptyState
          icon={CheckCircle}
          title="Semua Selesai!"
          description="Semua properti telah diverifikasi. Antrean kosong."
        />
      ) : (
        <div className="space-y-4">
          {queue.map((property) => (
            <Card
              key={property.id}
              className="rounded-xl shadow-sm border-gray-200/60 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-blue-50 rounded-xl shrink-0">
                    <Home className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{property.title}</h3>
                      <Badge
                        variant="outline"
                        className={
                          property.status === "SURVEYED"
                            ? "bg-blue-50 text-blue-700 border-blue-200 text-xs"
                            : "bg-amber-50 text-amber-700 border-amber-200 text-xs"
                        }
                      >
                        {property.status === "SURVEYED" ? (
                          <span className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Sudah Disurvei
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {property.status}
                          </span>
                        )}
                      </Badge>
                    </div>
                    <div className="space-y-1 mt-2">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        {property.address}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <User className="w-3.5 h-3.5 shrink-0" />
                        Pemilik: {property.owner}
                      </div>
                      <p className="text-xs text-gray-400">Diajukan: {property.submittedAt}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-xl border-red-200 text-red-600 hover:bg-red-50 gap-1.5 text-xs"
                    onClick={() => handleReject(property.id)}
                    disabled={loadingId === property.id}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Tolak
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 text-xs"
                    onClick={() => handleApprove(property.id)}
                    disabled={loadingId === property.id}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    {loadingId === property.id ? "Memproses..." : "Setujui"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      </FadeIn>
    </div>
  );
}
