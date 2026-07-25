import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, CircleDollarSign, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import { getCommissions } from '@/actions/internal';
import { format } from 'date-fns';

function formatRupiah(amount: number | string) {
  return `Rp ${Number(amount).toLocaleString("id-ID")}`;
}

export default async function CommissionPage() {
  const commissions = await getCommissions();

  const totalCommissions = commissions
    .filter(c => c.status === 'PAID')
    .reduce((sum, c) => sum + Number(c.amount), 0);

  const pendingCommissions = commissions
    .filter(c => c.status === 'PENDING')
    .reduce((sum, c) => sum + Number(c.amount), 0);

  const pendingCount = commissions.filter(c => c.status === 'PENDING').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Commission Overview</h1>
          <p className="text-gray-500">Track internal commissions and transaction splits.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Commissions (YTD)</p>
                <h3 className="text-2xl font-bold mt-1">{formatRupiah(totalCommissions)}</h3>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">12.5%</span>
              <span className="text-gray-500 ml-2">vs last year</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Payouts</p>
                <h3 className="text-2xl font-bold mt-1">{formatRupiah(pendingCommissions)}</h3>
              </div>
              <div className="p-2 bg-yellow-50 rounded-lg">
                <CircleDollarSign className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-500">{pendingCount} pending transactions</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Average Split</p>
                <h3 className="text-2xl font-bold mt-1">4.2%</h3>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
              <span className="text-red-500 font-medium">0.3%</span>
              <span className="text-gray-500 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle>Recent Transactions</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-9 w-[250px] h-9"
                />
              </div>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 border-b">
                <tr>
                  <th className="px-4 py-3 font-medium">Transaction ID</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Agent</th>
                  <th className="px-4 py-3 font-medium">Property</th>
                  <th className="px-4 py-3 font-medium">Commission</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {commissions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-blue-600">{trx.id.substring(0, 8)}</td>
                    <td className="px-4 py-3 text-gray-500">{format(new Date(trx.createdAt), 'MMM dd, yyyy')}</td>
                    <td className="px-4 py-3 font-medium">{trx.agent?.name}</td>
                    <td className="px-4 py-3 text-gray-600 truncate max-w-[200px]">{trx.booking?.property?.title || 'Unknown Property'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{formatRupiah(Number(trx.amount))}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={
                        trx.status === 'PAID' ? 'border-green-200 text-green-700 bg-green-50' :
                        'border-yellow-200 text-yellow-700 bg-yellow-50'
                      }>
                        {trx.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
                {commissions.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
