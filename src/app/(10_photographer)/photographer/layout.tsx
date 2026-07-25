import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, CalendarDays, Image as ImageIcon, ClipboardList } from "lucide-react";

export default function PhotographerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-900 overflow-hidden">
      {/* Sidebar - Darker Slate for Photographer Vibe */}
      <aside className="w-64 flex-shrink-0 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col selection:bg-indigo-500/30">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <span className="text-lg font-semibold tracking-tight text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-indigo-400" />
            HomeLink Studio
          </span>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          <Link
            href="/photographer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-all duration-200 group"
          >
            <LayoutDashboard className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            <span className="font-medium text-sm">Dashboard</span>
          </Link>
          
          <Link
            href="/photographer/assignments"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-all duration-200 group"
          >
            <ClipboardList className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            <span className="font-medium text-sm">Assignments</span>
          </Link>

          <Link
            href="/photographer/gallery"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-all duration-200 group"
          >
            <ImageIcon className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            <span className="font-medium text-sm">Gallery</span>
          </Link>

          <Link
            href="/photographer/schedule"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-all duration-200 group"
          >
            <CalendarDays className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            <span className="font-medium text-sm">Schedule</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white text-sm font-medium shadow-sm">
              PH
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">Photographer</span>
              <span className="text-xs text-slate-500">Creative Team</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto selection:bg-indigo-500/30">
        <div className="flex-1 p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
