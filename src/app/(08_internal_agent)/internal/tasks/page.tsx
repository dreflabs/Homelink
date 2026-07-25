import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, AlertCircle, Search, Filter, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";

const mockTasks = [
  {
    id: "TSK-001",
    title: "Verify legal documents for Villa Kemang",
    assignee: "Diana M.",
    dueDate: "Today",
    priority: "high",
    status: "in-progress",
    type: "Verification"
  },
  {
    id: "TSK-002",
    title: "Follow up with Pak Budi regarding listing photos",
    assignee: "Reza F.",
    dueDate: "Tomorrow",
    priority: "medium",
    status: "todo",
    type: "Owner Support"
  },
  {
    id: "TSK-003",
    title: "Process commission payout for October",
    assignee: "Finance Team",
    dueDate: "Oct 28",
    priority: "high",
    status: "todo",
    type: "Finance"
  },
  {
    id: "TSK-004",
    title: "Review flagged property description (ID: P-908)",
    assignee: "Diana M.",
    dueDate: "Yesterday",
    priority: "high",
    status: "overdue",
    type: "Moderation"
  },
  {
    id: "TSK-005",
    title: "Onboard new agent (Sarah)",
    assignee: "Admin",
    dueDate: "Oct 22",
    priority: "low",
    status: "done",
    type: "HR"
  }
];

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
          <p className="text-gray-500">Manage and assign internal operational tasks.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">My Tasks</p>
                <h3 className="text-2xl font-bold mt-1">12</h3>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <h3 className="text-2xl font-bold mt-1">5</h3>
              </div>
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Overdue</p>
                <h3 className="text-2xl font-bold mt-1 text-red-600">2</h3>
              </div>
              <div className="p-2 bg-red-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Completed (Week)</p>
                <h3 className="text-2xl font-bold mt-1 text-green-600">28</h3>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <CardTitle>All Tasks</CardTitle>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">All</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-50">To Do</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-50">In Progress</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-50">Done</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search tasks..."
                  className="pl-9 w-[250px] h-9"
                />
              </div>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 border-b">
                <tr>
                  <th className="px-4 py-3 font-medium w-10"></th>
                  <th className="px-4 py-3 font-medium">Task</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Assignee</th>
                  <th className="px-4 py-3 font-medium">Due Date</th>
                  <th className="px-4 py-3 font-medium">Priority</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {mockTasks.map((task) => (
                  <tr key={task.id} className={`hover:bg-gray-50/50 ${task.status === 'done' ? 'opacity-60' : ''}`}>
                    <td className="px-4 py-3">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                        defaultChecked={task.status === 'done'}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{task.title}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{task.id}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{task.type}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                          {task.assignee.charAt(0)}
                        </div>
                        {task.assignee}
                      </div>
                    </td>
                    <td className={`px-4 py-3 ${task.status === 'overdue' ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                      {task.dueDate}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={
                        task.priority === 'high' ? 'border-red-200 text-red-700 bg-red-50' :
                        task.priority === 'medium' ? 'border-orange-200 text-orange-700 bg-orange-50' :
                        'border-gray-200 text-gray-700 bg-gray-50'
                      }>
                        {task.priority.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={task.status === 'done' ? 'default' : 'secondary'} className={
                        task.status === 'in-progress' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' :
                        task.status === 'todo' ? 'bg-gray-100 text-gray-700 hover:bg-gray-100' :
                        task.status === 'overdue' ? 'bg-red-100 text-red-700 hover:bg-red-100' :
                        'bg-green-100 text-green-700 hover:bg-green-100'
                      }>
                        {task.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
