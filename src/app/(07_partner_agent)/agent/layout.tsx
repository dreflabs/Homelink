import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  Wallet,
  CalendarDays,
  ListChecks,
  FileText,
  BarChart3,
  UserCircle,
  Settings,
  LogOut,
  Target,
} from 'lucide-react';

const navItems = [
  { href: '/agent', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/agent/clients', label: 'Klien', icon: Users },
  { href: '/agent/leads', label: 'Leads', icon: Target },
  { href: '/agent/commission', label: 'Komisi', icon: Wallet },
  { href: '/agent/calendar', label: 'Kalender', icon: CalendarDays },
  { href: '/agent/tasks', label: 'Tugas', icon: ListChecks },
  { href: '/agent/documents', label: 'Dokumen', icon: FileText },
  { href: '/agent/reports', label: 'Laporan', icon: BarChart3 },
];

const bottomNavItems = [
  { href: '/agent/profile', label: 'Profil', icon: UserCircle },
  { href: '/agent/settings', label: 'Pengaturan', icon: Settings },
];

export default function PartnerAgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F7F9FC] font-sans">
      {/* Sidebar */}
      <aside className="w-[260px] border-r border-gray-200/60 bg-white shadow-[4px_0_24px_-12px_rgba(0,0,0,0.04)] px-4 py-6 flex flex-col fixed inset-y-0 left-0 z-20">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-500 shadow-md flex items-center justify-center">
            <span className="text-white font-bold text-sm tracking-wider">HL</span>
          </div>
          <span className="font-semibold text-gray-900 tracking-tight text-lg">Partner Portal</span>
        </div>

        {/* Main Nav */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 mb-2">
            Menu Utama
          </p>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium transition-all group"
            >
              <item.icon className="w-[18px] h-[18px] group-hover:text-gray-700 transition-colors" strokeWidth={2} />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}

          <div className="pt-4 mt-2 border-t border-gray-100">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 mb-2">
              Akun
            </p>
            {bottomNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium transition-all group"
              >
                <item.icon className="w-[18px] h-[18px] group-hover:text-gray-700 transition-colors" strokeWidth={2} />
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* User Footer */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between px-2 cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                AP
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">Alex Property</span>
                <span className="text-[11px] text-gray-500 font-medium">Pro Partner</span>
              </div>
            </div>
            <button className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50">
              <LogOut className="w-[18px] h-[18px]" strokeWidth={2} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-[260px] min-h-screen">
        <div className="p-8 max-w-7xl mx-auto w-full min-h-full flex flex-col">
          <div className="flex-1 flex flex-col">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
