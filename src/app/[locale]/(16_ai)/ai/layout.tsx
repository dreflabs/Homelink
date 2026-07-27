export const dynamic = 'force-dynamic';

import Link from "next/link";
import Image from "next/image";
import { Bot, Building, ChartCandlestick, Sparkles } from "lucide-react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AILayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  const role = (session.user as any)?.role;
  if (role !== "OWNER" && role !== "ADMIN" && role !== "SUPER_ADMIN") {
    redirect("/unauthorized");
  }

  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-white hidden md:flex flex-col shadow-sm">
        <div className="p-6">
          <Link href="/" className="flex items-center mb-8">
            <Image
              src="/LOGO_UTAMA_HOMELINK.png"
              alt="HomeLink Logo"
              width={130}
              height={38}
              className="h-8 w-auto object-contain"
            />
          </Link>
          
          <nav className="flex flex-col gap-1">
            <Link 
              href="/ai/assistant" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 hover:text-primary transition-all text-slate-600 font-medium"
            >
              <Bot className="w-5 h-5 text-primary" />
              <span>AI Assistant</span>
            </Link>
            
            <Link 
              href="/ai/valuation" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 hover:text-primary transition-all text-slate-600 font-medium"
            >
              <Building className="w-5 h-5 text-primary" />
              <span>AI Valuation</span>
            </Link>
            
            <Link 
              href="/ai/analytics" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 hover:text-primary transition-all text-slate-600 font-medium"
            >
              <ChartCandlestick className="w-5 h-5 text-primary" />
              <span>Analytics</span>
            </Link>
          </nav>
        </div>
        
        <div className="mt-auto p-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-xs text-slate-500 mb-2 font-medium">Token Usage</p>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden mb-1">
              <div className="h-full bg-primary w-[65%] rounded-full"></div>
            </div>
            <p className="text-xs text-slate-400 text-right">65% / 1M</p>
          </div>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 relative overflow-auto bg-slate-50">
        <div className="relative h-full w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
