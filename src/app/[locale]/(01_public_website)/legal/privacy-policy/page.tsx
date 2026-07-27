import React from 'react';
import { useTranslations } from 'next-intl';
import { Shield, Lock, Eye, Database, Cookie, Mail, Info } from "lucide-react";
import Link from 'next/link';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi',
  description: 'Kebijakan Privasi dan Perlindungan Data Pengguna HomeLink 2.0',
  openGraph: {
    title: 'Kebijakan Privasi | HomeLink 2.0',
    description: 'Pelajari bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda di HomeLink 2.0.',
    url: 'https://homelink.id/legal/privacy-policy',
    locale: 'id_ID',
    type: 'website',
  }
};

export default function PrivacyPolicyPage() {
  const t = useTranslations('Public.PrivacyPolicy');
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
              <a href="#pendahuluan" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-primary hover:bg-gray-50">
                <Info className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-gray-400 group-hover:text-primary" />
                <span className="truncate">{t('intro')}</span>
              </a>
              <a href="#pengumpulan-data" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-primary hover:bg-gray-50">
                <Database className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-gray-400 group-hover:text-primary" />
                <span className="truncate">{t('data_collection')}</span>
              </a>
              <a href="#penggunaan-data" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-primary hover:bg-gray-50">
                <Eye className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-primary" />
                <span className="truncate">{t('data_usage')}</span>
              </a>
              <a href="#keamanan" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-primary hover:bg-gray-50">
                <Lock className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-gray-400 group-hover:text-primary" />
                <span className="truncate">{t('security')}</span>
              </a>
              <a href="#cookies" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-primary hover:bg-gray-50">
                <Cookie className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-gray-400 group-hover:text-primary" />
                <span className="truncate">{t('cookies')}</span>
              </a>
              <a href="#hak-pengguna" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-primary hover:bg-gray-50">
                <Shield className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-primary" />
                <span className="truncate">{t('user_rights')}</span>
              </a>
              <a href="#kontak" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-primary hover:bg-gray-50">
                <Mail className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-primary" />
                <span className="truncate">{t('contact')}</span>
              </a>
            </nav>
            <div className="mt-8 border-t border-gray-200 pt-6">
              <Link href="/legal/terms" className="text-sm font-medium text-primary hover:text-primary">
                {t('terms_link')}
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
                  <section id="pendahuluan" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. {t('intro')}</h2>
                    <p>
                      {t('p1')}
                    </p>
                    <p>
                      {t('p2')}
                    </p>
                  </section>

                  <section id="pengumpulan-data" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">2. {t('data_collection')}</h2>
                    <p>{t('p3')}</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>{t('collection_1')}</li>
                      <li>{t('collection_2')}</li>
                      <li>{t('collection_3')}</li>
                      <li>{t('collection_4')}</li>
                    </ul>
                  </section>

                  <section id="penggunaan-data" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">3. {t('data_usage')}</h2>
                    <p>{t('p4')}</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>{t('usage_1')}</li>
                      <li>{t('usage_2')}</li>
                      <li>{t('usage_3')}</li>
                      <li>{t('usage_4')}</li>
                      <li>{t('usage_5')}</li>
                    </ul>
                  </section>

                  <section id="keamanan" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">4. {t('security')}</h2>
                    <p>
                      {t('p5')}
                    </p>
                  </section>

                  <section id="cookies" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">5. {t('cookies')}</h2>
                    <p>
                      {t('p6')}
                    </p>
                  </section>

                  <section id="hak-pengguna" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">6. {t('user_rights')}</h2>
                    <p>{t('p7')}</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>{t('rights_1')}</li>
                      <li>{t('rights_2')}</li>
                      <li>{t('rights_3')}</li>
                      <li>{t('rights_4')}</li>
                      <li>{t('rights_5')}</li>
                    </ul>
                  </section>

                  <section id="kontak" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">7. {t('contact')}</h2>
                    <p>
                      {t('contact_1')}
                    </p>
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100 whitespace-pre-line text-gray-600">
                      <p className="font-medium text-gray-900">{t('contact_info')}</p>
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
