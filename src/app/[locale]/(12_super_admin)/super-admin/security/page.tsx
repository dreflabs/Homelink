import { getSecurityLogs } from "@/actions/super-admin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, ShieldAlert, KeyRound, UserCheck } from "lucide-react";

export default async function SecurityPage() {
  const security = await getSecurityLogs();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Security & Access Audit</h1>
          <p className="text-sm text-gray-500 mt-1">Review authentication security, active sessions, failed logins, and administrative access events.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center justify-between">
              Active User Sessions
              <UserCheck className="h-4 w-4 text-green-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{security.activeSessions}</div>
            <p className="text-xs text-gray-500 mt-1">Authenticated across NextAuth JWT</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center justify-between">
              Failed Logins Today
              <ShieldAlert className="h-5 w-5 " />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{security.failedLoginsToday}</div>
            <p className="text-xs text-gray-500 mt-1">Blocked by rate limiting</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center justify-between">
              Multi-Factor Authentication
              <KeyRound className="h-4 w-4 text-indigo-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{security.mfaEnabledUsers} users</div>
            <p className="text-xs text-gray-500 mt-1">Mandatory for SUPER_ADMIN role</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5 " />
            Recent Security Events
          </CardTitle>
          <CardDescription>System security logs and administrative action trace</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {security.recentAudits.slice(0, 5).map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-gray-50/50">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-gray-900">{log.action}</span>
                    <Badge variant="outline" className="text-[10px]">{log.actor?.name || 'System'}</Badge>
                  </div>
                  <p className="text-xs text-gray-500">{log.newValues || log.oldValues || "No details"}</p>
                </div>
                <span className="text-xs text-gray-400 font-mono">
                  {new Date(log.createdAt).toLocaleTimeString("id-ID")}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
