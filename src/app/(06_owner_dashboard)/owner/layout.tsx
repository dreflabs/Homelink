import { ReactNode } from "react";
import Link from "next/link";
import { Menu, LayoutDashboard, Building, Calendar, FileText, Settings, BarChart2 } from "lucide-react";

export default function OwnerDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-slate-900 text-slate-300">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">Owner Dashboard</h2>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/owner/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Overview</span>
          </Link>
          <Link href="/owner/properties" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <Building className="w-5 h-5" />
            <span className="font-medium">Properti Saya</span>
          </Link>
          <Link href="/owner/property-status" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <BarChart2 className="w-5 h-5" />
            <span className="font-medium">Status & Performa</span>
          </Link>
          <Link href="/owner/schedule" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Jadwal Kunjungan</span>
          </Link>
          <Link href="/owner/documents" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <FileText className="w-5 h-5" />
            <span className="font-medium">Dokumen</span>
          </Link>
          <Link href="/owner/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Pengaturan</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header - Mobile */}
        <header className="md:hidden flex items-center justify-between p-4 bg-slate-900 text-white">
          <h2 className="text-xl font-bold">Owner Dashboard</h2>
          <button className="p-2 rounded-lg hover:bg-slate-800">
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
