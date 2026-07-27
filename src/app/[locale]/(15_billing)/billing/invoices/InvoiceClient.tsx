"use client";


import { useTranslations } from 'next-intl';
import React, { useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Loader2 } from "lucide-react";
import { markInvoiceAsPaid } from "@/actions/billing";
import { toast } from "sonner";
import { TableEmptyState } from "@/components/shared/TableEmptyState";

type Invoice = {
  id: string;
  userId: string;
  amount: any;
  status: string;
  createdAt: Date;
  paidAt: Date | null;
  user?: { name: string; email: string } | null;
};

export default function InvoiceClient({ initialInvoices }: { initialInvoices: Invoice[] }) {
  const tTable = useTranslations('Common.table');
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [isPending, startTransition] = useTransition();

  const handleMarkAsPaid = async (id: string) => {
    startTransition(async () => {
      try {
        const res = await markInvoiceAsPaid(id);
        if (res.success) {
          setInvoices(invoices.map(inv => inv.id === id ? { ...inv, status: "PAID", paidAt: new Date() } : inv));
          toast.success("Faktur berhasil ditandai lunas!");
        } else {
          toast.error("Gagal memperbarui status faktur. Silakan coba kembali.");
        }
      } catch (error) {
        toast.error("Gagal memperbarui status faktur. Silakan coba kembali.");
      }
    });
  };

  const formatCurrency = (amount: any) => {
    // Assuming amount could be Decimal, convert to number or string
    const val = typeof amount === 'object' && amount !== null && 'toNumber' in amount 
      ? amount.toNumber() 
      : Number(amount);
      
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val || 0);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground mt-2">Manage customer invoices and update payment status manually.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Invoices</CardTitle>
          <CardDescription>A list of pending and paid invoices.</CardDescription>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <TableEmptyState title="Belum Ada Faktur" description="Belum ada catatan tagihan atau faktur pembayaran aktif di akun Anda." />
          ) : (
            <div className="w-full overflow-x-auto pb-2 rounded-xl border border-border/60 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date Issued</TableHead>
                    <TableHead>{tTable('status')}</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-mono text-xs">
                        {invoice.id.split('-')[0].toUpperCase()}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{invoice.user?.name || 'Unknown User'}</div>
                        <div className="text-sm text-muted-foreground">{invoice.user?.email || ''}</div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(invoice.amount)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(invoice.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {invoice.status === 'PAID' ? (
                          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200">
                            Paid
                          </Badge>
                        ) : invoice.status === 'PENDING' ? (
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">
                            Pending
                          </Badge>
                        ) : (
                          <Badge variant="destructive">{invoice.status}</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {invoice.status === 'PENDING' && (
                          <Button 
                            size="sm" 
                            onClick={() => handleMarkAsPaid(invoice.id)}
                            disabled={isPending}
                          >
                            {isPending ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <ShieldCheck className="mr-2 h-5 w-5" />
                            )}
                            Mark Paid
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
