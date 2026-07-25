"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal, Lock, Eye, EyeOff, Save } from "lucide-react";
import { useState } from "react";

const mockEnvVars = [
  { key: "NEXT_PUBLIC_API_URL", value: "https://api.homelink.app/v1", isSecret: false, category: "API" },
  { key: "DATABASE_URL", value: "postgres://admin:********@db.homelink.internal:5432/main", isSecret: true, category: "Database" },
  { key: "REDIS_URL", value: "redis://cache.homelink.internal:6379", isSecret: true, category: "Database" },
  { key: "STRIPE_SECRET_KEY", value: "sk_test_************************", isSecret: true, category: "Integrations" },
  { key: "AWS_S3_BUCKET", value: "homelink-production-assets", isSecret: false, category: "Storage" },
  { key: "NODE_ENV", value: "production", isSecret: false, category: "System" },
];

export default function EnvironmentConfigPage() {
  const [showSecrets, setShowSecrets] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Environment Configuration</h1>
          <p className="text-sm text-gray-500 mt-1">Manage system-level environment variables securely.</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowSecrets(!showSecrets)}
          >
            {showSecrets ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
            {showSecrets ? "Hide Secrets" : "Reveal Secrets"}
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
        <Lock className="h-5 w-5 text-amber-600 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-amber-900">Restricted Access</h3>
          <p className="text-xs text-amber-700 mt-1">
            Modifying environment variables requires elevated 2FA authorization. Changes may cause application restarts and temporary downtime.
          </p>
        </div>
      </div>

      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-gray-500" />
            Production Variables
          </CardTitle>
          <CardDescription>
            Variables loaded in the current runtime environment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {mockEnvVars.map((env) => (
            <div key={env.key} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-4 border border-gray-100 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors">
              <div className="col-span-1">
                <Label className="font-mono text-sm font-semibold text-gray-700">{env.key}</Label>
                <div className="mt-1">
                  <Badge variant="outline" className="text-[10px] uppercase bg-white">
                    {env.category}
                  </Badge>
                </div>
              </div>
              <div className="col-span-1 md:col-span-3 relative">
                <Input
                  type={env.isSecret && !showSecrets ? "password" : "text"}
                  defaultValue={env.value}
                  readOnly
                  className="font-mono text-sm bg-white border-gray-200 text-gray-600 focus-visible:ring-0 cursor-default"
                />
                {env.isSecret && (
                  <div className="absolute right-3 top-2.5">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
