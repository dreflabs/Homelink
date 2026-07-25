import React from 'react';
import { Users, DollarSign, Calendar, CheckCircle2, Clock, MoreHorizontal } from 'lucide-react';

export default function AgentDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight">
          Beranda Agen
        </h1>
        <p className="text-slate-500 mt-1">
          Selamat datang kembali! Berikut ringkasan aktivitas Anda hari ini.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Stat Card 1 */}
        <div className="bg-white rounded-2xl md:rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-700 rounded-xl">
            <Users size={24} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Klien Aktif</p>
            <h3 className="text-2xl font-bold text-slate-900">24</h3>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white rounded-2xl md:rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-700 rounded-xl">
            <DollarSign size={24} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Proyeksi Komisi</p>
            <h3 className="text-2xl font-bold text-slate-900">Rp 45.5M</h3>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white rounded-2xl md:rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-700 rounded-xl">
            <Calendar size={24} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Jadwal Mendatang</p>
            <h3 className="text-2xl font-bold text-slate-900">3</h3>
          </div>
        </div>
      </div>

      {/* Tasks Table Section */}
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-900">Tugas Hari Ini</h2>
          <button className="text-sm font-medium text-blue-700 hover:text-blue-800 transition-colors">
            Lihat Semua
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Tugas</th>
                <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Klien / Properti</th>
                <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Waktu</th>
                <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Row 1 */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 size={18} className="text-slate-300" strokeWidth={1.5} />
                    <span className="text-sm font-medium text-slate-900">Showing Properti</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-600">Budi Santoso - Villa Indah</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2 text-slate-500">
                    <Clock size={16} strokeWidth={1.5} />
                    <span className="text-sm">10:00 WIB</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                    Menunggu
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreHorizontal size={18} strokeWidth={1.5} />
                  </button>
                </td>
              </tr>
              
              {/* Row 2 */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 size={18} className="text-slate-300" strokeWidth={1.5} />
                    <span className="text-sm font-medium text-slate-900">Follow up Dokumen KPR</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-600">Siti Aminah</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2 text-slate-500">
                    <Clock size={16} strokeWidth={1.5} />
                    <span className="text-sm">13:30 WIB</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    Berjalan
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreHorizontal size={18} strokeWidth={1.5} />
                  </button>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 size={18} className="text-emerald-500" strokeWidth={1.5} />
                    <span className="text-sm font-medium text-slate-900 line-through">Meeting Internal Tim</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-600">Internal HQ</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2 text-slate-500">
                    <Clock size={16} strokeWidth={1.5} />
                    <span className="text-sm">08:00 WIB</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                    Selesai
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreHorizontal size={18} strokeWidth={1.5} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
