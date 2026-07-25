"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, CheckCircle2, ChevronDown, MoreHorizontal, MoreVertical, Plus, Search, Shield, Users } from "lucide-react";
import { toggleTenantStatus } from "@/actions/superAdmin";
import { useState, useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const initialTenants = [
  { id: "t_1", name: "Acme Corp", plan: "Enterprise", users: 1250, status: "Active", dbSize: "45.2 GB", created: "2023-01-15" },
  { id: "t_2", name: "GlobalTech", plan: "Professional", users: 450, status: "Active", dbSize: "12.8 GB", created: "2023-03-22" },
  { id: "t_3", name: "StartUp Inc", plan: "Startup", users: 45, status: "Inactive", dbSize: "2.1 GB", created: "2023-06-10" },
  { id: "t_4", name: "Mega Holdings", plan: "Enterprise", users: 3200, status: "Active", dbSize: "115.5 GB", created: "2022-11-05" },
  { id: "t_5", name: "Quantum LLC", plan: "Professional", users: 120, status: "Active", dbSize: "5.4 GB", created: "2024-02-14" },
];

export default function TenantManagementPage() {
  const [tenants, setTenants] = useState(initialTenants);
  const [isPending, startTransition] = useTransition();

  const handleToggle = (id: string, currentStatus: string) => {
    const isActive = currentStatus === "Active";
    const newStatus = isActive ? "Inactive" : "Active";
    
    // Optimistic update
    setTenants((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );

    startTransition(() => {
      toggleTenantStatus(id, !isActive).catch(() => {
        // Revert on failure
        setTenants((prev) =>
          prev.map((t) => (t.id === id ? { ...t, status: currentStatus } : t))
        );
      });
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Tenant Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage enterprise tenants, their subscriptions, and system resources.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="mr-2 h-4 w-4" />
          Add New Tenant
        </Button>
      </div>

      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Building2 className="h-5 w-5 text-gray-400" />
              <span>{tenants.length} total tenants</span>
            </div>
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search tenants..."
                className="pl-9 bg-gray-50 border-gray-200"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-semibold text-gray-600">Tenant Name</TableHead>
                  <TableHead className="font-semibold text-gray-600">Plan</TableHead>
                  <TableHead className="font-semibold text-gray-600">Users</TableHead>
                  <TableHead className="font-semibold text-gray-600">DB Size</TableHead>
                  <TableHead className="font-semibold text-gray-600">Created</TableHead>
                  <TableHead className="font-semibold text-gray-600">Status</TableHead>
                  <TableHead className="text-right font-semibold text-gray-600">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tenants.map((tenant) => (
                  <TableRow key={tenant.id} className="hover:bg-gray-50/50">
                    <TableCell className="font-medium text-gray-900">{tenant.name}</TableCell>
                    <TableCell>
                      <Badge variant={tenant.plan === "Enterprise" ? "default" : tenant.plan === "Professional" ? "secondary" : "outline"}
                        className={tenant.plan === "Enterprise" ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-indigo-200" : ""}
                      >
                        {tenant.plan}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">{tenant.users.toLocaleString()}</TableCell>
                    <TableCell className="text-gray-600">{tenant.dbSize}</TableCell>
                    <TableCell className="text-gray-600">{tenant.created}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={tenant.status === "Active"}
                          onCheckedChange={() => handleToggle(tenant.id, tenant.status)}
                          disabled={isPending}
                        />
                        <span className={`text-sm ${tenant.status === "Active" ? "text-green-600 font-medium" : "text-gray-400"}`}>
                          {tenant.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                            <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                              <MoreHorizontal className="h-4 w-4" />
                            </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Dashboard</DropdownMenuItem>
                          <DropdownMenuItem>Edit Details</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete Tenant</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
