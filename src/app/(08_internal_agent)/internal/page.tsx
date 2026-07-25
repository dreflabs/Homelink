import React from 'react';
import { 
  FileText, 
  CheckSquare, 
  AlertCircle,
  Eye
} from 'lucide-react';

export default function InternalDashboardPage() {
  const stats = [
    { label: "Listing Menunggu Review", value: 12, icon: <FileText className="text-blue-700" size={24} /> },
    { label: "Properti Tersurvei", value: 45, icon: <CheckSquare className="text-blue-700" size={24} /> },
    { label: "Laporan Masalah", value: 3, icon: <AlertCircle className="text-blue-700" size={24} /> },
  ];

  const priorities = [
    { id: 1, task: "Review Property A (Kebayoran Baru)", status: "Pending", date: "24 Jul 2026" },
    { id: 2, task: "Verifikasi Sertifikat Properti B", status: "In Progress", date: "24 Jul 2026" },
    { id: 3, task: "Survei Fisik Properti C", status: "Scheduled", date: "25 Jul 2026" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Internal Dashboard</h1>
        <p className="text-gray-500 mt-2">Ringkasan aktivitas dan prioritas tugas agen internal.</p>
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
          <h2 className="text-lg font-semibold text-gray-900">Daftar Prioritas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
                <th className="p-4">Tugas</th>
                <th className="p-4">Status</th>
                <th className="p-4">Tenggat Waktu</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {priorities.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm text-gray-900 font-medium">{item.task}</td>
                  <td className="p-4 text-sm">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      item.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500">{item.date}</td>
                  <td className="p-4 text-sm text-right">
                    <button className="inline-flex items-center justify-center p-2 text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
