"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

export interface SidebarLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface DashboardLayoutWrapperProps {
  children: React.ReactNode;
  title: string;
  links: SidebarLink[];
  sidebarTheme?: "light" | "dark";
}

export function DashboardLayoutWrapper({
  children,
  title,
  links,
  sidebarTheme = "light"
}: DashboardLayoutWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on path change (mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isDark = sidebarTheme === "dark";

  const sidebarClasses = cn(
    "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex flex-col h-full",
    isDark ? "bg-slate-900 text-slate-300" : "bg-white border-r border-gray-200 shadow-sm md:shadow-none",
    isOpen ? "translate-x-0" : "-translate-x-full"
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden w-full">
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside className={sidebarClasses}>
        <div className={cn(
          "p-6 border-b flex justify-between items-center h-16 shrink-0",
          isDark ? "border-slate-800" : "border-gray-100"
        )}>
          <h2 className={cn("text-xl font-bold truncate", isDark ? "text-white" : "text-gray-800")}>{title}</h2>
          <button 
            className="md:hidden p-1 rounded-md hover:bg-black/10"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(`${link.href}/`) && link.href !== '/');
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                  isDark
                    ? isActive 
                      ? "bg-slate-800 text-white font-medium" 
                      : "hover:bg-slate-800/50 hover:text-white"
                    : isActive 
                      ? "bg-blue-50 text-blue-700 font-semibold shadow-sm" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
                )}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={cn(
          "p-4 border-t shrink-0",
          isDark ? "border-slate-800" : "border-gray-100"
        )}>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium",
              isDark 
                ? "text-red-400 hover:bg-slate-800 hover:text-red-300" 
                : "text-red-600 hover:bg-red-50 hover:text-red-700"
            )}
          >
            <LogOut className="w-5 h-5" />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative h-full">
        <header className={cn(
          "md:hidden flex items-center justify-between p-4 border-b shrink-0 h-16",
          isDark ? "bg-slate-900 text-white border-slate-800" : "bg-white text-gray-800 border-gray-100 shadow-sm"
        )}>
          <h2 className="text-lg font-bold truncate pr-4">{title}</h2>
          <button 
            className={cn("p-2 rounded-lg transition-colors", isDark ? "hover:bg-slate-800" : "hover:bg-gray-100")}
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6 relative w-full bg-gray-50/50">
          {children}
        </div>
      </main>
    </div>
  );
}
