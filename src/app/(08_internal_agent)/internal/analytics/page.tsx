import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, LineChart, PieChart, Activity, Download } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-500">Internal metrics and platform performance overview.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Users</p>
                <h3 className="text-2xl font-bold mt-1">24.5k</h3>
                <p className="text-xs text-green-600 mt-1">+12% from last month</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Listings</p>
                <h3 className="text-2xl font-bold mt-1">8,234</h3>
                <p className="text-xs text-green-600 mt-1">+5% from last month</p>
              </div>
              <div className="p-2 bg-indigo-50 rounded-lg">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                <h3 className="text-2xl font-bold mt-1">3.8%</h3>
                <p className="text-xs text-red-600 mt-1">-0.2% from last month</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <LineChart className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Revenue</p>
                <h3 className="text-2xl font-bold mt-1">Rp 4.2B</h3>
                <p className="text-xs text-green-600 mt-1">+18% from last month</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <PieChart className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="h-96">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-full pb-16">
            <div className="text-center text-gray-400 flex flex-col items-center">
              <LineChart className="w-12 h-12 mb-2 text-gray-300" />
              <p>Chart Placeholder (User Growth)</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="h-96">
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-full pb-16">
            <div className="text-center text-gray-400 flex flex-col items-center">
              <PieChart className="w-12 h-12 mb-2 text-gray-300" />
              <p>Chart Placeholder (Revenue Breakdown)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
