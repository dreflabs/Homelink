import React from 'react';
import { useTranslations } from 'next-intl';
import { Cookie, Shield, Eye, Lock, Settings, Mail, Info, FileCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Kebijakan Cookie | HomeLink 2.0',
  description: 'Informasi mengenai penggunaan cookie dan teknologi pelacakan pada platform HomeLink 2.0',
};

export default function CookiePolicyPage() {
  const t = useTranslations('Public.CookiePolicy');
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
              <a href="#pendahuluan" className="group flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-primary hover:bg-slate-100/60 transition-colors">
                <Info className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-slate-400 group-hover:text-primary" />
                <span className="truncate">{t('intro')}</span>
              </a>
              <a href="#apa-itu-cookie" className="group flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-primary hover:bg-slate-100/60 transition-colors">
                <Cookie className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-slate-400 group-hover:text-primary" />
                <span className="truncate">{t('what_is')}</span>
              </a>
              <a href="#jenis-cookie" className="group flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-primary hover:bg-slate-100/60 transition-colors">
                <Shield className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 group-hover:" />
                <span className="truncate">{t('types')}</span>
              </a>
              <a href="#penggunaan-cookie" className="group flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-primary hover:bg-slate-100/60 transition-colors">
                <Eye className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 group-hover:" />
                <span className="truncate">{t('purposes')}</span>
              </a>
              <a href="#pengaturan-cookie" className="group flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-primary hover:bg-slate-100/60 transition-colors">
                <Settings className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 group-hover:" />
                <span className="truncate">{t('manage')}</span>
              </a>
              <a href="#perubahan-kebijakan" className="group flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-primary hover:bg-slate-100/60 transition-colors">
                <Lock className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-slate-400 group-hover:text-primary" />
                <span className="truncate">{t('changes')}</span>
              </a>
              <a href="#kontak" className="group flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-primary hover:bg-slate-100/60 transition-colors">
                <Mail className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 group-hover:" />
                <span className="truncate">{t('contact')}</span>
              </a>
            </nav>
            <div className="mt-8 border-t border-slate-200 pt-6 space-y-2">
              <Link href="/legal/privacy-policy" className="block text-sm font-medium text-primary hover:text-primary">
                {t('privacy_link')}
              </Link>
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
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-50 text-primary border border-slate-200 mb-4">
                    <Cookie className="h-3.5 w-3.5" />
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
                  
                  <section id="pendahuluan" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <span>1. {t('intro')}</span>
                    </h2>
                    <p className="leading-relaxed">
                      {t('p1')}
                    </p>
                    <p className="leading-relaxed mt-3">
                      {t('p2')}
                    </p>
                  </section>

                  <section id="apa-itu-cookie" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                      2. {t('what_is')}
                    </h2>
                    <p className="leading-relaxed">
                      {t('p3')}
                    </p>
                  </section>

                  <section id="jenis-cookie" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                      3. {t('types')}
                    </h2>
                    <p className="leading-relaxed mb-4">
                      {t('p4')}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mt-4">
                      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
                        <div className="flex items-center gap-2 font-semibold text-slate-900 mb-2">
                          <Lock className="h-4 w-4 text-primary" />
                          <span>{t('essential_title')}</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {t('essential_desc')}
                        </p>
                      </div>

                      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
                        <div className="flex items-center gap-2 font-semibold text-slate-900 mb-2">
                          <Settings className="h-5 w-5 " />
                          <span>{t('functional_title')}</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {t('functional_desc')}
                        </p>
                      </div>

                      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
                        <div className="flex items-center gap-2 font-semibold text-slate-900 mb-2">
                          <Eye className="h-5 w-5 " />
                          <span>{t('perf_title')}</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {t('perf_desc')}
                        </p>
                      </div>

                      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
                        <div className="flex items-center gap-2 font-semibold text-slate-900 mb-2">
                          <Shield className="h-5 w-5 " />
                          <span>{t('security_title')}</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {t('security_desc')}
                        </p>
                      </div>
                    </div>
                  </section>

                  <section id="penggunaan-cookie" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                      4. {t('purposes')}
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                      <li>{t('purpose_1')}</li>
                      <li>{t('purpose_2')}</li>
                      <li>{t('purpose_3')}</li>
                      <li>{t('purpose_4')}</li>
                    </ul>
                  </section>

                  <section id="pengaturan-cookie" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                      5. {t('manage')}
                    </h2>
                    <p className="leading-relaxed">
                      {t('manage_1')}
                    </p>
                    <p className="leading-relaxed mt-3">
                      {t('manage_2')}
                    </p>
                  </section>

                  <section id="perubahan-kebijakan" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                      6. {t('changes')}
                    </h2>
                    <p className="leading-relaxed">
                      {t('changes_1')}
                    </p>
                  </section>

                  <section id="kontak" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                      7. {t('contact')}
                    </h2>
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
