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
import { Wallet, ChartCandlestick, Clock, Calculator, ShieldCheck, Inbox } from "lucide-react";
import { FadeIn } from "@/components/shared/FadeIn";
import { EmptyState } from "@/components/shared/EmptyState";

import { getAgentCommissions } from "@/actions/partner";
import { getTranslations } from "next-intl/server";

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

export default async function AgentCommissionPage() {
  const t = await getTranslations('PartnerAgent');
  let bookings: Commission[] = [];
  
  try {
    bookings = await getAgentCommissions();
  } catch (error) {
    console.error(error);
  }

  const totalEarned = bookings
    .filter((b) => b.status === "PAID")
    .reduce((s, b) => s + b.commission, 0);
  const totalPending = bookings
    .filter((b) => b.status === "PENDING")
    .reduce((s, b) => s + b.commission, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <FadeIn delay={0.1}>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{t('Commission.title')}</h1>
          <p className="text-slate-500 mt-1 text-sm">
            {t('Commission.subtitle')}
          </p>
        </div>
      </FadeIn>

      {/* Summary Cards */}
      <FadeIn delay={0.2} className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="p-6 rounded-2xl shadow-sm border-slate-100 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-medium text-slate-100">{t('Commission.totalEarned')}</p>
          </div>
          <p className="text-2xl font-bold">{formatRupiah(totalEarned)}</p>
          <p className="text-blue-200 text-xs mt-1">{t('Commission.totalPaid')}</p>
        </Card>

        <Card className="p-6 rounded-2xl shadow-sm border-slate-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-50 rounded-xl">
              <Clock className="w-5 h-5 " />
            </div>
            <p className="text-sm font-medium text-slate-500">{t('Commission.pendingPayment')}</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{formatRupiah(totalPending)}</p>
          <p className="text-slate-400 text-xs mt-1">{t('Commission.totalPending')}</p>
        </Card>

        <Card className="p-6 rounded-2xl shadow-sm border-slate-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-emerald-50 rounded-xl">
              <ChartCandlestick className="w-5 h-5 " />
            </div>
            <p className="text-sm font-medium text-slate-500">{t('Commission.commissionRate')}</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">5%</p>
          <p className="text-slate-400 text-xs mt-1">{t('Commission.fromPropertyValue')}</p>
        </Card>
      </FadeIn>

      {/* Booking Table */}
      <FadeIn delay={0.3}>
        {bookings.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title={t('Commission.noCommissionTitle')}
            description={t('Commission.noCommissionDesc')}
          />
        ) : (
          <Card className="rounded-2xl shadow-sm border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-900">{t('Commission.historyPerBooking')}</h2>
            </div>
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="font-semibold text-slate-600">{t('Commission.property')}</TableHead>
                  <TableHead className="font-semibold text-slate-600">{t('Commission.client')}</TableHead>
                  <TableHead className="font-semibold text-slate-600">{t('Commission.propertyPrice')}</TableHead>
                  <TableHead className="font-semibold text-slate-600">{t('Commission.commission5')}</TableHead>
                  <TableHead className="font-semibold text-slate-600">{t('Commission.status')}</TableHead>
                  <TableHead className="font-semibold text-slate-600 text-right">{t('Commission.action')}</TableHead>
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
                        <ShieldCheck className="w-3 h-3" /> {t('Commission.paid')}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {t('Commission.waiting')}
                      </span>
                    )}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {booking.status === "PENDING" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs rounded-lg border-slate-200 text-primary hover:bg-slate-50"
                    >
                      <Calculator className="w-3.5 h-3.5 mr-1.5" />
                      {t('Commission.calculate')}
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
