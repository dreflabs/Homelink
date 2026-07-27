import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Search, LayoutDashboard, LogOut } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { auth, signOut } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserNav } from "@/components/shared/UserNav";
import { MobileNav } from "@/components/shared/MobileNav";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { getTranslations } from 'next-intl/server';

export async function Navbar() {
  const session = await auth();
  const user = session?.user;
  const t = await getTranslations('Navbar');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Logo size="md" />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/search-result" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
            {t('search')}
          </Link>
          <Link href={user ? "/owner/properties/new" : "/login?callbackUrl=/owner/properties/new"} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
            {t('sell')}
          </Link>
          <div className="h-4 w-px bg-slate-200"></div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            {user ? (
              <UserNav user={{ name: user.name, email: user.email, image: user.image }} />
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-slate-600 hover:text-primary font-semibold">
                    {t('login')}
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="shadow-sm font-semibold rounded-full px-6">
                    Daftar
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Navigation (Hamburger Menu) */}
        <MobileNav session={session} />
      </div>
    </header>
  );
}
