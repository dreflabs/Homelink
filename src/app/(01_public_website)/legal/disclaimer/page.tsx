import React from 'react';
import { AlertTriangle, ShieldCheck, HelpCircle, Link as LinkIcon, Scale, Mail, Info } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Penafian (Disclaimer) | HomeLink 2.0',
  description: 'Sanggahan dan batasan tanggung jawab penggunaan platform HomeLink 2.0',
};

export default function DisclaimerPage() {
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
              <a href="#pendahuluan" className="group flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-blue-600 hover:bg-slate-100/60 transition-colors">
                <Info className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                <span className="truncate">Pendahuluan</span>
              </a>
              <a href="#akurasi-informasi" className="group flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-blue-600 hover:bg-slate-100/60 transition-colors">
                <ShieldCheck className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                <span className="truncate">Akurasi Informasi Properti</span>
              </a>
              <a href="#bukan-nasihat-profesional" className="group flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-blue-600 hover:bg-slate-100/60 transition-colors">
                <HelpCircle className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                <span className="truncate">Bukan Nasihat Hukum/Finansial</span>
              </a>
              <a href="#tautan-pihak-ketiga" className="group flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-blue-600 hover:bg-slate-100/60 transition-colors">
                <LinkIcon className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                <span className="truncate">Tautan Pihak Ketiga</span>
              </a>
              <a href="#batasan-tanggung-jawab" className="group flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-blue-600 hover:bg-slate-100/60 transition-colors">
                <Scale className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                <span className="truncate">Batasan Tanggung Jawab</span>
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
              <Link href="/legal/privacy-policy" className="block text-sm font-medium text-blue-600 hover:text-blue-500">
                Lihat Kebijakan Privasi &rarr;
              </Link>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-9">
            <div className="bg-white shadow-sm ring-1 ring-slate-900/5 rounded-2xl md:col-span-2 overflow-hidden">
              <div className="px-6 py-8 sm:p-10 text-slate-700 space-y-8">
                
                {/* Header Section */}
                <div className="border-b border-slate-200 pb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/80 mb-4">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    <span>Informasi & Ketentuan Hukum</span>
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    Penafian (Disclaimer)
                  </h1>
                  <p className="mt-4 text-base text-slate-500">
                    Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>

                <div className="prose prose-blue max-w-none prose-headings:text-slate-900 prose-a:text-blue-600 space-y-8">
                  
                  <section id="pendahuluan" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Pendahuluan</h2>
                    <p className="leading-relaxed">
                      Informasi yang disediakan di platform HomeLink 2.0 hanya untuk tujuan informasi umum. 
                      Meskipun kami berupaya menjaga agar informasi tetap terbaru dan akurat melalui tim verifikasi independen (surveyor), 
                      kami tidak membuat pernyataan atau jaminan dalam bentuk apa pun, tersurat maupun tersirat, tentang kelengkapan, keakuratan, 
                      keandalan, atau ketersediaan terkait dengan situs web atau informasi, produk, layanan, atau grafis terkait yang ada di platform.
                    </p>
                  </section>

                  <section id="akurasi-informasi" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Akurasi Informasi Properti</h2>
                    <p className="leading-relaxed">
                      Meskipun HomeLink 2.0 menerapkan kebijakan "Zero Ghost Listing" dan melakukan verifikasi lapangan, dinamika pasar properti dapat berubah dengan cepat. 
                      Calon pembeli dan penyewa tetap disarankan untuk melakukan uji tuntas (due diligence) mandiri, melakukan pengecekan fisik, serta memeriksa keabsahan sertifikat dan dokumen legal di instansi berwenang sebelum melakukan transaksi keuangan.
                    </p>
                  </section>

                  <section id="bukan-nasihat-profesional" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Bukan Nasihat Hukum atau Finansial</h2>
                    <p className="leading-relaxed">
                      Konten di platform HomeLink 2.0 tidak boleh ditafsirkan sebagai nasihat hukum, pajak, investasi, atau keuangan profesional. 
                      Anda harus berkonsultasi dengan profesional berlisensi (seperti notaris, konsultan hukum, atau perencana keuangan) sebelum membuat keputusan finansial atau menandatangani perjanjian jual beli properti.
                    </p>
                  </section>

                  <section id="tautan-pihak-ketiga" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Tautan Pihak Ketiga</h2>
                    <p className="leading-relaxed">
                      Platform kami mungkin berisi tautan ke situs web pihak ketiga (seperti mitra payment gateway atau penyedia jasa sertifikasi). 
                      HomeLink 2.0 tidak memiliki kendali atas konten, kebijakan privasi, atau praktik dari situs web pihak ketiga tersebut dan tidak bertanggung jawab atas kerugian yang timbul darinya.
                    </p>
                  </section>

                  <section id="batasan-tanggung-jawab" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Batasan Tanggung Jawab</h2>
                    <p className="leading-relaxed">
                      Dalam keadaan apa pun, HomeLink 2.0 beserta direksi, karyawan, atau mitranya tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari akses atau penggunaan platform ini.
                    </p>
                  </section>

                  <section id="kontak" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Hubungi Kami</h2>
                    <p className="leading-relaxed">
                      Jika Anda memiliki pertanyaan tentang Penafian ini, silakan hubungi tim legal kami:
                    </p>
                    <div className="mt-4 p-5 bg-slate-50 rounded-xl border border-slate-200/80 not-prose">
                      <p className="font-semibold text-slate-900">Tim Legal HomeLink 2.0</p>
                      <p className="text-sm text-slate-600 mt-1">Email: legal@homelink.id</p>
                      <p className="text-sm text-slate-600 mt-1">Telepon: +62 21 555 1234</p>
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
