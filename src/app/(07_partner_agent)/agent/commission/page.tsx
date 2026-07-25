"use client";

import { useState } from "react";
import { calculateCommission } from "@/actions/agent";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Wallet, TrendingUp, Clock, DollarSign, Calculator, CheckCircle2, Inbox } from "lucide-react";
import { toast } from "sonner";
import { FadeIn } from "@/components/shared/FadeIn";
import { EmptyState } from "@/components/shared/EmptyState";
import { TableSkeleton } from "@/components/shared/TableSkeleton";

import { useEffect } from "react";
import { getAgentCommissions } from "@/actions/partner";

type Commission = {
  id: string;
  property: string;
  client: string;
  price: number;
  commission: number;
  status: string;
};

function formatRupiah(amount: number) {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

export default function AgentCommissionPage() {
  const [bookings, setBookings] = useState<Commission[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAgentCommissions();
        setBookings(data);
      } catch (error) {
        toast.error("Gagal mengambil data komisi");
      } finally {
        setLoadingData(false);
      }
    }
    fetchData();
  }, []);

  const totalEarned = bookings
    .filter((b) => b.status === "PAID")
    .reduce((s, b) => s + b.commission, 0);
  const totalPending = bookings
    .filter((b) => b.status === "PENDING")
    .reduce((s, b) => s + b.commission, 0);

  async function handleCalculate(bookingId: string) {
    setLoading(bookingId);
    try {
      await calculateCommission(bookingId);
      toast.success("Komisi berhasil dihitung!");
      const data = await getAgentCommissions();
      setBookings(data);
    } catch {
      toast.error("Gagal menghitung komisi. Pastikan booking valid.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <FadeIn delay={0.1}>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Komisi Saya</h1>
          <p className="text-slate-500 mt-1 text-sm">
            Ringkasan pendapatan komisi dan riwayat transaksi Anda.
          </p>
        </div>
      </FadeIn>

      {/* Summary Cards */}
      <FadeIn delay={0.2} className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="p-6 rounded-2xl shadow-sm border-slate-100 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <p className="text-sm font-medium text-blue-100">Total Diterima</p>
          </div>
          <p className="text-2xl font-bold">{formatRupiah(totalEarned)}</p>
          <p className="text-blue-200 text-xs mt-1">Total lunas</p>
        </Card>

        <Card className="p-6 rounded-2xl shadow-sm border-slate-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-50 rounded-xl">
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-sm font-medium text-slate-500">Menunggu Pembayaran</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{formatRupiah(totalPending)}</p>
          <p className="text-slate-400 text-xs mt-1">Total pending</p>
        </Card>

        <Card className="p-6 rounded-2xl shadow-sm border-slate-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-emerald-50 rounded-xl">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-sm font-medium text-slate-500">Rate Komisi</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">5%</p>
          <p className="text-slate-400 text-xs mt-1">Dari nilai properti</p>
        </Card>
      </FadeIn>

      {/* Booking Table */}
      <FadeIn delay={0.3}>
        {loadingData ? (
          <TableSkeleton rows={4} columns={6} />
        ) : bookings.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="Belum Ada Komisi"
            description="Belum ada riwayat transaksi atau komisi yang tercatat untuk Anda saat ini."
          />
        ) : (
          <Card className="rounded-2xl shadow-sm border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-900">Riwayat Komisi per Booking</h2>
            </div>
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="font-semibold text-slate-600">Properti</TableHead>
                  <TableHead className="font-semibold text-slate-600">Klien</TableHead>
                  <TableHead className="font-semibold text-slate-600">Harga Properti</TableHead>
                  <TableHead className="font-semibold text-slate-600">Komisi (5%)</TableHead>
                  <TableHead className="font-semibold text-slate-600">Status</TableHead>
                  <TableHead className="font-semibold text-slate-600 text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id} className="hover:bg-slate-50 transition-colors">
                <TableCell className="font-medium text-slate-900 text-sm">
                  {booking.property}
                </TableCell>
                <TableCell className="text-sm text-slate-600">{booking.client}</TableCell>
                <TableCell className="text-sm text-slate-600">
                  {formatRupiah(booking.price)}
                </TableCell>
                <TableCell className="text-sm font-semibold text-slate-900">
                  {formatRupiah(booking.commission)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      booking.status === "PAID"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 text-xs"
                        : "bg-amber-50 text-amber-700 border-amber-200 text-xs"
                    }
                  >
                    {booking.status === "PAID" ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Dibayar
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Menunggu
                      </span>
                    )}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {booking.status === "PENDING" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs rounded-lg border-blue-200 text-blue-700 hover:bg-blue-50"
                      onClick={() => handleCalculate(booking.id)}
                      disabled={loading === booking.id}
                    >
                      <Calculator className="w-3.5 h-3.5 mr-1.5" />
                      {loading === booking.id ? "Menghitung..." : "Calculate"}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
        )}
      </FadeIn>
    </div>
  );
}
