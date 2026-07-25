"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, User, Mail, Calendar, Shield } from "lucide-react";
import { toast } from "sonner";

interface OwnerRecord {
  id: string;
  name: string;
  email: string;
  registeredAt: string;
  propertiesCount: number;
  idType: string;
  idNumber: string;
  status: "UNVERIFIED" | "APPROVED";
}

const mockOwners: OwnerRecord[] = [
  {
    id: "u1",
    name: "Hendra Wijaya",
    email: "hendra.wijaya@email.com",
    registeredAt: "15 Jun 2026",
    propertiesCount: 2,
    idType: "KTP",
    idNumber: "3171 xxxx xxxx 0012",
    status: "UNVERIFIED",
  },
  {
    id: "u2",
    name: "Sari Endah",
    email: "sari.endah@email.com",
    registeredAt: "20 Jun 2026",
    propertiesCount: 1,
    idType: "KTP",
    idNumber: "3174 xxxx xxxx 0089",
    status: "UNVERIFIED",
  },
  {
    id: "u3",
    name: "Rizal Ahmad",
    email: "rizal.ahmad@email.com",
    registeredAt: "10 Jul 2026",
    propertiesCount: 3,
    idType: "Paspor",
    idNumber: "A9876543",
    status: "UNVERIFIED",
  },
  {
    id: "u4",
    name: "Dewi Kusuma",
    email: "dewi.kusuma@email.com",
    registeredAt: "22 Jul 2026",
    propertiesCount: 1,
    idType: "KTP",
    idNumber: "3175 xxxx xxxx 0201",
    status: "UNVERIFIED",
  },
];

export default function OwnerVerificationPage() {
  const [owners, setOwners] = useState(mockOwners);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleApprove(id: string) {
    setLoadingId(id);
    // Mock approve – in production would call a server action
    await new Promise((r) => setTimeout(r, 800));
    setOwners((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "APPROVED" as const } : o))
    );
    toast.success("Identitas Owner berhasil diverifikasi!");
    setLoadingId(null);
  }

  const unverified = owners.filter((o) => o.status === "UNVERIFIED");
  const approved = owners.filter((o) => o.status === "APPROVED");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Verifikasi Identitas Owner
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Antrean verifikasi identitas pengguna dengan peran Owner yang belum terverifikasi.
        </p>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-3">
        <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
          {unverified.length} Menunggu Verifikasi
        </span>
        <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
          {approved.length} Terverifikasi
        </span>
      </div>

      {/* Owner Cards */}
      {owners.length === 0 ? (
        <Card className="rounded-xl shadow-sm border-gray-200/60 p-12 text-center">
          <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">Tidak ada Owner yang perlu diverifikasi.</p>
        </Card>
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
                  {owner.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{owner.name}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                        <Mail className="w-3 h-3" />
                        {owner.email}
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
                      {owner.propertiesCount} properti terdaftar
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                      Daftar: {owner.registeredAt}
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
    </div>
  );
}
