import Link from "next/link";
import { LayoutDashboard, Users, Home, FileText, CheckSquare, BarChart, Settings } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-50 border-r border-slate-200 fixed left-0 top-0 h-screen flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            HomeLink<span className="text-blue-700">.Admin</span>
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-blue-50 text-blue-700 font-medium transition-colors">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
            <Users size={20} />
            Users
          </Link>
          <Link href="/admin/properties" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
            <Home size={20} />
            Properties
          </Link>
          <Link href="/admin/reports" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
            <FileText size={20} />
            Reports
          </Link>
          <Link href="/admin/verification-queue" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
            <CheckSquare size={20} />
            Queue
          </Link>
          <Link href="/admin/analytics" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
            <BarChart size={20} />
            Analytics
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
            <Settings size={20} />
            Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-sm">
              AD
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">Admin User</p>
              <p className="text-xs text-slate-500">admin@homelink.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 flex-1">
        {children}
      </main>
    </div>
  );
}
