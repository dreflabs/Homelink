"use client";
import { useTranslations } from "next-intl";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Clock, UserRound, Mail, Calendar, Shield } from "lucide-react";
import { toast } from "sonner";
import { updateOwnerVerificationStatus } from "@/actions/internal";
import { format } from "date-fns";
import { FadeIn } from "@/components/shared/FadeIn";
import { EmptyState } from "@/components/shared/EmptyState";
import { OwnerVerification, User as PrismaUser } from "@prisma/client";

type OwnerRecord = OwnerVerification & { user: PrismaUser };

export function OwnerVerificationClient({ initialOwners }: { initialOwners: OwnerRecord[] }) {
  const t = useTranslations("InternalAgent");

  const [owners, setOwners] = useState<OwnerRecord[]>(initialOwners);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleApprove(id: string) {
    setLoadingId(id);
    try {
      await updateOwnerVerificationStatus(id, "APPROVED");
      setOwners((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: "APPROVED" } : o))
      );
      toast.success(t("identitas_berhasil"));
    } catch (error) {
      toast.error(t("gagal_memverifikasi"));
    } finally {
      setLoadingId(null);
    }
  }

  const unverified = owners.filter((o) => o.status === "UNVERIFIED");
  const approved = owners.filter((o) => o.status === "APPROVED");

  return (
    <div className="space-y-8">
      {/* Header */}
      <FadeIn delay={0.1}>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {t("verifikasi_identitas_owner")}
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            {t("antrean_verifikasi_identitas")}
          </p>
        </div>
      </FadeIn>

      {/* Stats */}
      <FadeIn delay={0.2} className="flex flex-wrap gap-3">
        <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
          {unverified.length} {t("menunggu_verifikasi")}
        </span>
        <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
          {approved.length} Terverifikasi
        </span>
      </FadeIn>

      {/* Owner Cards */}
      <FadeIn delay={0.3}>
      {owners.length === 0 ? (
        <EmptyState
          icon={ShieldCheck}
          title={t("semua_tuntas")}
          description={t("tidak_ada_owner_yang_perlu_diverifikasi_saat_ini")}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {owners.map((owner) => (
            <Card
              key={owner.id}
              className={`rounded-xl shadow-sm border-gray-200/60 p-5 transition-all ${
                owner.status === "APPROVED" ? "opacity-60" : "hover:shadow-md"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-lg shrink-0">
                  {owner.user?.name?.charAt(0) || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{owner.user?.name || 'Unknown UserRound'}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                        <Mail className="w-3 h-3" />
                        {owner.user?.email || 'N/A'}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        owner.status === "APPROVED"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 text-xs shrink-0"
                          : "bg-amber-50 text-amber-700 border-amber-200 text-xs shrink-0"
                      }
                    >
                      {owner.status === "APPROVED" ? (
                        <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Verified</span>
                      ) : (
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Menunggu</span>
                      )}
                    </Badge>
                  </div>

                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Shield className="w-3.5 h-3.5 shrink-0 " />
                      {owner.idType}: {owner.idNumber}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <UserRound className="w-3.5 h-3.5 shrink-0 " />
                      ID: {owner.id.substring(0, 8)}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                      {t("daftar")}{format(new Date(owner.createdAt), 'dd MMM yyyy')}
                    </div>
                  </div>

                  {owner.status === "UNVERIFIED" && (
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 text-xs flex-1"
                        onClick={() => handleApprove(owner.id)}
                        disabled={loadingId === owner.id}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {loadingId === owner.id ? t("memproses") : "Verifikasi"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50 text-xs"
                      >
                        {t("lihat_dokumen")}
                      </Button>
                    </div>
                  )}
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
