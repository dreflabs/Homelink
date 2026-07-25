import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Home,
  FileText,
  Phone,
  CalendarDays,
  Users,
} from "lucide-react";

type Priority = "high" | "medium" | "low";
type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE" | "OVERDUE";

interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  due: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
}

const tasks: Task[] = [
  {
    id: 1,
    title: "Kirim Proposal ke Budi Santoso",
    description: "Siapkan dokumen penawaran untuk Villa Indah Kemang",
    status: "IN_PROGRESS",
    priority: "high",
    due: "28 Jul 2026",
    icon: FileText,
    category: "Dokumen",
  },
  {
    id: 2,
    title: "Jadwalkan Viewing Properti",
    description: "Koordinasi jadwal showing Pondok Indah Mansion dengan Kevin",
    status: "TODO",
    priority: "high",
    due: "29 Jul 2026",
    icon: Home,
    category: "Showing",
  },
  {
    id: 3,
    title: "Follow-up KPR Siti Rahma",
    description: "Hubungi bank untuk memastikan status pengajuan KPR",
    status: "TODO",
    priority: "medium",
    due: "30 Jul 2026",
    icon: Phone,
    category: "Follow-up",
  },
  {
    id: 4,
    title: "Rapat Tim Mingguan",
    description: "Diskusi target penjualan Q3 dengan tim agen",
    status: "DONE",
    priority: "low",
    due: "25 Jul 2026",
    icon: Users,
    category: "Internal",
  },
  {
    id: 5,
    title: "Update Database Klien",
    description: "Perbarui info kontak dan status leads terbaru",
    status: "OVERDUE",
    priority: "medium",
    due: "24 Jul 2026",
    icon: AlertCircle,
    category: "Admin",
  },
  {
    id: 6,
    title: "Persiapan Closing AJB Dewi Kusuma",
    description: "Pastikan semua dokumen legal siap untuk penandatanganan",
    status: "IN_PROGRESS",
    priority: "high",
    due: "31 Jul 2026",
    icon: CalendarDays,
    category: "Closing",
  },
];

function statusConfig(status: TaskStatus) {
  switch (status) {
    case "DONE":
      return { label: "Selesai", className: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2 };
    case "IN_PROGRESS":
      return { label: "Berjalan", className: "bg-blue-50 text-blue-700 border-blue-200", icon: Clock };
    case "OVERDUE":
      return { label: "Terlambat", className: "bg-red-50 text-red-700 border-red-200", icon: AlertCircle };
    default:
      return { label: "Menunggu", className: "bg-slate-100 text-slate-600 border-slate-200", icon: Clock };
  }
}

function priorityConfig(priority: Priority) {
  switch (priority) {
    case "high":
      return "bg-red-50 text-red-600 border-red-200";
    case "medium":
      return "bg-amber-50 text-amber-600 border-amber-200";
    default:
      return "bg-slate-100 text-slate-500 border-slate-200";
  }
}

function priorityLabel(priority: Priority) {
  return priority === "high" ? "Tinggi" : priority === "medium" ? "Sedang" : "Rendah";
}

export default function AgentTasksPage() {
  const todoCount = tasks.filter((t) => t.status === "TODO").length;
  const inProgressCount = tasks.filter((t) => t.status === "IN_PROGRESS").length;
  const doneCount = tasks.filter((t) => t.status === "DONE").length;
  const overdueCount = tasks.filter((t) => t.status === "OVERDUE").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Daftar Tugas</h1>
        <p className="text-slate-500 mt-1 text-sm">
          Semua tugas dan aktivitas yang perlu Anda selesaikan.
        </p>
      </div>

      {/* Summary Badges */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: "Menunggu", count: todoCount, className: "bg-slate-100 text-slate-700" },
          { label: "Berjalan", count: inProgressCount, className: "bg-blue-100 text-blue-700" },
          { label: "Selesai", count: doneCount, className: "bg-emerald-100 text-emerald-700" },
          { label: "Terlambat", count: overdueCount, className: "bg-red-100 text-red-700" },
        ].map((item) => (
          <span
            key={item.label}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${item.className}`}
          >
            {item.count} {item.label}
          </span>
        ))}
      </div>

      {/* Task Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.map((task) => {
          const sc = statusConfig(task.status);
          const StatusIcon = sc.icon;
          const TaskIcon = task.icon;

          return (
            <Card
              key={task.id}
              className={`rounded-2xl shadow-sm border-slate-100 p-5 hover:shadow-md transition-shadow ${
                task.status === "DONE" ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${
                    task.status === "DONE"
                      ? "bg-emerald-50"
                      : task.status === "OVERDUE"
                      ? "bg-red-50"
                      : "bg-blue-50"
                  }`}
                >
                  <TaskIcon
                    className={`w-4 h-4 ${
                      task.status === "DONE"
                        ? "text-emerald-600"
                        : task.status === "OVERDUE"
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      className={`text-sm font-semibold text-slate-900 leading-snug ${
                        task.status === "DONE" ? "line-through text-slate-500" : ""
                      }`}
                    >
                      {task.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {task.description}
                  </p>
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <Badge variant="outline" className={`text-xs ${sc.className}`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {sc.label}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-xs ${priorityConfig(task.priority)}`}
                    >
                      {priorityLabel(task.priority)}
                    </Badge>
                    <span className="text-xs text-slate-400 ml-auto flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {task.due}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
