import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-blue-700 p-1.5 rounded-lg">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            HomeLink<span className="text-blue-700">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/search" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">
            Cari Properti
          </Link>
          <Link href="/owner/properties/new" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">
            Pasang Iklan
          </Link>
          <div className="h-4 w-px bg-slate-200"></div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-slate-600 hover:text-blue-700 font-semibold">
                Masuk
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-blue-700 hover:bg-blue-800 text-white shadow-sm font-semibold rounded-full px-6">
                Daftar
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
