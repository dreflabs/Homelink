"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Server, Database, CloudRain, Cpu, RefreshCw, ShieldAlert, ShieldCheck } from "lucide-react";
import { restartService } from "@/actions/super-admin";
import { useState, useTransition } from "react";

export default function SystemHealthPage() {
  const [isPending, startTransition] = useTransition();
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
  const [services, setServices] = useState([
    { name: "Main API Server", status: "Healthy", uptime: "99.99%", color: "bg-green-500" },
    { name: "Authentication Service", status: "Healthy", uptime: "100%", color: "bg-green-500" },
    { name: "Payment Worker", status: "Warning", uptime: "98.5%", color: "bg-yellow-500", note: "High latency detected" },
    { name: "Email Queue", status: "Healthy", uptime: "99.9%", color: "bg-green-500" },
    { name: "Search Indexer", status: "Healthy", uptime: "99.2%", color: "bg-green-500" },
  ]);

  const hasIssues = services.some(s => s.status !== "Healthy");

  const handleRefresh = () => {
    startTransition(() => {
      setTimeout(() => setLastUpdated(new Date().toLocaleTimeString()), 500);
    });
  };

  const handleRestart = (serviceName: string) => {
    startTransition(() => {
      setServices(prev => prev.map(s => s.name === serviceName ? { ...s, status: "Healthy", color: "bg-green-500", note: undefined } : s));
      restartService(serviceName);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">System Health</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time monitoring of application infrastructure and services.</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-500">Last updated: {lastUpdated}</span>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isPending}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isPending ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Global Status Banner */}
      {!hasIssues ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 " />
          <div>
            <h3 className="text-sm font-semibold text-green-900">All Systems Operational</h3>
            <p className="text-xs text-green-700">Service is running smoothly across all regions.</p>
          </div>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center gap-3">
          <ShieldAlert className="h-6 w-6 " />
          <div>
            <h3 className="text-sm font-semibold text-amber-900">Partial System Degradation</h3>
            <p className="text-xs text-amber-700">One or more background services require attention.</p>
          </div>
        </div>
      )}

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">42%</div>
            <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 w-[42%]" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Stable • 8 cores active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Memory</CardTitle>
            <Server className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">12.4 GB</div>
            <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500 w-[78%]" />
            </div>
            <p className="text-xs text-gray-500 mt-2">78% of 16 GB used</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Database Load</CardTitle>
            <Database className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">18%</div>
            <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-[18%]" />
            </div>
            <p className="text-xs text-gray-500 mt-2">924 QPS</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Queue</CardTitle>
            <Activity className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">1,204</div>
            <div className="mt-2 flex items-center text-xs text-green-600">
              <Activity className="h-3 w-3 mr-1" />
              Processing normal
            </div>
            <p className="text-xs text-gray-500 mt-2">Background jobs</p>
          </CardContent>
        </Card>
      </div>

      {/* Services Status Table */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Microservices Status</CardTitle>
          <CardDescription>Current status of individual internal services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.name} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                <div className="flex items-center gap-4">
                  <div className={`h-3 w-3 rounded-full ${service.color} animate-pulse shadow-[0_0_8px_rgba(0,0,0,0.1)]`} />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{service.name}</h4>
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                      Uptime: {service.uptime}
                      {service.note && (
                        <span className="text-red-500 flex items-center gap-1">
                          <ShieldAlert className="h-3 w-3" />
                          {service.note}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={() => handleRestart(service.name)}
                  disabled={isPending}
                >
                  Restart Service
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
