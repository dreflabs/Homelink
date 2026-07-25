"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ToggleLeft, Plus, Zap } from "lucide-react";
import { toggleFeatureFlag } from "@/actions/superAdmin";
import { useState, useTransition } from "react";

const initialFlags = [
  { id: "ff_1", key: "ENABLE_AI_ASSISTANT", name: "AI Assistant", description: "Enable the generative AI assistant across the platform.", environment: "Production", status: true, rollout: "100%" },
  { id: "ff_2", key: "BETA_NEW_DASHBOARD", name: "New Dashboard UI", description: "Test the new dashboard layout with beta users.", environment: "Production", status: false, rollout: "20%" },
  { id: "ff_3", key: "ENABLE_ADVANCED_ANALYTICS", name: "Advanced Analytics", description: "Unlock predictive analytics modules for Enterprise plans.", environment: "Production", status: true, rollout: "100%" },
  { id: "ff_4", key: "MAINTENANCE_MODE", name: "Maintenance Mode", description: "Force all non-admin users to see the maintenance screen.", environment: "All", status: false, rollout: "0%" },
  { id: "ff_5", key: "API_V2_MIGRATION", name: "API v2 Routing", description: "Route traffic to the new API v2 endpoints.", environment: "Staging", status: true, rollout: "100%" },
];

export default function FeatureFlagsPage() {
  const [flags, setFlags] = useState(initialFlags);
  const [isPending, startTransition] = useTransition();

  const handleToggle = (id: string, currentValue: boolean) => {
    setFlags((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: !currentValue } : f))
    );

    startTransition(() => {
      toggleFeatureFlag(id, !currentValue).catch(() => {
        setFlags((prev) =>
          prev.map((f) => (f.id === id ? { ...f, status: currentValue } : f))
        );
      });
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Feature Flags</h1>
          <p className="text-sm text-gray-500 mt-1">Manage gradual rollouts, A/B tests, and runtime configuration.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="mr-2 h-4 w-4" />
          Create Flag
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flags.map((flag) => (
          <Card key={flag.id} className="border-gray-200 shadow-sm flex flex-col hover:border-indigo-200 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-base flex items-center gap-2">
                    {flag.name}
                    {flag.status && <Zap className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />}
                  </CardTitle>
                  <CardDescription className="text-xs font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded inline-block">
                    {flag.key}
                  </CardDescription>
                </div>
                <Switch
                  checked={flag.status}
                  disabled={isPending}
                  onCheckedChange={() => handleToggle(flag.id, flag.status)}
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <p className="text-sm text-gray-600 mb-4 flex-1">{flag.description}</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-500">Env:</span>
                  <Badge variant="outline" className="text-xs bg-gray-50">{flag.environment}</Badge>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-500">Rollout:</span>
                  <span className="font-medium text-gray-900">{flag.rollout}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
