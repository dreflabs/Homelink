import { getTranslations } from 'next-intl/server';
import prisma from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";



import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function PaymentHistoryPage() {
  const tTable = await getTranslations('Common.table');

  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const invoices = await prisma.invoice.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 10,
    include: {
      subscription: true,
      user: true,
    }
  });

  return (
    <div className="container mx-auto py-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Payment History</h1>
        <p className="text-muted-foreground">
          View your past transactions and invoices.
        </p>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>{tTable('date')}</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>{tTable('status')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium" title={invoice.id}>
                    {invoice.id.split('-')[0].toUpperCase()}
                  </TableCell>
                  <TableCell>
                    {new Date(invoice.createdAt).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0
                    }).format(Number(invoice.amount))}
                  </TableCell>
                  <TableCell>
                    {invoice.subscription?.plan || "General"}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        invoice.status === "PAID" 
                          ? "default" 
                          : invoice.status === "PENDING" 
                            ? "secondary" 
                            : "destructive"
                      }
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
