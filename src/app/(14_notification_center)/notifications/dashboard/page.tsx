import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Mail, MessageSquare, Smartphone } from "lucide-react";

export default function NotificationDashboardPage() {
  const stats = [
    { title: "Total Notifications", value: "12,450", icon: Bell, trend: "+12.5%", color: "text-blue-500" },
    { title: "Emails Sent", value: "8,200", icon: Mail, trend: "+5.2%", color: "text-green-500" },
    { title: "SMS Sent", value: "1,150", icon: MessageSquare, trend: "-2.1%", color: "text-yellow-500" },
    { title: "Push Notifications", value: "3,100", icon: Smartphone, trend: "+18.4%", color: "text-purple-500" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notification Dashboard</h1>
          <p className="text-muted-foreground mt-2">Overview of your messaging performance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className={`text-xs mt-1 ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Delivery Rates</CardTitle>
            <CardDescription>Mock chart showing delivery success rates</CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center bg-muted/20 rounded-md border border-dashed">
            <div className="flex flex-col items-center text-muted-foreground">
              <Bell className="h-10 w-10 mb-2 opacity-50" />
              <span>Chart Placeholder</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Notifications by Channel</CardTitle>
            <CardDescription>Distribution of messages across channels</CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center bg-muted/20 rounded-md border border-dashed">
            <div className="flex flex-col items-center text-muted-foreground">
              <MessageSquare className="h-10 w-10 mb-2 opacity-50" />
              <span>Chart Placeholder</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
