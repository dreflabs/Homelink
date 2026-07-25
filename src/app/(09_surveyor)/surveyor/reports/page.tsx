import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SurveyorReportsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Survey Reports</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Reports</CardTitle>
          <CardDescription>View all your submitted survey reports.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input placeholder="Search reports by property ID..." className="max-w-md" />
          </div>
          <div className="border rounded-md overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="p-3">Report ID</th>
                  <th className="p-3">Property</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">REP-001</td>
                  <td className="p-3">Jl. Sudirman No. 1</td>
                  <td className="p-3">2026-07-20</td>
                  <td className="p-3"><span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs">Approved</span></td>
                  <td className="p-3"><Button variant="outline" size="sm">View</Button></td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">REP-002</td>
                  <td className="p-3">Jl. Thamrin No. 2</td>
                  <td className="p-3">2026-07-24</td>
                  <td className="p-3"><span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full text-xs">Pending Review</span></td>
                  <td className="p-3"><Button variant="outline" size="sm">View</Button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
