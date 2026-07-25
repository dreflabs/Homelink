import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import QueueList from './QueueList';
import { getVerificationQueue } from '@/actions/admin';

export default async function VerificationQueuePage() {
  const queue = await getVerificationQueue();
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Verification Queue</h1>
      <Card>
        <CardHeader>
          <CardTitle>Properties Pending Verification</CardTitle>
          <CardDescription>Review and approve or reject properties submitted by owners/agents.</CardDescription>
        </CardHeader>
        <CardContent>
          <QueueList initialQueue={queue} />
        </CardContent>
      </Card>
    </div>
  );
}
