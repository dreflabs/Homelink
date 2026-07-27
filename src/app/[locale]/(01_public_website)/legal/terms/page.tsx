import React from 'react';
import { useTranslations } from 'next-intl';
import { Scale, FileCheck, ShieldAlert, CreditCard, Building, Gavel, HelpCircle } from 'lucide-react';
import Link from 'next/link';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Syarat dan Ketentuan',
  description: 'Syarat dan Ketentuan Penggunaan Platform HomeLink 2.0',
  openGraph: {
    title: 'Syarat dan Ketentuan | HomeLink 2.0',
    description: 'Panduan legal dan ketentuan layanan dalam menggunakan platform HomeLink 2.0.',
    url: 'https://homelink.id/legal/terms',
    locale: 'id_ID',
    type: 'website',
  }
};

export default function TermsAndConditionsPage() {
  const t = useTranslations('Public.Terms');
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          
          {/* Sidebar Navigation */}
          <div className="hidden lg:block lg:col-span-3">
            <nav className="sticky top-24 space-y-1">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                {t('toc')}
              </h3>
              <a href="#penerimaan" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-primary hover:bg-gray-50">
                <FileCheck className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-primary" />
                <span className="truncate">{t('acceptance')}</span>
              </a>
              <a href="#akun" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-primary hover:bg-gray-50">
                <ShieldAlert className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-primary" />
                <span className="truncate">{t('account')}</span>
              </a>
              <a href="#properti" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-primary hover:bg-gray-50">
                <Building className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-primary" />
                <span className="truncate">{t('property')}</span>
              </a>
              <a href="#larangan" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-primary hover:bg-gray-50">
                <Scale className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-gray-400 group-hover:text-primary" />
                <span className="truncate">{t('prohibited')}</span>
              </a>
              <a href="#pembayaran" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-primary hover:bg-gray-50">
                <CreditCard className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-primary" />
                <span className="truncate">{t('payment')}</span>
              </a>
              <a href="#tanggung-jawab" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-primary hover:bg-gray-50">
                <HelpCircle className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-gray-400 group-hover:text-primary" />
                <span className="truncate">{t('liability')}</span>
              </a>
              <a href="#hukum" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-primary hover:bg-gray-50">
                <Gavel className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-gray-400 group-hover:text-primary" />
                <span className="truncate">{t('law')}</span>
              </a>
            </nav>
            <div className="mt-8 border-t border-gray-200 pt-6">
              <Link href="/legal/privacy-policy" className="text-sm font-medium text-primary hover:text-primary">
                {t('privacy_link')}
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
              <div className="px-4 py-6 sm:p-8 text-gray-700 space-y-8">
                <div className="border-b border-gray-200 pb-8">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {t('title')}
                  </h1>
                  <p className="mt-4 text-base text-gray-500">
                    {t('updated')} {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>

                <div className="prose prose-blue max-w-none prose-headings:text-gray-900 prose-a:text-primary">
                  <section id="penerimaan" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. {t('acceptance')}</h2>
                    <p>
                      {t('p1')}
                    </p>
                  </section>

                  <section id="akun" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">2. {t('account')}</h2>
                    <p>
                      {t('p2')}
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>{t('acc_1')}</li>
                      <li>{t('acc_2')}</li>
                      <li>{t('acc_3')}</li>
                      <li>{t('acc_4')}</li>
                    </ul>
                  </section>

                  <section id="properti" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">3. {t('property')}</h2>
                    <p>
                      {t('p3')}
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>{t('prop_1')}</li>
                      <li>{t('prop_2')}</li>
                      <li>{t('prop_3')}</li>
                    </ul>
                  </section>

                  <section id="larangan" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">4. {t('prohibited')}</h2>
                    <p>{t('p4')}</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>{t('prohib_1')}</li>
                      <li>{t('prohib_2')}</li>
                      <li>{t('prohib_3')}</li>
                      <li>{t('prohib_4')}</li>
                      <li>{t('prohib_5')}</li>
                    </ul>
                  </section>

                  <section id="pembayaran" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">5. {t('payment')}</h2>
                    <p>
                      {t('p5')}
                    </p>
                  </section>

                  <section id="tanggung-jawab" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">6. {t('liability')}</h2>
                    <p>
                      {t('p6')}
                    </p>
                  </section>

                  <section id="hukum" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">7. {t('law')}</h2>
                    <p>
                      {t('p7')}
                    </p>
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
