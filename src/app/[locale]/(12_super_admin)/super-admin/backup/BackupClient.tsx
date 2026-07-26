"use client";

import { useState, useTransition } from "react";
import { triggerBackupSnapshot } from "@/actions/super-admin";
import { Button } from "@/components/ui/button";
import { Archive, Plus, RefreshCw } from "lucide-react";

export function BackupClient() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const handleTriggerBackup = () => {
    startTransition(async () => {
      try {
        const res = await triggerBackupSnapshot();
        setMessage(res.message);
      } catch (err: any) {
        setMessage(err.message || "Failed to trigger backup");
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Database Backup & Recovery</h1>
          <p className="text-sm text-gray-500 mt-1">Manage automated pg_dump database snapshots and point-in-time recovery points.</p>
        </div>
        <Button 
          onClick={handleTriggerBackup} 
          disabled={isPending}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          {isPending ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Archive className="mr-2 h-4 w-4" />}
          Trigger Manual Snapshot
        </Button>
      </div>

      {message && (
        <div className="p-3 text-sm bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md">
          {message}
        </div>
      )}
    </div>
  );
}
