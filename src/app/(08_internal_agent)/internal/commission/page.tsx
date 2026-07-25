import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, CircleDollarSign, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

const mockCommissions = [
  {
    id: "TRX-8271",
    date: "Oct 24, 2023",
    agent: "Diana M.",
    property: "Modern Loft in Sudirman",
    type: "Rent",
    amount: "Rp 150.000.000",
    commission: "Rp 7.500.000",
    status: "paid"
  },
  {
    id: "TRX-8270",
    date: "Oct 23, 2023",
    agent: "Reza F.",
    property: "Villa Kemang",
    type: "Sale",
    amount: "Rp 4.500.000.000",
    commission: "Rp 90.000.000",
    status: "pending"
  },
  {
    id: "TRX-8269",
    date: "Oct 22, 2023",
    agent: "Diana M.",
    property: "Studio Apartment Kuningan",
    type: "Rent",
    amount: "Rp 85.000.000",
    commission: "Rp 4.250.000",
    status: "paid"
  }
];

export default function CommissionPage() {
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
                <h3 className="text-2xl font-bold mt-1">Rp 1.25B</h3>
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
                <h3 className="text-2xl font-bold mt-1">Rp 245M</h3>
              </div>
              <div className="p-2 bg-yellow-50 rounded-lg">
                <CircleDollarSign className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-500">14 pending transactions</span>
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
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Commission</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {mockCommissions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-blue-600">{trx.id}</td>
                    <td className="px-4 py-3 text-gray-500">{trx.date}</td>
                    <td className="px-4 py-3 font-medium">{trx.agent}</td>
                    <td className="px-4 py-3 text-gray-600 truncate max-w-[200px]">{trx.property}</td>
                    <td className="px-4 py-3 text-gray-500">{trx.type}</td>
                    <td className="px-4 py-3 font-medium">{trx.amount}</td>
                    <td className="px-4 py-3 font-medium text-green-600">{trx.commission}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={
                        trx.status === 'paid' ? 'border-green-200 text-green-700 bg-green-50' :
                        'border-yellow-200 text-yellow-700 bg-yellow-50'
                      }>
                        {trx.status.toUpperCase()}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
