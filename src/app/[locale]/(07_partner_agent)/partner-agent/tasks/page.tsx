import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Clock, ShieldAlert } from "lucide-react";
import { getAgentTasks } from "@/actions/agent";

type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE" | "OVERDUE";

function statusConfig(status: TaskStatus, t: any) {
  switch (status) {
    case "DONE":
      return { label: t('statuses.done'), className: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: ShieldCheck };
    case "IN_PROGRESS":
      return { label: t('statuses.inProgress'), className: "bg-slate-50 text-primary border-slate-200", icon: Clock };
    case "OVERDUE":
      return { label: t('statuses.overdue'), className: "bg-red-50 text-red-700 border-red-200", icon: ShieldAlert };
    default:
      return { label: t('statuses.todo'), className: "bg-slate-100 text-slate-600 border-slate-200", icon: Clock };
  }
}

export default async function AgentTasksPage() {
  const t = await getTranslations('PartnerAgent.Tasks');
  const tasks = await getAgentTasks();

  const todoCount = tasks.filter((task) => task.status === "TODO").length;
  const inProgressCount = tasks.filter((task) => task.status === "IN_PROGRESS").length;
  const doneCount = tasks.filter((task) => task.status === "DONE").length;
  const overdueCount = tasks.filter((task) => task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "DONE").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{t('title')}</h1>
        <p className="text-slate-500 mt-1 text-sm">{t('description')}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {[
          { label: t('statuses.todo'), count: todoCount, className: "bg-slate-100 text-slate-700" },
          { label: t('statuses.inProgress'), count: inProgressCount, className: "bg-slate-100 text-primary" },
          { label: t('statuses.done'), count: doneCount, className: "bg-emerald-100 text-emerald-700" },
          { label: t('statuses.overdue'), count: overdueCount, className: "bg-red-100 text-red-700" },
        ].map((item) => (
          <span key={item.label} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${item.className}`}>
            {item.count} {item.label}
          </span>
        ))}
      </div>

      {tasks.length === 0 ? (
        <div className="bg-white/50 border border-slate-200/60 rounded-2xl p-8 min-h-96 flex items-center justify-center">
          <p className="text-slate-500">Belum ada tugas yang ditugaskan kepada Anda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task) => {
            const sc = statusConfig(task.status as TaskStatus, t);
            const StatusIcon = sc.icon;

            return (
              <Card key={task.id} className={`rounded-2xl shadow-sm border-slate-100 p-5 hover:shadow-md transition-shadow ${task.status === "DONE" ? "opacity-60" : ""}`}>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-semibold text-slate-900 leading-snug ${task.status === "DONE" ? "line-through text-slate-500" : ""}`}>
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{task.description}</p>
                  )}
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <Badge variant="outline" className={`text-xs ${sc.className}`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {sc.label}
                    </Badge>
                    {task.dueDate && (
                      <span className="text-xs text-slate-400 ml-auto flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(task.dueDate))}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
