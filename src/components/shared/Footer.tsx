import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/shared/Logo";
import { ShieldCheck } from "lucide-react";

export async function Footer() {
  const t = await getTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 pt-24 pb-12 text-slate-400 border-t border-slate-900">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Brand Story Section */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-16 mb-20 border-b border-slate-800 pb-20">
          
          {/* Manifesto */}
          <div className="max-w-2xl">
            <Logo size="lg" variant="light" className="mb-8" />
            <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-6 tracking-tight leading-snug">
              {t('headline')}
            </h3>
            <p className="text-lg leading-relaxed text-slate-400">
              {t('description')}
            </p>
          </div>

          {/* Quick Links (Minimalist) */}
          <div className="grid grid-cols-2 gap-12 w-full md:w-auto shrink-0">
            <div>
              <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">{t("platform")}</h4>
              <ul className="space-y-4">
                <li><Link href="/search-result" className="hover:text-white transition-colors">{t("collections")}</Link></li>
                <li><Link href="/ai/valuation" className="hover:text-white transition-colors">{t("ai_valuation")}</Link></li>
                <li><Link href="/owner/properties/new" className="hover:text-white transition-colors">{t("sell_property")}</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">{t("pricing")}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">{t("company")}</h4>
              <ul className="space-y-4">
                <li><Link href="/about-us" className="hover:text-white transition-colors">{t("about")}</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">{t("careers")}</Link></li>
                <li><Link href="/press" className="hover:text-white transition-colors">{t("press")}</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">{t("contact")}</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Trust & Legal Footer */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-6 flex-wrap justify-center lg:justify-start">
            <div className="flex items-center gap-2 text-emerald-400 font-medium">
              <ShieldCheck className="w-5 h-5" />
              <span>{t("verified_100")}</span>
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-800" />
            <div className="flex items-center gap-2">
              <span className="text-slate-300">{t("no_ghost")}</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link href="/legal/privacy-policy" className="hover:text-white transition-colors">{t("privacy")}</Link>
            <Link href="/legal/terms" className="hover:text-white transition-colors">{t("terms")}</Link>
            <span>&copy; {currentYear} HomeLink 2.0. {t("rights")}</span>
          </div>

        </div>
      </div>
    </footer>
  );
}
