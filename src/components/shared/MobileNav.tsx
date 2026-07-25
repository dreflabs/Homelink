"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Building2, Search, PlusCircle, LayoutDashboard, LogOut, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileNavProps {
  session: any;
}

export function MobileNav({ session }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const user = session?.user;

  // Hydration safety for React Portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Portal Drawer Content (Rendered at document.body level)
  const drawerContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Solid White Mobile Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-full max-w-xs sm:max-w-sm bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto z-[101]"
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <div className="bg-blue-700 p-1.5 rounded-lg">
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-bold text-xl tracking-tight text-slate-900">
                    HomeLink<span className="text-blue-700">.</span>
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-slate-500 hover:text-slate-800 rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* User Profile Card (if logged in) */}
              {user && (
                <div className="mb-6 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-slate-200">
                    <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                    <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">
                      {user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-sm font-semibold text-slate-900 truncate">{user.name}</span>
                    <span className="text-xs text-slate-500 truncate">{user.email}</span>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <nav className="space-y-1.5">
                <Link
                  href="/properties/search"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm"
                >
                  <Search className="h-4 w-4 text-slate-400" />
                  <span>Cari Properti</span>
                </Link>

                <Link
                  href="/owner/properties/new"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm"
                >
                  <PlusCircle className="h-4 w-4 text-slate-400" />
                  <span>Pasang Iklan</span>
                </Link>

                <div className="pt-3 pb-1 border-t border-slate-100 mt-2">
                  <p className="px-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Informasi & Layanan
                  </p>
                  <Link
                    href="/about-us"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 text-sm hover:bg-slate-50 transition-colors"
                  >
                    <span>Tentang Kami</span>
                  </Link>
                  <Link
                    href="/pricing"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 text-sm hover:bg-slate-50 transition-colors"
                  >
                    <span>Paket Harga</span>
                  </Link>
                  <Link
                    href="/faq"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 text-sm hover:bg-slate-50 transition-colors"
                  >
                    <span>FAQ & Bantuan</span>
                  </Link>
                  <Link
                    href="/ai/valuation"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-blue-700 text-sm font-semibold hover:bg-blue-50 transition-colors"
                  >
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <span>AI Valuation</span>
                  </Link>
                </div>
              </nav>
            </div>

            {/* Footer Actions */}
            <div className="pt-6 border-t border-slate-100 space-y-3 mt-6">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-colors text-sm"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Buka Dashboard</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-red-600 hover:bg-red-50 text-sm font-medium transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/login" className="w-full">
                    <Button variant="outline" className="w-full rounded-xl font-semibold border-slate-200">
                      Masuk
                    </Button>
                  </Link>
                  <Link href="/register" className="w-full">
                    <Button className="w-full rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold shadow-sm">
                      Daftar
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="text-slate-700 hover:text-blue-700 focus:outline-none rounded-full"
        aria-label="Buka Menu Navigasi"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Render Drawer into document.body using React Portal */}
      {mounted ? createPortal(drawerContent, document.body) : null}
    </div>
  );
}
