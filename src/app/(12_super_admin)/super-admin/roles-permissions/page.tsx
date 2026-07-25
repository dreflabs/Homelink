"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Plus, Info } from "lucide-react";
import { updatePermission } from "@/actions/superAdmin";
import { useState, useTransition } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const roles = ["Super Admin", "Tenant Admin", "Manager", "User", "Guest"];
const initialPermissions = [
  { id: "p_1", module: "Users", action: "View Users", description: "Can view user list", roles: { "Super Admin": true, "Tenant Admin": true, "Manager": true, "User": true, "Guest": false } },
  { id: "p_2", module: "Users", action: "Create Users", description: "Can create new users", roles: { "Super Admin": true, "Tenant Admin": true, "Manager": false, "User": false, "Guest": false } },
  { id: "p_3", module: "Users", action: "Delete Users", description: "Can delete existing users", roles: { "Super Admin": true, "Tenant Admin": false, "Manager": false, "User": false, "Guest": false } },
  { id: "p_4", module: "Billing", action: "View Invoices", description: "Can view billing invoices", roles: { "Super Admin": true, "Tenant Admin": true, "Manager": false, "User": false, "Guest": false } },
  { id: "p_5", module: "Billing", action: "Manage Payment", description: "Can update payment methods", roles: { "Super Admin": true, "Tenant Admin": true, "Manager": false, "User": false, "Guest": false } },
  { id: "p_6", module: "Settings", action: "System Config", description: "Can modify system configs", roles: { "Super Admin": true, "Tenant Admin": false, "Manager": false, "User": false, "Guest": false } },
];

export default function RolesPermissionsPage() {
  const [permissions, setPermissions] = useState(initialPermissions);
  const [isPending, startTransition] = useTransition();

  const handleToggle = (permId: string, role: string, currentValue: boolean) => {
    // Optimistic update
    setPermissions((prev) =>
      prev.map((p) => {
        if (p.id === permId) {
          return {
            ...p,
            roles: { ...p.roles, [role]: !currentValue },
          };
        }
        return p;
      })
    );

    startTransition(() => {
      updatePermission(role, permId, !currentValue).catch(() => {
        // Revert on failure
        setPermissions((prev) =>
          prev.map((p) => {
            if (p.id === permId) {
              return {
                ...p,
                roles: { ...p.roles, [role]: currentValue },
              };
            }
            return p;
          })
        );
      });
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Roles & Permissions</h1>
          <p className="text-sm text-gray-500 mt-1">Configure Role-Based Access Control (RBAC) across all modules.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="mr-2 h-4 w-4" />
          Create Custom Role
        </Button>
      </div>

      <Tabs defaultValue="matrix" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="matrix">Permission Matrix</TabsTrigger>
          <TabsTrigger value="roles">Roles List</TabsTrigger>
        </TabsList>
        
        <TabsContent value="matrix">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ShieldCheck className="h-5 w-5 text-indigo-500" />
                <span className="font-medium">Access Matrix</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-gray-200 overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="font-semibold text-gray-600 min-w-[200px]">Permission</TableHead>
                      {roles.map(role => (
                        <TableHead key={role} className="font-semibold text-gray-600 text-center min-w-[120px]">
                          {role}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {permissions.map((perm) => (
                      <TableRow key={perm.id} className="hover:bg-gray-50/50">
                        <TableCell>
                          <div className="font-medium text-gray-900">{perm.action}</div>
                          <div className="text-xs text-gray-500">{perm.module} • {perm.description}</div>
                        </TableCell>
                        {roles.map(role => {
                          const isChecked = perm.roles[role as keyof typeof perm.roles];
                          const isDisabled = role === "Super Admin"; // Cannot toggle Super Admin
                          return (
                            <TableCell key={`${perm.id}-${role}`} className="text-center">
                              <Switch
                                checked={isChecked}
                                disabled={isDisabled || isPending}
                                onCheckedChange={() => handleToggle(perm.id, role, isChecked)}
                              />
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="roles">
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <Info className="h-12 w-12 text-gray-300 mb-4" />
                <p>Role management list view implementation goes here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
