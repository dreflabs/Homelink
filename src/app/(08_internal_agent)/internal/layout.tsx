import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Building, 
  CheckSquare, 
  UserCheck, 
  Users, 
  HeadphonesIcon, 
  CircleDollarSign, 
  BarChart3, 
  Calendar, 
  FileText, 
  CheckCircle2 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50/50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-white flex flex-col shadow-sm fixed inset-y-0 left-0 z-10">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
            Internal Agent
          </h2>
          <p className="text-sm text-gray-500 mt-1">Workspace & Operations</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavItem href="/internal" icon={LayoutDashboard} label="Dashboard" />
          <NavItem href="/internal/properties" icon={Building} label="Properties" />
          <NavItem href="/internal/property-verification" icon={CheckSquare} label="Property Verification" />
          <NavItem href="/internal/owner-verification" icon={UserCheck} label="Owner Verification" />
          <NavItem href="/internal/lead-management" icon={Users} label="Lead Management" />
          <NavItem href="/internal/customer-support" icon={HeadphonesIcon} label="Customer Support" />
          <NavItem href="/internal/commission" icon={CircleDollarSign} label="Commission" />
          <NavItem href="/internal/analytics" icon={BarChart3} label="Analytics" />
          <NavItem href="/internal/calendar" icon={Calendar} label="Calendar" />
          <NavItem href="/internal/reports" icon={FileText} label="Reports" />
          <NavItem href="/internal/tasks" icon={CheckCircle2} label="Tasks" />
        </nav>
        
        <div className="p-4 border-t border-gray-200 bg-gray-50/30">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white font-semibold text-xs shadow-sm">
              AI
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">Agent System</span>
              <span className="text-xs text-gray-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Online
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen ml-64">
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  // Normally we would use usePathname here, but this is a server component by default
  // To keep it simple and avoid "use client", we'll skip active state highlighting for now,
  // or make it a client component. Let's just render the link.
  return (
    <Link 
      href={href} 
      className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
    >
      <Icon className="w-4 h-4 text-gray-400" />
      {label}
    </Link>
  );
}
