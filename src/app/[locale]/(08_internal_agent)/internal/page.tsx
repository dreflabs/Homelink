import { getTranslations } from "next-intl/server";
import React from 'react';
import { 
  FileCheck, 
  CheckSquare, 
  ShieldAlert,
  Eye
} from 'lucide-react';
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { Task } from "@prisma/client";

export const dynamic = 'force-dynamic';

export default async function InternalDashboardPage() {
  const t = await getTranslations("InternalAgent");

  const session = await auth();
  const userId = session?.user?.id;

  // Fetch real stats
  const pendingReviewsCount = await prisma.property.count({
    where: { status: 'PENDING_REVIEW' }
  });

  const surveyedCount = await prisma.property.count({
    where: { status: 'SURVEYED' }
  });

  const openTicketsCount = await prisma.ticket.count({
    where: { status: 'OPEN' }
  });

  // Fetch tasks assigned to the current internal agent
  let tasks: Task[] = [];
  if (userId) {
    tasks = await prisma.task.findMany({
      where: {
        assigneeId: userId,
        status: { not: 'DONE' }
      },
      orderBy: {
        dueDate: 'asc'
      },
      take: 5
    });
  }

  const stats = [
    { label: t("listing_menunggu_review"), value: pendingReviewsCount, icon: <FileCheck className="" size={24} /> },
    { label: t("properti_tersurvei"), value: surveyedCount, icon: <CheckSquare className="text-blue-700" size={24} /> },
    { label: t("laporan_masalah"), value: openTicketsCount, icon: <ShieldAlert className="" size={24} /> },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t("internal_dashboard")}</h1>
        <p className="text-gray-500 mt-2">{t("ringkasan_aktivitas_dan_prioritas_tugas_agen_inter")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{t("daftar_prioritas_tugas")}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
                <th className="p-4">{t("tugas")}</th>
                <th className="p-4">{t("status")}</th>
                <th className="p-4">{t("tenggat_waktu")}</th>
                <th className="p-4 text-right">{t("aksi")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tasks.length > 0 ? tasks.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm text-gray-900 font-medium">{item.title}</td>
                  <td className="p-4 text-sm">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      item.status === 'TODO' ? 'bg-yellow-100 text-yellow-800' :
                      item.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                      item.status === 'OVERDUE' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {item.dueDate ? format(new Date(item.dueDate), "dd MMM yyyy") : "-"}
                  </td>
                  <td className="p-4 text-sm text-right">
                    <button className="inline-flex items-center justify-center p-2 text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    {t("tidak_ada_tugas_yang_perlu_diselesaikan")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
