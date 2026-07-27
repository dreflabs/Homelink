import { getTranslations } from 'next-intl/server';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getSubscriptions } from "@/actions/billing";
import { Check } from "lucide-react";
import { TableEmptyState } from "@/components/shared/TableEmptyState";

export default async function SubscriptionsPage() {
  const tTable = await getTranslations('Common.table');

  const subscriptions = await getSubscriptions();

  const packages = [
    {
      name: "Basic",
      price: "Rp 150.000",
      period: "/ month",
      features: ["Up to 5 Property Listings", "Basic Analytics", "Standard Support"],
      isPopular: false,
    },
    {
      name: "Pro",
      price: "Rp 450.000",
      period: "/ month",
      features: ["Unlimited Listings", "Advanced Analytics", "Priority Support", "Featured Placements"],
      isPopular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      features: ["Custom Solutions", "Dedicated Account Manager", "API Access", "White-label Options"],
      isPopular: false,
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscription Packages</h1>
          <p className="text-muted-foreground mt-2">Manage available plans and view active subscribers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {packages.map((pkg, idx) => (
            <Card key={idx} className={pkg.isPopular ? "border-primary shadow-md relative" : ""}>
              {pkg.isPopular && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
                  <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                <div className="mt-4 flex items-baseline justify-center gap-x-2">
                  <span className="text-4xl font-bold tracking-tight text-foreground">{pkg.price}</span>
                  <span className="text-sm font-semibold leading-6 text-muted-foreground">{pkg.period}</span>
                </div>
              </CardHeader>
              <CardContent className="mt-6">
                <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex gap-x-3">
                      <Check className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={pkg.isPopular ? "default" : "outline"}>
                  Edit Plan
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Active Subscribers</h2>
        <Card>
          <CardHeader>
            <CardTitle>Customer Subscriptions</CardTitle>
            <CardDescription>A list of all users currently subscribed to a plan.</CardDescription>
          </CardHeader>
          <CardContent>
            {subscriptions.length === 0 ? (
              <TableEmptyState title="Daftar Langganan Kosong" description="Belum ada riwayat langganan yang terekam di sistem." />
            ) : (
              <div className="w-full overflow-x-auto pb-2 rounded-xl border border-border/60 shadow-sm bg-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{tTable('user')}</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>{tTable('status')}</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscriptions.map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell>
                          <div className="font-medium">{sub.user?.name || 'Unknown User'}</div>
                          <div className="text-sm text-muted-foreground">{sub.user?.email || ''}</div>
                        </TableCell>
                        <TableCell className="font-semibold">{sub.plan}</TableCell>
                        <TableCell>
                          {sub.status === 'ACTIVE' ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                              Active
                            </Badge>
                          ) : sub.status === 'CANCELLED' ? (
                            <Badge variant="destructive">Cancelled</Badge>
                          ) : (
                            <Badge variant="secondary">{sub.status}</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(sub.startDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {sub.endDate ? new Date(sub.endDate).toLocaleDateString() : 'N/A'}
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
    </div>
  );
}
