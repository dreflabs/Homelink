import Link from "next/link";
import { Bot, Home, LineChart, Sparkles } from "lucide-react";

export default function AILayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-zinc-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-950/50 hidden md:flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Core AI
            </h2>
          </div>
          
          <nav className="flex flex-col gap-2">
            <Link 
              href="/ai/assistant" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800/50 transition-all text-zinc-300 hover:text-white"
            >
              <Bot className="w-5 h-5 text-blue-400" />
              <span className="font-medium">AI Assistant</span>
            </Link>
            
            <Link 
              href="/ai/valuation" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800/50 transition-all text-zinc-300 hover:text-white"
            >
              <Home className="w-5 h-5 text-purple-400" />
              <span className="font-medium">AI Valuation</span>
            </Link>
            
            <Link 
              href="/ai/analytics" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800/50 transition-all text-zinc-300 hover:text-white"
            >
              <LineChart className="w-5 h-5 text-emerald-400" />
              <span className="font-medium">Analytics</span>
            </Link>
          </nav>
        </div>
        
        <div className="mt-auto p-6">
          <div className="p-4 rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-900/50 border border-zinc-800">
            <p className="text-xs text-zinc-400 mb-2">Token Usage</p>
            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden mb-1">
              <div className="h-full bg-indigo-500 w-[65%] rounded-full"></div>
            </div>
            <p className="text-xs text-zinc-500 text-right">65% / 1M</p>
          </div>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 relative overflow-auto bg-black">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 blur-[128px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 blur-[128px] pointer-events-none rounded-full" />
        
        <div className="relative h-full w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
