"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ClipboardList, 
  UploadCloud, 
  Calendar,
  Menu,
  X,
  LogOut,
  Bell,
  CheckSquare,
  FileText,
  Camera,
  Video
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/surveyor", icon: LayoutDashboard },
  { name: "Assignments", href: "/surveyor/assignments", icon: ClipboardList },
  { name: "Survey Form", href: "/surveyor/survey-form", icon: FileText },
  { name: "Verification", href: "/surveyor/verification", icon: CheckSquare },
  { name: "Upload Photo", href: "/surveyor/upload-photo", icon: Camera },
  { name: "Upload Video", href: "/surveyor/upload-video", icon: Video },
  { name: "Reports", href: "/surveyor/reports", icon: FileText },
  { name: "Schedule", href: "/surveyor/schedule", icon: Calendar },
];

export default function SurveyorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col md:flex-row font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      
      {/* MOBILE HEADER */}
      <header className="md:hidden sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center">
            <LayoutDashboard className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-lg tracking-tight">Surveyor</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-500 hover:text-gray-900 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white"></span>
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-sm pt-20 px-4 flex flex-col h-[100dvh]">
          <nav className="flex flex-col gap-2 flex-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isBaseRoute = item.href === "/surveyor";
              const isActive = isBaseRoute 
                ? pathname === item.href 
                : pathname?.startsWith(item.href);
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 ${
                    isActive 
                      ? "bg-blue-600 text-white font-medium shadow-md shadow-blue-500/20" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-500"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="pb-8 pt-4 border-t border-gray-100">
            <button className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-2xl w-full transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-white border-r border-gray-100/80 z-10 shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-xl tracking-tight text-gray-900">Surveyor</span>
        </div>

        <div className="px-6 mb-6">
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-2xl border border-gray-100 transition-colors hover:border-blue-100 hover:bg-blue-50/50 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm">
                JS
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">John Smith</span>
                <span className="text-xs text-gray-500">Sr. Surveyor</span>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isBaseRoute = item.href === "/surveyor";
            const isActive = isBaseRoute 
              ? pathname === item.href 
              : pathname?.startsWith(item.href);
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? "bg-blue-50 text-blue-700 font-medium" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-gray-50">
          <button className="flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl w-full transition-all duration-200">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative bg-[#F9FAFB]">
        {/* Desktop Header */}
        <header className="hidden md:flex h-20 items-center justify-end px-8 sticky top-0 bg-[#F9FAFB]/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
             <button className="relative p-2.5 text-gray-500 hover:text-gray-900 transition-colors rounded-full bg-white border border-gray-200 hover:border-gray-300 shadow-sm">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Content Wrapper */}
        <div className="flex-1 overflow-y-auto p-4 md:px-8 md:pb-8 md:pt-0">
          <div className="mx-auto max-w-5xl h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
