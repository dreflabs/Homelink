"use client";
import { useTranslations } from "next-intl";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, FileCheck } from "lucide-react";
import { toast } from "sonner";
import { approveProperty, rejectProperty } from "@/actions/admin";
import { Property, User as PrismaUser } from "@prisma/client";

type PropertyRecord = Property & { owner: PrismaUser };

export function PropertiesClient({ initialProperties }: { initialProperties: PropertyRecord[] }) {
  const t = useTranslations("InternalAgent");

  const [properties, setProperties] = useState<PropertyRecord[]>(initialProperties);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleApprove(id: string) {
    setLoadingId(id);
    try {
      await approveProperty(id);
      setProperties((prev) => prev.map((p) => p.id === id ? { ...p, status: "PUBLISHED" } : p));
      toast.success(t("properti_disetujui"));
    } catch (error) {
      toast.error("Gagal menyetujui properti");
    } finally {
      setLoadingId(null);
    }
  }

  async function handleReject(id: string) {
    setLoadingId(id);
    try {
      await rejectProperty(id);
      setProperties((prev) => prev.map((p) => p.id === id ? { ...p, status: "REJECTED" } : p));
      toast.success(t("properti_ditolak_banget"));
    } catch (error) {
      toast.error("Gagal menolak properti");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{t("tinjauan_properti")}</h1>
        <p className="text-slate-500 mt-2">{t("kelola_daftar_properti_baru")}</p>
      </div>

      <Card className="rounded-2xl shadow-card border-slate-100">
        <CardHeader className="bg-slate-50/80 border-b border-slate-100 rounded-t-2xl px-6 py-5">
          <CardTitle className="text-slate-900 text-lg flex items-center gap-2">
            <FileCheck className="w-5 h-5 "  />
            {t("daftar_properti_baru")}
          </CardTitle>
          <CardDescription>
            {t("tinjau_dan_ambil_tindakan")}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto pb-2 rounded-xl border border-border/70 shadow-sm bg-card">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                  <TableHead className="font-semibold text-slate-700 pl-6 py-4">{t("nama_properti")}</TableHead>
                  <TableHead className="font-semibold text-slate-700 py-4">{t("pemilik_header")}</TableHead>
                  <TableHead className="font-semibold text-slate-700 py-4">{t("harga")}</TableHead>
                  <TableHead className="font-semibold text-slate-700 py-4 text-right pr-6">{t("aksi")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {properties.map((property) => (
                  <TableRow key={property.id} className="hover:bg-slate-50/80 transition-colors">
                    <TableCell className="font-medium text-slate-900 pl-6 py-4">
                      {property.title}
                    </TableCell>
                    <TableCell className="text-slate-600 py-4">
                      {property.owner?.name || "Unknown"}
                    </TableCell>
                    <TableCell className="text-slate-900 font-medium py-4">
                      {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(property.price))}
                    </TableCell>
                    <TableCell className="py-4 pr-6">
                      <div className="flex items-center justify-end gap-4">
                        <Badge variant={property.status === "PENDING_REVIEW" ? "pending" : "outline"} className="px-2.5 py-1 text-xs font-medium">
                          {property.status}
                        </Badge>
                        {property.status === "PENDING_REVIEW" && (
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              className="bg-primary hover:bg-primary text-white rounded-lg min-h-[40px] px-3 gap-2 shadow-sm transition-all"
                              onClick={() => handleApprove(property.id)}
                              disabled={loadingId === property.id}
                            >
                              <Check className="w-4 h-4"  />
                              {loadingId === property.id ? "..." : "Approve"}
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 hover:text-red-700 rounded-lg min-h-[40px] px-3 gap-2 transition-all"
                              onClick={() => handleReject(property.id)}
                              disabled={loadingId === property.id}
                            >
                              <X className="w-4 h-4"  />
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {properties.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                      {t("tidak_ada_properti")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
