"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, User, Mail, Calendar, Shield } from "lucide-react";
import { toast } from "sonner";
import { getOwnerVerifications, updateOwnerVerificationStatus } from "@/actions/internal";
import { format } from "date-fns";
import { FadeIn } from "@/components/shared/FadeIn";
import { EmptyState } from "@/components/shared/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";

type OwnerRecord = any; // type it loosely for now

export default function OwnerVerificationPage() {
  const [owners, setOwners] = useState<OwnerRecord[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getOwnerVerifications();
        setOwners(data);
      } catch (error) {
        toast.error("Failed to load verifications");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  async function handleApprove(id: string) {
    setLoadingId(id);
    try {
      await updateOwnerVerificationStatus(id, "APPROVED");
      setOwners((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: "APPROVED" } : o))
      );
      toast.success("Identitas Owner berhasil diverifikasi!");
    } catch (error) {
      toast.error("Gagal memverifikasi identitas");
    } finally {
      setLoadingId(null);
    }
  }

  const unverified = owners.filter((o) => o.status === "UNVERIFIED");
  const approved = owners.filter((o) => o.status === "APPROVED");

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-40 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <FadeIn delay={0.1}>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Verifikasi Identitas Owner
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Antrean verifikasi identitas pengguna dengan peran Owner yang belum terverifikasi.
          </p>
        </div>
      </FadeIn>

      {/* Stats */}
      <FadeIn delay={0.2} className="flex flex-wrap gap-3">
        <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
          {unverified.length} Menunggu Verifikasi
        </span>
        <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
          {approved.length} Terverifikasi
        </span>
      </FadeIn>

      {/* Owner Cards */}
      <FadeIn delay={0.3}>
      {owners.length === 0 ? (
        <EmptyState
          icon={CheckCircle}
          title="Semua Tuntas!"
          description="Tidak ada Owner yang perlu diverifikasi saat ini."
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
                      <h3 className="font-semibold text-gray-900">{owner.user?.name || 'Unknown User'}</h3>
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
                        <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Verified</span>
                      ) : (
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Menunggu</span>
                      )}
                    </Badge>
                  </div>

                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Shield className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                      {owner.idType}: {owner.idNumber}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <User className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                      ID: {owner.id.substring(0, 8)}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                      Daftar: {format(new Date(owner.createdAt), 'dd MMM yyyy')}
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
                        <CheckCircle className="w-3.5 h-3.5" />
                        {loadingId === owner.id ? "Memproses..." : "Verifikasi"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50 text-xs"
                      >
                        Lihat Dokumen
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
