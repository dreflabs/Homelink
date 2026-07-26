import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getNotificationHistory } from "@/actions/notification";


export default async function NotificationHistoryPage() {
  const notifications = await getNotificationHistory();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notification History</h1>
          <p className="text-muted-foreground mt-2">View all sent notifications across channels.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>A list of recently sent notifications to users.</CardDescription>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No notifications found.
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {notification.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{notification.user?.name || 'Unknown User'}</div>
                        <div className="text-sm text-muted-foreground">{notification.user?.email || ''}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium max-w-xs truncate" title={notification.title}>
                          {notification.title}
                        </div>
                        <div className="text-sm text-muted-foreground max-w-xs truncate" title={notification.body}>
                          {notification.body}
                        </div>
                      </TableCell>
                      <TableCell>
                        {notification.isRead ? (
                          <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                            Read
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">
                            Unread
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground whitespace-nowrap">
                        {new Date(notification.createdAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
