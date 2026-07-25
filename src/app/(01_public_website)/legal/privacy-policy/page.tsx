import React from 'react';
import { Shield, Lock, Eye, Database, Cookie, Mail, Info } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Kebijakan Privasi | HomeLink 2.0',
  description: 'Kebijakan Privasi dan Perlindungan Data Pengguna HomeLink 2.0',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          
          {/* Sidebar Navigation */}
          <div className="hidden lg:block lg:col-span-3">
            <nav className="sticky top-24 space-y-1">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Daftar Isi
              </h3>
              <a href="#pendahuluan" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-blue-600 hover:bg-gray-50">
                <Info className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                <span className="truncate">Pendahuluan</span>
              </a>
              <a href="#pengumpulan-data" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-blue-600 hover:bg-gray-50">
                <Database className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                <span className="truncate">Data yang Kami Kumpulkan</span>
              </a>
              <a href="#penggunaan-data" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-blue-600 hover:bg-gray-50">
                <Eye className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                <span className="truncate">Bagaimana Kami Menggunakan Data</span>
              </a>
              <a href="#keamanan" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-blue-600 hover:bg-gray-50">
                <Lock className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                <span className="truncate">Keamanan Data</span>
              </a>
              <a href="#cookies" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-blue-600 hover:bg-gray-50">
                <Cookie className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                <span className="truncate">Cookies & Pelacakan</span>
              </a>
              <a href="#hak-pengguna" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-blue-600 hover:bg-gray-50">
                <Shield className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                <span className="truncate">Hak Pengguna</span>
              </a>
              <a href="#kontak" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-blue-600 hover:bg-gray-50">
                <Mail className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                <span className="truncate">Hubungi Kami</span>
              </a>
            </nav>
            <div className="mt-8 border-t border-gray-200 pt-6">
              <Link href="/terms" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Lihat Syarat & Ketentuan &rarr;
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
              <div className="px-4 py-6 sm:p-8 text-gray-700 space-y-8">
                <div className="border-b border-gray-200 pb-8">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Kebijakan Privasi
                  </h1>
                  <p className="mt-4 text-base text-gray-500">
                    Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>

                <div className="prose prose-blue max-w-none prose-headings:text-gray-900 prose-a:text-blue-600">
                  <section id="pendahuluan" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Pendahuluan</h2>
                    <p>
                      Selamat datang di HomeLink 2.0. Kami menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda. 
                      Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan, dan menjaga informasi 
                      Anda saat Anda mengunjungi situs web kami atau menggunakan layanan kami.
                    </p>
                    <p>
                      Sesuai dengan Undang-Undang Pelindungan Data Pribadi (UU PDP), kami memastikan bahwa semua praktik pengelolaan data 
                      kami mematuhi standar hukum tertinggi demi menjaga kepercayaan dan keamanan Anda.
                    </p>
                  </section>

                  <section id="pengumpulan-data" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">2. Data yang Kami Kumpulkan</h2>
                    <p>Kami mengumpulkan beberapa jenis informasi dari dan tentang pengguna layanan kami, termasuk:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>
                        <strong>Informasi Pribadi:</strong> Nama lengkap, alamat email, nomor telepon, alamat surat-menyurat, 
                        dan kredensial akun.
                      </li>
                      <li>
                        <strong>Informasi Properti:</strong> Data terkait properti yang Anda daftarkan, cari, atau minati, 
                        termasuk lokasi, harga, foto, dan dokumen legal properti.
                      </li>
                      <li>
                        <strong>Informasi Finansial:</strong> Detail pembayaran untuk layanan premium atau transaksi properti 
                        (diproses secara aman melalui mitra gateway pembayaran kami).
                      </li>
                      <li>
                        <strong>Informasi Teknis:</strong> Alamat IP, jenis peramban, sistem operasi, dan data interaksi 
                        Anda dengan platform kami.
                      </li>
                    </ul>
                  </section>

                  <section id="penggunaan-data" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">3. Bagaimana Kami Menggunakan Data Anda</h2>
                    <p>Data yang kami kumpulkan digunakan untuk tujuan berikut:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>Memfasilitasi transaksi properti antara pembeli, penjual, dan agen.</li>
                      <li>Memverifikasi identitas dan keabsahan properti (Verified Property).</li>
                      <li>Memberikan pengalaman pengguna yang dipersonalisasi dan rekomendasi properti yang relevan.</li>
                      <li>Berkomunikasi dengan Anda mengenai layanan, pembaruan, atau dukungan pelanggan.</li>
                      <li>Mendeteksi, mencegah, dan menangani masalah teknis, penipuan, atau aktivitas ilegal lainnya.</li>
                    </ul>
                  </section>

                  <section id="keamanan" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">4. Keamanan Data</h2>
                    <p>
                      Keamanan data Anda sangat penting bagi kami. Kami menerapkan langkah-langkah teknis dan administratif yang kuat 
                      untuk melindungi informasi pribadi Anda dari akses, penggunaan, modifikasi, atau pengungkapan yang tidak sah. 
                      Namun, perlu diingat bahwa tidak ada metode transmisi melalui internet atau penyimpanan elektronik yang 100% aman.
                    </p>
                  </section>

                  <section id="cookies" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">5. Cookies dan Teknologi Pelacakan</h2>
                    <p>
                      Kami menggunakan cookies dan teknologi pelacakan serupa untuk memantau aktivitas pada layanan kami dan menyimpan 
                      informasi tertentu. Anda dapat menginstruksikan peramban Anda untuk menolak semua cookies atau memberikan indikasi 
                      ketika cookies sedang dikirim. Jika Anda tidak menerima cookies, Anda mungkin tidak dapat menggunakan sebagian dari 
                      layanan kami.
                    </p>
                  </section>

                  <section id="hak-pengguna" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">6. Hak-Hak Anda (Sesuai UU PDP)</h2>
                    <p>Sebagai subjek data, Anda memiliki hak-hak berikut:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>Hak untuk mengakses data pribadi Anda yang kami proses.</li>
                      <li>Hak untuk memperbaiki data yang tidak akurat atau tidak lengkap.</li>
                      <li>Hak untuk meminta penghapusan data (Right to be Forgotten) dalam kondisi tertentu.</li>
                      <li>Hak untuk menolak atau membatasi pemrosesan data tertentu.</li>
                      <li>Hak atas portabilitas data.</li>
                    </ul>
                  </section>

                  <section id="kontak" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">7. Hubungi Kami</h2>
                    <p>
                      Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau ingin menggunakan hak-hak Anda terkait data 
                      pribadi, silakan hubungi Tim Legal / DPO (Data Protection Officer) kami:
                    </p>
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="font-medium text-gray-900">Email: legal@homelink.id</p>
                      <p className="text-gray-600 mt-1">Telepon: +62 21 555 1234</p>
                      <p className="text-gray-600 mt-1">Alamat: HomeLink Tower Lt. 18, Jakarta Selatan, Indonesia</p>
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
