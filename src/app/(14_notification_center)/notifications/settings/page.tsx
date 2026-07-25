import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { BellRing, Mail, MessageSquare, Smartphone } from "lucide-react";

export default function NotificationSettingsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notification Settings</h1>
        <p className="text-muted-foreground mt-2">Manage default channels and global notification preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Global Channels</CardTitle>
          <CardDescription>Enable or disable notification channels globally for all users.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex flex-col space-y-1">
              <span className="flex items-center font-medium leading-none">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" /> Email Notifications
              </span>
              <span className="text-sm text-muted-foreground">
                Send transactional and marketing emails.
              </span>
            </div>
            <Switch defaultChecked id="email-notifs" />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <div className="flex flex-col space-y-1">
              <span className="flex items-center font-medium leading-none">
                <MessageSquare className="mr-2 h-4 w-4 text-muted-foreground" /> SMS Notifications
              </span>
              <span className="text-sm text-muted-foreground">
                Send text messages for critical alerts.
              </span>
            </div>
            <Switch defaultChecked id="sms-notifs" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex flex-col space-y-1">
              <span className="flex items-center font-medium leading-none">
                <Smartphone className="mr-2 h-4 w-4 text-muted-foreground" /> Push Notifications
              </span>
              <span className="text-sm text-muted-foreground">
                Send push notifications to mobile devices.
              </span>
            </div>
            <Switch id="push-notifs" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex flex-col space-y-1">
              <span className="flex items-center font-medium leading-none">
                <BellRing className="mr-2 h-4 w-4 text-muted-foreground" /> In-App Notifications
              </span>
              <span className="text-sm text-muted-foreground">
                Show notifications inside the web dashboard.
              </span>
            </div>
            <Switch defaultChecked id="inapp-notifs" />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save Preferences</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
