import React from 'react';
import { Award, ShieldCheck, Code, FileText, Mail, Info } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Lisensi & Hak Cipta | HomeLink 2.0',
  description: 'Ketentuan Lisensi, Hak Cipta, dan Kekayaan Intelektual HomeLink 2.0',
};

export default function LicensingPage() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          
          {/* Sidebar Navigation */}
          <div className="hidden lg:block lg:col-span-3">
            <nav className="sticky top-24 space-y-1">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
                Daftar Isi
              </h3>
              <a href="#kekayaan-intelektual" className="group flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-blue-600 hover:bg-slate-100/60 transition-colors">
                <Award className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                <span className="truncate">Hak Kekayaan Intelektual</span>
              </a>
              <a href="#konten-pengguna" className="group flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-blue-600 hover:bg-slate-100/60 transition-colors">
                <FileText className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                <span className="truncate">Konten Buatan Pengguna</span>
              </a>
              <a href="#open-source" className="group flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-blue-600 hover:bg-slate-100/60 transition-colors">
                <Code className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                <span className="truncate">Perangkat Lunak Open Source</span>
              </a>
              <a href="#batasan" className="group flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-blue-600 hover:bg-slate-100/60 transition-colors">
                <ShieldCheck className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                <span className="truncate">Batasan Penggunaan</span>
              </a>
              <a href="#kontak" className="group flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-blue-600 hover:bg-slate-100/60 transition-colors">
                <Mail className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                <span className="truncate">Hubungi Kami</span>
              </a>
            </nav>
            <div className="mt-8 border-t border-slate-200 pt-6 space-y-2">
              <Link href="/legal/terms" className="block text-sm font-medium text-blue-600 hover:text-blue-500">
                Lihat Syarat & Ketentuan &rarr;
              </Link>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-9">
            <div className="bg-white shadow-sm ring-1 ring-slate-900/5 rounded-2xl md:col-span-2 overflow-hidden">
              <div className="px-6 py-8 sm:p-10 text-slate-700 space-y-8">
                
                {/* Header Section */}
                <div className="border-b border-slate-200 pb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80 mb-4">
                    <Award className="h-3.5 w-3.5" />
                    <span>Hak Cipta & Lisensi</span>
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    Lisensi & Kekayaan Intelektual
                  </h1>
                  <p className="mt-4 text-base text-slate-500">
                    Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>

                <div className="prose prose-blue max-w-none prose-headings:text-slate-900 prose-a:text-blue-600 space-y-8">
                  
                  <section id="kekayaan-intelektual" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Hak Kekayaan Intelektual</h2>
                    <p className="leading-relaxed">
                      Seluruh konten, fitur, desain antarmuka, logo, merek dagang, gambar, dan kode perangkat lunak pada platform HomeLink 2.0 
                      adalah hak milik eksklusif HomeLink 2.0 dan dilindungi oleh Undang-Undang Hak Cipta serta hukum kekayaan intelektual Republik Indonesia dan internasional.
                    </p>
                  </section>

                  <section id="konten-pengguna" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Lisensi Konten Buatan Pengguna</h2>
                    <p className="leading-relaxed">
                      Saat Anda mengunggah listing properti, foto, atau materi pendukung ke platform kami, Anda memberikan HomeLink 2.0 lisensi non-eksklusif, bebas royalti, dan berlaku global untuk menampilkan, mendistribusikan, mempromosikan, dan memformat materi tersebut demi kepentingan pemasaran listing properti Anda.
                    </p>
                  </section>

                  <section id="open-source" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Lisensi Perangkat Lunak Open Source</h2>
                    <p className="leading-relaxed">
                      Beberapa komponen teknis platform HomeLink 2.0 memanfaatkan pustaka open-source terkemuka (seperti Next.js, React, Tailwind CSS, Lucide Icons, dan Prisma). Penggunaan pustaka tersebut tunduk pada lisensi open-source masing-masing (MIT/Apache 2.0).
                    </p>
                  </section>

                  <section id="batasan" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Batasan & Larangan Penulisan Ulang</h2>
                    <p className="leading-relaxed">
                      Pengguna dilarang menggandakan, menyalin, mendistribusikan ulang, melakukan reverse engineering, atau memanfaatkan aset visual dan merek HomeLink 2.0 tanpa izin tertulis dari manajemen HomeLink 2.0.
                    </p>
                  </section>

                  <section id="kontak" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Hubungi Kami</h2>
                    <p className="leading-relaxed">
                      Untuk pertanyaan lisensi atau izin penggunaan materi:
                    </p>
                    <div className="mt-4 p-5 bg-slate-50 rounded-xl border border-slate-200/80 not-prose">
                      <p className="font-semibold text-slate-900">Tim Legal / Lisensi HomeLink 2.0</p>
                      <p className="text-sm text-slate-600 mt-1">Email: licensing@homelink.id</p>
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
