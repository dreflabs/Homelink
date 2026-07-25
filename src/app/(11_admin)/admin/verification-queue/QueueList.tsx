"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { approveProperty, rejectProperty } from '@/actions/admin';
import { Check, X } from 'lucide-react';

type QueueItem = {
  id: string;
  address: string;
  owner: { name: string; email: string } | null;
  createdAt: Date;
};

export default function QueueList({ initialQueue }: { initialQueue: QueueItem[] }) {
  const [queue, setQueue] = useState(initialQueue);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleApprove = async (id: string) => {
    setLoadingId(id);
    try {
      await approveProperty(id);
      setQueue(q => q.filter(item => item.id !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId(null);
    }
  };

  const handleReject = async (id: string) => {
    setLoadingId(id);
    try {
      await rejectProperty(id);
      setQueue(q => q.filter(item => item.id !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId(null);
    }
  };

  if (queue.length === 0) {
    return <div className="text-center p-8 text-muted-foreground">No properties pending verification.</div>;
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-muted text-muted-foreground">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Address</th>
            <th className="p-3">Owner</th>
            <th className="p-3">Submitted</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {queue.map(item => (
            <tr key={item.id} className="border-b last:border-0">
              <td className="p-3 font-medium">{item.id}</td>
              <td className="p-3">{item.address}</td>
              <td className="p-3">{item.owner?.name || item.owner?.email || 'Unknown'}</td>
              <td className="p-3">{new Date(item.createdAt).toLocaleDateString()}</td>
              <td className="p-3 text-right space-x-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                  onClick={() => handleApprove(item.id)}
                  disabled={loadingId === item.id}
                >
                  <Check className="w-4 h-4 mr-1" /> Approve
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="bg-red-50 text-red-700 hover:bg-red-100 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
                  onClick={() => handleReject(item.id)}
                  disabled={loadingId === item.id}
                >
                  <X className="w-4 h-4 mr-1" /> Reject
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
