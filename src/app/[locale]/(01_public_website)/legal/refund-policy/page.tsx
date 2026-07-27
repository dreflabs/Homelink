import React from 'react';
import { useTranslations } from 'next-intl';
import { CreditCard, ShieldCheck, RefreshCw, ShieldAlert, Mail, Info } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Kebijakan Pengembalian Dana (Refund) | HomeLink 2.0',
  description: 'Ketentuan dan Kebijakan Pengembalian Dana Layanan Premium HomeLink 2.0',
};

export default function RefundPolicyPage() {
  const t = useTranslations('Public.RefundPolicy');
  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          
          {/* Sidebar Navigation */}
          <div className="hidden lg:block lg:col-span-3">
            <nav className="sticky top-24 space-y-1">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
                {t('toc')}
              </h3>
              <a href="#gambaran-umum" className="group flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-primary hover:bg-slate-100/60 transition-colors">
                <Info className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-slate-400 group-hover:text-primary" />
                <span className="truncate">{t('overview')}</span>
              </a>
              <a href="#pembatalan-langganan" className="group flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-primary hover:bg-slate-100/60 transition-colors">
                <RefreshCw className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-slate-400 group-hover:text-primary" />
                <span className="truncate">{t('cancel')}</span>
              </a>
              <a href="#syarat-refund" className="group flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-primary hover:bg-slate-100/60 transition-colors">
                <ShieldCheck className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 group-hover:" />
                <span className="truncate">{t('eligibility')}</span>
              </a>
              <a href="#prosedur-pengajuan" className="group flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-primary hover:bg-slate-100/60 transition-colors">
                <CreditCard className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 group-hover:" />
                <span className="truncate">{t('procedure')}</span>
              </a>
              <a href="#kontak" className="group flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-primary hover:bg-slate-100/60 transition-colors">
                <Mail className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 group-hover:" />
                <span className="truncate">{t('contact')}</span>
              </a>
            </nav>
            <div className="mt-8 border-t border-slate-200 pt-6 space-y-2">
              <Link href="/legal/terms" className="block text-sm font-medium text-primary hover:text-primary">
                {t('terms_link')}
              </Link>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-9">
            <div className="bg-white shadow-sm ring-1 ring-slate-900/5 rounded-2xl md:col-span-2 overflow-hidden">
              <div className="px-6 py-8 sm:p-10 text-slate-700 space-y-8">
                
                {/* Header Section */}
                <div className="border-b border-slate-200 pb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 mb-4">
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>{t('badge')}</span>
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    {t('title')}
                  </h1>
                  <p className="mt-4 text-base text-slate-500">
                    {t('updated')} {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>

                <div className="prose prose-blue max-w-none prose-headings:text-slate-900 prose-a:text-primary space-y-8">
                  
                  <section id="gambaran-umum" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. {t('overview')}</h2>
                    <p className="leading-relaxed">
                      {t('p1')}
                    </p>
                  </section>

                  <section id="pembatalan-langganan" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. {t('cancel')}</h2>
                    <p className="leading-relaxed">
                      {t('p2')}
                    </p>
                  </section>

                  <section id="syarat-refund" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. {t('eligibility')}</h2>
                    <div className="space-y-4 not-prose">
                      <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/60 flex items-start gap-3">
                        <ShieldCheck className="h-5 w-5 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-emerald-950 block">{t('guarantee_title')}</span>
                          <span className="text-sm text-emerald-800">
                            {t('guarantee_desc')}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 flex items-start gap-3">
                        <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-amber-950 block">{t('onetime_title')}</span>
                          <span className="text-sm text-amber-800">
                            {t('onetime_desc')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section id="prosedur-pengajuan" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. {t('procedure')}</h2>
                    <p className="leading-relaxed">
                      {t('p3')}
                    </p>
                  </section>

                  <section id="kontak" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. {t('contact')}</h2>
                    <p className="leading-relaxed">
                      {t('contact_1')}
                    </p>
                    <div className="mt-4 p-5 bg-slate-50 rounded-xl border border-slate-200/80 not-prose whitespace-pre-line">
                      <p className="font-semibold text-slate-900">{t('contact_info')}</p>
                    </div>
                  </section>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
