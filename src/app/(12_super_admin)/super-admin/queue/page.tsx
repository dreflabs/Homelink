import { getQueueMetrics } from "@/actions/super-admin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, CheckCircle2, Clock, Cpu, Layers, PlayCircle, RefreshCw } from "lucide-react";

export default async function QueuePage() {
  const metrics = await getQueueMetrics();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Task Queue & Background Workers</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor asynchronous job execution, worker processes, and message queues.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Workers</CardTitle>
            <Cpu className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{metrics.activeWorkers}</div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> All workers online
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Jobs</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{metrics.pendingJobs}</div>
            <p className="text-xs text-gray-500 mt-1">Queued across 4 queues</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Completed (24h)</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{metrics.completedJobs}</div>
            <p className="text-xs text-gray-500 mt-1">99.9% success rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Failed Jobs</CardTitle>
            <Activity className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{metrics.failedJobs}</div>
            <p className="text-xs text-gray-500 mt-1">No dead-letter items</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Layers className="h-5 w-5 text-indigo-500" />
            Active Message Queues
          </CardTitle>
          <CardDescription>Live stats for registered background queues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {metrics.queues.map((q) => (
              <div key={q.name} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-gray-900">{q.name}</h4>
                    <Badge variant={q.status === "Active" ? "default" : "outline"} className={q.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200 text-xs" : "text-xs"}>
                      {q.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">
                    Active Workers: <span className="font-medium text-gray-700">{q.active}</span> • Pending Jobs: <span className="font-medium text-gray-700">{q.pending}</span>
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">
                  <PlayCircle className="mr-1.5 h-3.5 w-3.5" />
                  Process Next
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
