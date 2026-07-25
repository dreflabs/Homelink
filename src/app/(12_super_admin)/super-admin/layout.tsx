import Link from "next/link";
import { 
  Home, 
  Users, 
  ScrollText, 
  Settings, 
  Building2, 
  ShieldCheck, 
  ToggleLeft, 
  Activity, 
  SlidersHorizontal, 
  Blocks 
} from "lucide-react";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-[#f6f9fc]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-white flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-100 shrink-0">
          <span className="text-lg font-bold text-gray-900 tracking-tight">
            Super Admin
          </span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
            Overview
          </div>
          <Link
            href="/super-admin"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <Home className="h-4 w-4 text-gray-400" />
            Home
          </Link>
          <Link
            href="/super-admin/system-health"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <Activity className="h-4 w-4 text-gray-400" />
            System Health
          </Link>
          
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-2 px-3">
            Management
          </div>
          <Link
            href="/super-admin/tenant-management"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <Building2 className="h-4 w-4 text-gray-400" />
            Tenants
          </Link>

          <Link
            href="/super-admin/roles-permissions"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <ShieldCheck className="h-4 w-4 text-gray-400" />
            RBAC
          </Link>

          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-2 px-3">
            System
          </div>
          <Link
            href="/super-admin/feature-flags"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <ToggleLeft className="h-4 w-4 text-gray-400" />
            Feature Flags
          </Link>
          <Link
            href="/super-admin/environment-config"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4 text-gray-400" />
            Environment
          </Link>
          <Link
            href="/super-admin/integrations"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <Blocks className="h-4 w-4 text-gray-400" />
            Integrations
          </Link>


        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen">
        <div className="flex-1 p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
