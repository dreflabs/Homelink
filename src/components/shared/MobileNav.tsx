"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { usePathname } from "next/navigation";
import { Menu, X, Search, PlusCircle, LayoutDashboard, LogOut, Sparkles } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { Logo } from "@/components/shared/Logo";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetDescription } from "@/components/ui/sheet";

interface MobileNavProps {
  session: any;
}

export function MobileNav({ session }: { session: any }) {
  const t = useTranslations("MobileNav");
  return _MobileNav({ session, t });
}
function _MobileNav({ session, t }: MobileNavProps & { t: any }) {
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
    <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-slate-100 z-[101]">
      <SheetHeader className="sr-only">
        <SheetTitle>Mobile Navigation</SheetTitle>
        <SheetDescription>Main navigation menu for mobile devices.</SheetDescription>
      </SheetHeader>
      <div>
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6" onClick={() => setIsOpen(false)}>
          <Logo size="sm" />
        </div>
              {user && (
                <div className="mb-6 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-slate-200">
                    <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                    <AvatarFallback className="bg-slate-100 text-primary font-bold">
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
                  href="/search-result"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-slate-50 hover:text-primary transition-colors text-sm"
                >
                  <Search className="h-5 w-5 " />
                  <span>{t("search")}</span>
                </Link>

                <Link
                  href="/owner/properties/new"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-slate-50 hover:text-primary transition-colors text-sm"
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
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-primary text-sm font-semibold hover:bg-slate-50 transition-colors"
                  >
                    <Sparkles className="h-5 w-5 " />
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
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-slate-50 text-primary font-semibold hover:bg-slate-100 transition-colors text-sm"
                  >
                    <LayoutDashboard className="h-5 w-5" />
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
                      {t("login")}
                    </Button>
                  </Link>
                  <Link href="/register" className="w-full">
                    <Button className="w-full rounded-xl font-semibold shadow-sm">
                      {t("register")}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
    </SheetContent>
  );

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger
          className="inline-flex shrink-0 items-center justify-center rounded-full text-slate-700 hover:text-primary hover:bg-slate-100 transition-colors focus:outline-none p-2"
          aria-label="Buka Menu Navigasi"
        >
          <Menu className="h-6 w-6" />
        </SheetTrigger>
        {drawerContent}
      </Sheet>
    </div>
  );
}
