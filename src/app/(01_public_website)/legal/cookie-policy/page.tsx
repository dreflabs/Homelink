import React from 'react';
import { Cookie, Shield, Eye, Lock, Settings, Mail, Info, FileText } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Kebijakan Cookie | HomeLink 2.0',
  description: 'Informasi mengenai penggunaan cookie dan teknologi pelacakan pada platform HomeLink 2.0',
};

export default function CookiePolicyPage() {
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
              <a href="#apa-itu-cookie" className="group flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-blue-600 hover:bg-slate-100/60 transition-colors">
                <Cookie className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                <span className="truncate">Apa Itu Cookie?</span>
              </a>
              <a href="#jenis-cookie" className="group flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-blue-600 hover:bg-slate-100/60 transition-colors">
                <Shield className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                <span className="truncate">Jenis Cookie yang Kami Gunakan</span>
              </a>
              <a href="#penggunaan-cookie" className="group flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-blue-600 hover:bg-slate-100/60 transition-colors">
                <Eye className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                <span className="truncate">Tujuan Penggunaan Cookie</span>
              </a>
              <a href="#pengaturan-cookie" className="group flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-blue-600 hover:bg-slate-100/60 transition-colors">
                <Settings className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                <span className="truncate">Mengelola & Menolak Cookie</span>
              </a>
              <a href="#perubahan-kebijakan" className="group flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-blue-600 hover:bg-slate-100/60 transition-colors">
                <Lock className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                <span className="truncate">Perubahan Kebijakan</span>
              </a>
              <a href="#kontak" className="group flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-blue-600 hover:bg-slate-100/60 transition-colors">
                <Mail className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                <span className="truncate">Hubungi Kami</span>
              </a>
            </nav>
            <div className="mt-8 border-t border-slate-200 pt-6 space-y-2">
              <Link href="/legal/privacy-policy" className="block text-sm font-medium text-blue-600 hover:text-blue-500">
                Lihat Kebijakan Privasi &rarr;
              </Link>
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
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 mb-4">
                    <Cookie className="h-3.5 w-3.5" />
                    <span>Privasi & Transparansi Data</span>
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    Kebijakan Cookie
                  </h1>
                  <p className="mt-4 text-base text-slate-500">
                    Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>

                <div className="prose prose-blue max-w-none prose-headings:text-slate-900 prose-a:text-blue-600 space-y-8">
                  
                  <section id="pendahuluan" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <span>1. Pendahuluan</span>
                    </h2>
                    <p className="leading-relaxed">
                      Selamat datang di HomeLink 2.0. Kami menjunjung tinggi transparansi dalam cara kami mengumpulkan dan memproses informasi Anda. 
                      Kebijakan Cookie ini menjelaskan bagaimana platform HomeLink 2.0 ("kami") menggunakan cookie dan teknologi serupa 
                      untuk mengenali Anda saat berkunjung ke platform kami, menjaga sesi autentikasi, dan meningkatkan pengalaman pencarian serta transaksi properti Anda.
                    </p>
                    <p className="leading-relaxed mt-3">
                      Penggunaan cookie kami diselaraskan dengan Undang-Undang Pelindungan Data Pribadi (UU PDP) serta standar privasi global untuk menjamin keamanan data Anda.
                    </p>
                  </section>

                  <section id="apa-itu-cookie" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                      2. Apa Itu Cookie?
                    </h2>
                    <p className="leading-relaxed">
                      Cookie adalah berkas teks kecil yang ditempatkan di perangkat komputer, tablet, atau smartphone Anda saat mengakses situs web. 
                      Cookie secara luas digunakan untuk membuat situs web bekerja secara efisien, mengingat preferensi pengguna (seperti status login atau filter pencarian properti), 
                      serta memberikan informasi analitis kepada pengelola situs.
                    </p>
                  </section>

                  <section id="jenis-cookie" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                      3. Jenis Cookie yang Kami Gunakan
                    </h2>
                    <p className="leading-relaxed mb-4">
                      HomeLink 2.0 menggunakan beberapa kategori cookie untuk mengoperasikan platform secara optimal:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mt-4">
                      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
                        <div className="flex items-center gap-2 font-semibold text-slate-900 mb-2">
                          <Lock className="h-4 w-4 text-blue-600" />
                          <span>Cookie Esensial (Wajib)</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Sangat diperlukan agar Anda dapat menavigasi platform, masuk ke akun pengguna, dan menggunakan fitur keamanan transaksi properti.
                        </p>
                      </div>

                      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
                        <div className="flex items-center gap-2 font-semibold text-slate-900 mb-2">
                          <Settings className="h-4 w-4 text-emerald-600" />
                          <span>Cookie Fungsionalitas</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Mengingat pilihan yang Anda buat (seperti bahasa, preferensi wilayah pencarian, atau status dasbor) untuk memberikan pengalaman yang dipersonalisasi.
                        </p>
                      </div>

                      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
                        <div className="flex items-center gap-2 font-semibold text-slate-900 mb-2">
                          <Eye className="h-4 w-4 text-amber-600" />
                          <span>Cookie Kinerja & Analitis</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Mengumpulkan informasi anonim tentang bagaimana pengunjung menggunakan situs kami (misalnya halaman properti mana yang paling sering dikunjungi) untuk optimasi kecepatan sistem.
                        </p>
                      </div>

                      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
                        <div className="flex items-center gap-2 font-semibold text-slate-900 mb-2">
                          <Shield className="h-4 w-4 text-indigo-600" />
                          <span>Cookie Verifikasi & Keamanan</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Mendukung sistem "Verified Property" untuk mencegah serangan CSRF, bot, dan akses tidak sah pada fitur agen/pemilik.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section id="penggunaan-cookie" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                      4. Tujuan Penggunaan Cookie
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                      <li>Menjaga status autentikasi sesi pengguna saat berpindah halaman dasbor.</li>
                      <li>Menyimpan kriteria pencarian properti dan properti favorit sementara.</li>
                      <li>Meningkatkan performa sistem dan mengurangi waktu pemuatan halaman (caching).</li>
                      <li>Memastikan perlindungan anti-penipuan pada pemesanan survei properti.</li>
                    </ul>
                  </section>

                  <section id="pengaturan-cookie" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                      5. Mengelola & Menolak Cookie
                    </h2>
                    <p className="leading-relaxed">
                      Sebagian besar peramban web secara otomatis menerima cookie. Namun, Anda dapat mengubah pengaturan peramban Anda untuk menolak cookie atau memberi tahu Anda saat cookie sedang dikirim.
                    </p>
                    <p className="leading-relaxed mt-3">
                      Perlu diperhatikan bahwa jika Anda memilih untuk menonaktifkan atau menolak cookie esensial, beberapa bagian dari platform HomeLink 2.0 (seperti login akun, simpan properti favorit, atau dasbor pemilik) mungkin tidak berfungsi sebagaimana mestinya.
                    </p>
                  </section>

                  <section id="perubahan-kebijakan" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                      6. Perubahan Pada Kebijakan Cookie
                    </h2>
                    <p className="leading-relaxed">
                      Kami dapat memperbarui Kebijakan Cookie ini dari waktu ke waktu untuk mencerminkan perubahan teknologi, ketentuan hukum, atau operasional platform kami. Pembaruan akan berlaku segera setelah diterbitkan di halaman ini.
                    </p>
                  </section>

                  <section id="kontak" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                      7. Hubungi Kami
                    </h2>
                    <p className="leading-relaxed">
                      Jika Anda memiliki pertanyaan atau kekhawatiran tentang penggunaan cookie pada platform kami, silakan hubungi tim legal kami:
                    </p>
                    <div className="mt-4 p-5 bg-slate-50 rounded-xl border border-slate-200/80 not-prose">
                      <p className="font-semibold text-slate-900">Data Protection Officer / Tim Legal HomeLink 2.0</p>
                      <p className="text-sm text-slate-600 mt-1">Email: legal@homelink.id</p>
                      <p className="text-sm text-slate-600 mt-1">Telepon: +62 21 555 1234</p>
                      <p className="text-sm text-slate-600 mt-1">Alamat: HomeLink Tower Lt. 18, Jakarta Selatan, Indonesia</p>
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
