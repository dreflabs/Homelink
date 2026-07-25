import { ReactNode } from "react";
import Link from "next/link";
import { User, Calendar, Menu, LayoutDashboard, FileText, MessageSquare, Settings, FileSearch } from "lucide-react";

export default function BuyerDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Buyer Dashboard</h2>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Overview</span>
          </Link>
          <Link href="/my-profile" className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <User className="w-5 h-5" />
            <span className="font-medium">Profil</span>
          </Link>
          <Link href="/schedule" className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Jadwal Kunjungan</span>
          </Link>
          <Link href="/offers" className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <FileSearch className="w-5 h-5" />
            <span className="font-medium">Penawaran</span>
          </Link>
          <Link href="/documents" className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <FileText className="w-5 h-5" />
            <span className="font-medium">Dokumen</span>
          </Link>
          <Link href="/messages" className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">Pesan</span>
          </Link>
          <Link href="/settings" className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Pengaturan</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header - Mobile */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Buyer Dashboard</h2>
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Menu className="w-6 h-6 text-gray-600" />
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
