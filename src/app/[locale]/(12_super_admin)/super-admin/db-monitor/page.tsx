import { getDatabaseMetrics } from "@/actions/super-admin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Database, HardDrive, Server, Activity } from "lucide-react";

export default async function DatabaseMonitorPage() {
  const metrics = await getDatabaseMetrics();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Database Monitor & Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor PostgreSQL connections, table storage distribution, and query performance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center justify-between">
              Connection Pool Status
              <Server className="h-4 w-4 text-indigo-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{metrics.connectionPool.active} / {metrics.connectionPool.max}</div>
            <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600" 
                style={{ width: `${(metrics.connectionPool.active / metrics.connectionPool.max) * 100}%` }} 
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">{metrics.connectionPool.idle} idle connections available</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center justify-between">
              Engine & Extensions
              <Database className="h-4 w-4 text-indigo-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-gray-900">PostgreSQL 16</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-[10px] bg-indigo-50 text-indigo-700">pgvector v0.7</Badge>
              <Badge variant="secondary" className="text-[10px] bg-green-50 text-green-700">UUID extension</Badge>
            </div>
            <p className="text-xs text-gray-500 mt-2">SSL encrypted • RDS Primary</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center justify-between">
              Storage Usage
              <HardDrive className="h-4 w-4 text-indigo-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">5.93 MB</div>
            <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-[12%]" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Allocated capacity: 50 GB</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Table Storage Breakdown</CardTitle>
          <CardDescription>Row counts and approximate memory usage per table</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-semibold text-gray-600">Table Name</TableHead>
                  <TableHead className="font-semibold text-gray-600">Estimated Rows</TableHead>
                  <TableHead className="font-semibold text-gray-600">Disk Size</TableHead>
                  <TableHead className="font-semibold text-gray-600">Primary Key Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {metrics.tables.map((table) => (
                  <TableRow key={table.name} className="hover:bg-gray-50/50">
                    <TableCell className="font-medium text-gray-900 font-mono">{table.name}</TableCell>
                    <TableCell className="text-gray-600">{table.rows.toLocaleString()}</TableCell>
                    <TableCell className="text-gray-600">{table.size}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">UUID v4</Badge>
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
