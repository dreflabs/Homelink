import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminReportsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">System Reports</h1>
      <Card>
        <CardHeader>
          <CardTitle>Generated Reports</CardTitle>
          <CardDescription>View and download system-wide reports.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Input type="date" className="max-w-[150px]" />
            <Input type="date" className="max-w-[150px]" />
            <Button>Generate Report</Button>
          </div>
          
          <div className="border rounded-md overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="p-3">Report Name</th>
                  <th className="p-3">Generated Date</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">Monthly Sales Report</td>
                  <td className="p-3">2026-07-01</td>
                  <td className="p-3">PDF</td>
                  <td className="p-3"><Button variant="outline" size="sm">Download</Button></td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">User Activity Log</td>
                  <td className="p-3">2026-07-25</td>
                  <td className="p-3">CSV</td>
                  <td className="p-3"><Button variant="outline" size="sm">Download</Button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
