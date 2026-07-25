"use client";

import React, { use } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Phone, Clock, CheckCircle2, MoreHorizontal, Users, AlertCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock Data
const MOCK_LEADS = [
  {
    id: "lead-1",
    namaProspek: "Budi Santoso",
    email: "budi.s@example.com",
    interaksi: "Tanya Harga via Chat",
    statusFollowUp: "Belum Dihubungi",
  },
  {
    id: "lead-2",
    namaProspek: "Siti Rahmawati",
    email: "siti.rahma@example.com",
    interaksi: "Jadwal Visit (Request)",
    statusFollowUp: "Dalam Proses",
  },
  {
    id: "lead-3",
    namaProspek: "Ahmad Hidayat",
    email: "ahmad.h@example.com",
    interaksi: "Menyimpan Properti",
    statusFollowUp: "Belum Dihubungi",
  },
  {
    id: "lead-4",
    namaProspek: "Jessica Wong",
    email: "jess.wong@example.com",
    interaksi: "Tanya KPR",
    statusFollowUp: "Sudah Dihubungi",
  },
  {
    id: "lead-5",
    namaProspek: "Reza Mahendra",
    email: "reza.m@example.com",
    interaksi: "Tanya Legalitas",
    statusFollowUp: "Sudah Dihubungi",
  },
];

export default function OwnerLeadsPage(props: {
  params: Promise<{ propertyId: string }> | { propertyId: string };
}) {
  const params = props.params as any;
  const propertyId = params?.propertyId || "ID_PROPERTY";

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Belum Dihubungi":
        return (
          <Badge variant="secondary" className="bg-rose-50 text-rose-600 hover:bg-rose-100 px-2.5 py-0.5 rounded-full font-medium border-0 gap-1.5 flex items-center w-fit shadow-none">
            <AlertCircle className="w-3 h-3" />
            {status}
          </Badge>
        );
      case "Dalam Proses":
        return (
          <Badge variant="secondary" className="bg-amber-50 text-amber-600 hover:bg-amber-100 px-2.5 py-0.5 rounded-full font-medium border-0 gap-1.5 flex items-center w-fit shadow-none">
            <Clock className="w-3 h-3" />
            {status}
          </Badge>
        );
      case "Sudah Dihubungi":
        return (
          <Badge variant="default" className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 px-2.5 py-0.5 rounded-full font-medium border-0 gap-1.5 flex items-center w-fit shadow-none">
            <CheckCircle2 className="w-3 h-3" />
            {status}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Manajemen Prospek / Pembeli</h1>
        <p className="text-slate-500 text-sm md:text-base">
          Kelola daftar calon pembeli, pantau interaksi, dan lacak status follow-up properti Anda.
        </p>
      </div>

      {/* Main Table Card */}
      <Card className="border-slate-200/60 shadow-sm overflow-hidden bg-white/50 backdrop-blur-xl rounded-2xl">
        <CardHeader className="border-b border-slate-100 bg-slate-50/30 pb-5">
          <CardTitle className="text-lg font-semibold text-slate-800">Daftar Prospek Terbaru</CardTitle>
          <CardDescription className="text-slate-500">
            Menampilkan prospek untuk ID Properti: <span className="font-mono text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded text-xs ml-1">{propertyId}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="hover:bg-transparent border-slate-100/60">
                  <TableHead className="font-medium text-slate-500 h-12 pl-6">Nama Prospek</TableHead>
                  <TableHead className="font-medium text-slate-500 h-12">Interaksi Terakhir</TableHead>
                  <TableHead className="font-medium text-slate-500 h-12">Status Follow-up</TableHead>
                  <TableHead className="font-medium text-slate-500 h-12 text-right pr-6">Tindakan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_LEADS.map((lead) => (
                  <TableRow key={lead.id} className="border-slate-100/60 hover:bg-slate-50/50 transition-colors group">
                    <TableCell className="py-4 pl-6">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800">{lead.namaProspek}</span>
                        <span className="text-xs text-slate-400 mt-0.5">{lead.email}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2 text-slate-700 text-sm">
                        <MessageCircle className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">{lead.interaksi}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      {getStatusBadge(lead.statusFollowUp)}
                    </TableCell>
                    <TableCell className="text-right py-4 pr-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-200/50 text-slate-400 group-hover:text-slate-700 h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                            <span className="sr-only">Buka menu tindakan</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Tindakan</DropdownMenuLabel>
                          <DropdownMenuItem className="text-sm gap-2 cursor-pointer">
                            <Mail className="w-4 h-4" />
                            Kirim Email
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-sm gap-2 cursor-pointer">
                            <Phone className="w-4 h-4" />
                            Hubungi via Telepon
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-sm cursor-pointer">Tandai Sedang Diproses</DropdownMenuItem>
                          <DropdownMenuItem className="text-sm cursor-pointer">Tandai Selesai (Dihubungi)</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {MOCK_LEADS.length === 0 && (
            <div className="text-center py-16 px-4">
              <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <Users className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">Belum ada leads</h3>
              <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                Daftar prospek akan muncul di sini saat ada pembeli yang berinteraksi.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
