"use client";
import { useTranslations } from "next-intl";

import { useState } from "react";
import { approveProperty, rejectProperty } from "@/actions/admin";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, XCircle, Clock, Building, MapPin, UserRound } from "lucide-react";
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
  const t = useTranslations("InternalAgent");

  const [queue, setQueue] = useState(initialQueue);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleApprove(id: string) {
    setLoadingId(id);
    try {
      await approveProperty(id);
      setQueue((q) => q.filter((p) => p.id !== id));
      toast.success(t("properti_berhasil_disetujui"));
    } catch {
      toast.error(t("gagal_menyetujui_properti"));
    } finally {
      setLoadingId(null);
    }
  }

  async function handleReject(id: string) {
    setLoadingId(id);
    try {
      await rejectProperty(id);
      setQueue((q) => q.filter((p) => p.id !== id));
      toast.success(t("properti_ditolak"));
    } catch {
      toast.error(t("gagal_menolak_properti"));
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
            {t("verifikasi_properti")}
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            {t("antrean_properti")}
          </p>
        </div>
      </FadeIn>

      {/* Stats */}
      <FadeIn delay={0.2} className="flex flex-wrap gap-3">
        <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
          {queue.filter((p) => p.status === "PENDING_REVIEW").length} {t("menunggu_review")}
        </span>
        <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-primary">
          {queue.filter((p) => p.status === "DRAFT").length} Draft
        </span>
      </FadeIn>

      {/* Queue Cards */}
      <FadeIn delay={0.3}>
      {queue.length === 0 ? (
        <EmptyState
          icon={ShieldCheck}
          title={t("semua_selesai")}
          description={t("semua_properti_telah_diverifikasi")}
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
                  <div className="p-3 bg-slate-50 rounded-xl shrink-0">
                    <Building className="w-5 h-5 " />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{property.title}</h3>
                      <Badge
                        variant="outline"
                        className={
                          property.status === "SURVEYED"
                            ? "bg-slate-50 text-primary border-slate-200 text-xs"
                            : "bg-amber-50 text-amber-700 border-amber-200 text-xs"
                        }
                      >
                        {property.status === "SURVEYED" ? (
                          <span className="flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> {t("sudah_disurvei")}
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
                        <UserRound className="w-3.5 h-3.5 shrink-0" />
                        {t("pemilik")}{property.owner}
                      </div>
                      <p className="text-xs text-gray-400">{t("diajukan")}{property.submittedAt}</p>
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
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {loadingId === property.id ? t("memproses") : t("setujui")}
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
