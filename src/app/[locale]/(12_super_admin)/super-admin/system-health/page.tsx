import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, Server, Database, CloudRain, Cpu, ShieldAlert, ShieldCheck } from "lucide-react";
import { getSystemHealth } from "@/actions/super-admin";
import SystemHealthClient from "./SystemHealthClient";

export default async function SystemHealthPage() {
  const healthData = await getSystemHealth();
  const hasIssues = healthData.services.some(s => s.status !== "Healthy") || healthData.database.status !== "Healthy";

  return (
    <div className="space-y-6">
      <SystemHealthClient lastUpdated={new Date().toLocaleTimeString()} />

      {/* Global Status Banner */}
      {!hasIssues ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-green-600" />
          <div>
            <h3 className="text-sm font-semibold text-green-900">All Systems Operational</h3>
            <p className="text-xs text-green-700">Service is running smoothly across all regions.</p>
          </div>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center gap-3">
          <ShieldAlert className="h-6 w-6 text-amber-600" />
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
            <CardTitle className="text-sm font-medium text-gray-600">CPU Load Average</CardTitle>
            <Cpu className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{healthData.os.loadAvg}</div>
            <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500" style={{ width: `${Math.min(healthData.os.loadAvg * 10, 100)}%` }} />
            </div>
            <p className="text-xs text-gray-500 mt-2">{healthData.os.cores} cores active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Memory Usage</CardTitle>
            <Server className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{healthData.os.memUsagePercent}%</div>
            <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full ${healthData.os.memUsagePercent > 85 ? 'bg-red-500' : 'bg-yellow-500'}`} style={{ width: `${healthData.os.memUsagePercent}%` }} />
            </div>
            <p className="text-xs text-gray-500 mt-2">Total {healthData.os.memTotalGb} GB</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Database Latency</CardTitle>
            <Database className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{healthData.database.latencyMs} ms</div>
            <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full ${healthData.database.latencyMs > 100 ? 'bg-amber-500' : 'bg-green-500'}`} style={{ width: `${Math.min(healthData.database.latencyMs, 100)}%` }} />
            </div>
            <p className="text-xs text-gray-500 mt-2">Status: {healthData.database.status}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">System Uptime</CardTitle>
            <Activity className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{healthData.os.uptime}</div>
            <div className="mt-2 flex items-center text-xs text-green-600">
              <Activity className="h-3 w-3 mr-1" />
              Running smoothly
            </div>
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
            {healthData.services.map((service) => (
              <div key={service.name} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                <div className="flex items-center gap-4">
                  <div className={`h-3 w-3 rounded-full ${service.color} animate-pulse shadow-[0_0_8px_rgba(0,0,0,0.1)]`} />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{service.name}</h4>
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                      Uptime: {service.uptime}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
