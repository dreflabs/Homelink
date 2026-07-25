"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, AlertCircle, Search, Filter, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { getTasks, updateTaskStatus } from '@/actions/internal';
import { toast } from 'sonner';
import { format } from 'date-fns';

type TaskRecord = any; // type it loosely for now

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        toast.error('Failed to load tasks');
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  async function handleToggleStatus(taskId: string, currentStatus: string) {
    const newStatus = currentStatus === 'DONE' ? 'TODO' : 'DONE';
    try {
      await updateTaskStatus(taskId, newStatus as any);
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    } catch (error) {
      toast.error('Failed to update task status');
    }
  }

  const myTasksCount = tasks.filter(t => t.status !== 'DONE').length;
  const inProgressCount = tasks.filter(t => t.status === 'IN_PROGRESS').length;
  const overdueCount = tasks.filter(t => t.status === 'OVERDUE').length;
  const completedCount = tasks.filter(t => t.status === 'DONE').length;

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
                <h3 className="text-2xl font-bold mt-1">{myTasksCount}</h3>
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
                <h3 className="text-2xl font-bold mt-1">{inProgressCount}</h3>
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
                <h3 className="text-2xl font-bold mt-1 text-red-600">{overdueCount}</h3>
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
                <p className="text-sm font-medium text-gray-500">Completed (Total)</p>
                <h3 className="text-2xl font-bold mt-1 text-green-600">{completedCount}</h3>
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
          {isLoading ? (
            <div className="py-8 text-center text-gray-500">Loading tasks...</div>
          ) : (
          <div className="rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 border-b">
                <tr>
                  <th className="px-4 py-3 font-medium w-10"></th>
                  <th className="px-4 py-3 font-medium">Task</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Assignee</th>
                  <th className="px-4 py-3 font-medium">Due Date</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {tasks.map((task) => (
                  <tr key={task.id} className={`hover:bg-gray-50/50 ${task.status === 'DONE' ? 'opacity-60' : ''}`}>
                    <td className="px-4 py-3">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                        checked={task.status === 'DONE'}
                        onChange={() => handleToggleStatus(task.id, task.status)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{task.title}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{task.id.substring(0, 8)}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{task.type}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                          {task.assignee?.name?.charAt(0) || '?'}
                        </div>
                        {task.assignee?.name || 'Unassigned'}
                      </div>
                    </td>
                    <td className={`px-4 py-3 ${task.status === 'OVERDUE' ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                      {task.dueDate ? format(new Date(task.dueDate), 'MMM dd, yyyy') : 'No Due Date'}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={task.status === 'DONE' ? 'default' : 'secondary'} className={
                        task.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' :
                        task.status === 'TODO' ? 'bg-gray-100 text-gray-700 hover:bg-gray-100' :
                        task.status === 'OVERDUE' ? 'bg-red-100 text-red-700 hover:bg-red-100' :
                        'bg-green-100 text-green-700 hover:bg-green-100'
                      }>
                        {task.status.replace('_', ' ')}
                      </Badge>
                    </td>
                  </tr>
                ))}
                {tasks.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      No tasks found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
