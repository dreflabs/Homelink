"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Blocks, ExternalLink, Settings, ShieldCheck, ShieldAlert } from "lucide-react";
import { toggleIntegration } from "@/actions/super-admin";
import { useState, useTransition } from "react";

const initialIntegrations = [
  { 
    id: "int_stripe", 
    name: "Stripe", 
    category: "Payments", 
    description: "Process credit cards and manage billing subscriptions across tenants.", 
    status: true, 
    health: "Healthy",
    lastSync: "2 mins ago" 
  },
  { 
    id: "int_openai", 
    name: "OpenAI LLM", 
    category: "AI / ML", 
    description: "Power the generative AI features for property descriptions and smart replies.", 
    status: true, 
    health: "Healthy",
    lastSync: "Just now" 
  },
  { 
    id: "int_sendgrid", 
    name: "SendGrid", 
    category: "Communications", 
    description: "Transactional email delivery for notifications and alerts.", 
    status: true, 
    health: "Warning",
    lastSync: "15 mins ago" 
  },
  { 
    id: "int_twilio", 
    name: "Twilio", 
    category: "Communications", 
    description: "SMS delivery for 2FA and instant tenant notifications.", 
    status: false, 
    health: "Offline",
    lastSync: "N/A" 
  },
  { 
    id: "int_cloudflare", 
    name: "Cloudflare CDN", 
    category: "Infrastructure", 
    description: "Global asset caching, DDoS protection and edge computing.", 
    status: true, 
    health: "Healthy",
    lastSync: "5 mins ago" 
  },
];

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [isPending, startTransition] = useTransition();

  const handleToggle = (id: string, currentValue: boolean) => {
    setIntegrations((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: !currentValue } : i))
    );

    startTransition(() => {
      toggleIntegration(id, !currentValue).catch(() => {
        setIntegrations((prev) =>
          prev.map((i) => (i.id === id ? { ...i, status: currentValue } : i))
        );
      });
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Third-Party Integrations</h1>
          <p className="text-sm text-gray-500 mt-1">Manage external services, API connections, and their health status.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id} className={`border-gray-200 shadow-sm transition-all ${integration.status ? 'border-l-4 border-l-indigo-500' : 'opacity-75'}`}>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
                    <Blocks className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-[10px] uppercase font-semibold">
                        {integration.category}
                      </Badge>
                      {integration.status && (
                        <span className="flex items-center text-[10px] text-gray-500">
                          {integration.health === "Healthy" ? (
                            <ShieldCheck className="h-3 w-3  mr-1" />
                          ) : integration.health === "Warning" ? (
                            <ShieldAlert className="h-3 w-3  mr-1" />
                          ) : (
                            <ShieldAlert className="h-3 w-3  mr-1" />
                          )}
                          {integration.health}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <Switch
                  checked={integration.status}
                  disabled={isPending}
                  onCheckedChange={() => handleToggle(integration.id, integration.status)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                {integration.description}
              </p>
            </CardContent>
            <CardFooter className="bg-gray-50/50 border-t border-gray-100 py-3 flex justify-between items-center">
              <div className="text-xs text-gray-500">
                Last Sync: {integration.lastSync}
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="h-8 text-xs font-medium" disabled={!integration.status}>
                  <Settings className="mr-2 h-3.5 w-3.5" />
                  Config
                </Button>
                <Button variant="ghost" size="sm" className="h-8 text-xs font-medium text-indigo-600 hover:text-indigo-700" disabled={!integration.status}>
                  <ExternalLink className="mr-2 h-3.5 w-3.5" />
                  Dashboard
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
