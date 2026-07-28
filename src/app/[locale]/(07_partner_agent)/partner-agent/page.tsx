import React from 'react';
import { UserRound, Wallet, Calendar, ShieldCheck, Clock, MoreHorizontal } from 'lucide-react';
import { getTranslations } from "next-intl/server";

export default async function AgentDashboardPage() {
  const t = await getTranslations('PartnerAgent');

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight">
          {t('Dashboard.title')}
        </h1>
        <p className="text-slate-500 mt-1">
          {t('Dashboard.subtitle')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Stat Card 1 */}
        <div className="bg-white rounded-2xl md:rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-slate-50 text-primary rounded-xl">
            <UserRound size={24}  />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">{t('Dashboard.activeClients')}</p>
            <h3 className="text-2xl font-bold text-slate-900">24</h3>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white rounded-2xl md:rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-slate-50 text-primary rounded-xl">
            <Wallet size={24}  />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">{t('Dashboard.projectedCommission')}</p>
            <h3 className="text-2xl font-bold text-slate-900">Rp 45.5M</h3>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white rounded-2xl md:rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-slate-50 text-primary rounded-xl">
            <Calendar size={24}  />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">{t('Dashboard.upcomingSchedule')}</p>
            <h3 className="text-2xl font-bold text-slate-900">3</h3>
          </div>
        </div>
      </div>

      {/* Tasks Table Section */}
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-900">{t('Dashboard.todayTasks')}</h2>
          <button className="text-sm font-medium text-primary hover:text-primary transition-colors">
            {t('Dashboard.seeAll')}
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider">{t('Dashboard.task')}</th>
                <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider">{t('Dashboard.clientProperty')}</th>
                <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider">{t('Dashboard.time')}</th>
                <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider">{t('Dashboard.status')}</th>
                <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider text-right">{t('Dashboard.action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Row 1 */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <ShieldCheck size={18} className=""  />
                    <span className="text-sm font-medium text-slate-900">{t('Dashboard.showingProperty')}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-600">Budi Santoso - Villa Indah</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2 text-slate-500">
                    <Clock size={16}  />
                    <span className="text-sm">10:00 WIB</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                    {t('Dashboard.waiting')}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreHorizontal size={18}  />
                  </button>
                </td>
              </tr>
              
              {/* Row 2 */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <ShieldCheck size={18} className=""  />
                    <span className="text-sm font-medium text-slate-900">{t('Dashboard.followUpDoc')}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-600">Siti Aminah</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2 text-slate-500">
                    <Clock size={16}  />
                    <span className="text-sm">13:30 WIB</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-50 text-primary">
                    {t('Dashboard.ongoing')}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreHorizontal size={18}  />
                  </button>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <ShieldCheck size={18} className=""  />
                    <span className="text-sm font-medium text-slate-900 line-through">{t('Dashboard.internalMeeting')}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-600">Internal HQ</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2 text-slate-500">
                    <Clock size={16}  />
                    <span className="text-sm">08:00 WIB</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                    {t('Dashboard.done')}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreHorizontal size={18}  />
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
