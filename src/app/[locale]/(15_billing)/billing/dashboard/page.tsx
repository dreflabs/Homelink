import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, FileCheck, ShieldCheck, Clock } from "lucide-react";

export default function BillingDashboardPage() {
  const stats = [
    { title: "Total Revenue", value: "Rp 125.500.000", icon: Wallet, trend: "+15%", color: "text-green-500" },
    { title: "Invoices Sent", value: "342", icon: FileCheck, trend: "+5%", color: "text-blue-500" },
    { title: "Paid Invoices", value: "298", icon: ShieldCheck, trend: "+8%", color: "text-emerald-500" },
    { title: "Pending Invoices", value: "44", icon: Clock, trend: "-2%", color: "text-yellow-500" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing Dashboard</h1>
          <p className="text-muted-foreground mt-2">Overview of financial and billing metrics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className={`text-xs mt-1 ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue trends</CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center bg-muted/20 rounded-md border border-dashed">
            <div className="flex flex-col items-center text-muted-foreground">
              <Wallet className="h-10 w-10 mb-2 opacity-50" />
              <span>Revenue Chart Placeholder</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Invoice Status</CardTitle>
            <CardDescription>Paid vs Pending invoices</CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center bg-muted/20 rounded-md border border-dashed">
            <div className="flex flex-col items-center text-muted-foreground">
              <FileCheck className="h-10 w-10 mb-2 opacity-50" />
              <span>Invoice Breakdown Placeholder</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
