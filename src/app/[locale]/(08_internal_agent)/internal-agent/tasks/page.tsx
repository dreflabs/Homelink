"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Clock, ShieldAlert, Search, Filter, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { getTasks, updateTaskStatus } from '@/actions/internal';
import { toast } from 'sonner';
import { format } from 'date-fns';

type TaskRecord = any; // type it loosely for now

export default function TasksPage() {
  const t = useTranslations("InternalAgent");

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
          <h1 className="text-2xl font-bold text-gray-900">{t("task_management")}</h1>
          <p className="text-gray-500">{t("task_management_desc")}</p>
        </div>
        <Button className="bg-primary hover:bg-primary text-white">
          <Plus className="w-4 h-4 mr-2" />
          {t("create_task")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{t("my_tasks")}</p>
                <h3 className="text-2xl font-bold mt-1">{myTasksCount}</h3>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg">
                <ShieldCheck className="w-5 h-5 " />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{t("in_progress")}</p>
                <h3 className="text-2xl font-bold mt-1">{inProgressCount}</h3>
              </div>
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Clock className="w-5 h-5 " />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{t("overdue")}</p>
                <h3 className="text-2xl font-bold mt-1 text-red-600">{overdueCount}</h3>
              </div>
              <div className="p-2 bg-red-50 rounded-lg">
                <ShieldAlert className="w-5 h-5 " />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{t("completed_total")}</p>
                <h3 className="text-2xl font-bold mt-1 text-green-600">{completedCount}</h3>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <ShieldCheck className="w-5 h-5 " />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <CardTitle>{t("all_tasks")}</CardTitle>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-slate-50 text-primary border-slate-200">{t("all")}</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-50">{t("to_do")}</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-50">{t("in_progress")}</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-50">{t("done")}</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-5 w-5 " />
                <Input
                  placeholder={t("search_tasks")}
                  className="pl-9 w-[250px] h-9"
                />
              </div>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="h-4 w-4 mr-2" />
                {t("filter")}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center text-gray-500">{t("loading_tasks")}</div>
          ) : (
          <div className="rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 border-b">
                <tr>
                  <th className="px-4 py-3 font-medium w-10"></th>
                  <th className="px-4 py-3 font-medium">{t("tugas")}</th>
                  <th className="px-4 py-3 font-medium">{t("type")}</th>
                  <th className="px-4 py-3 font-medium">{t("assignee")}</th>
                  <th className="px-4 py-3 font-medium">{t("due_date")}</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {tasks.map((task) => (
                  <tr key={task.id} className={`hover:bg-gray-50/50 ${task.status === 'DONE' ? 'opacity-60' : ''}`}>
                    <td className="px-4 py-3">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-primary focus:ring-primary w-4 h-4 cursor-pointer"
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
                        {task.assignee?.name || t("unassigned")}
                      </div>
                    </td>
                    <td className={`px-4 py-3 ${task.status === 'OVERDUE' ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                      {task.dueDate ? format(new Date(task.dueDate), 'MMM dd, yyyy') : t("no_due_date")}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={task.status === 'DONE' ? 'default' : 'secondary'} className={
                        task.status === 'IN_PROGRESS' ? 'bg-slate-100 text-primary hover:bg-slate-100' :
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
                      {t("no_tasks_found")}
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
