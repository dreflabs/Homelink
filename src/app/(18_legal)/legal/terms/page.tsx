import React from 'react';
import { Scale, FileText, AlertCircle, CreditCard, Building2, Gavel, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Syarat dan Ketentuan | HomeLink 2.0',
  description: 'Syarat dan Ketentuan Penggunaan Platform HomeLink 2.0',
};

export default function TermsAndConditionsPage() {
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
              <a href="#penerimaan" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-blue-600 hover:bg-gray-50">
                <FileText className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                <span className="truncate">Penerimaan Syarat</span>
              </a>
              <a href="#akun" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-blue-600 hover:bg-gray-50">
                <AlertCircle className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                <span className="truncate">Akun Pengguna</span>
              </a>
              <a href="#properti" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-blue-600 hover:bg-gray-50">
                <Building2 className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                <span className="truncate">Listing Properti Terverifikasi</span>
              </a>
              <a href="#larangan" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-blue-600 hover:bg-gray-50">
                <Scale className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                <span className="truncate">Aktivitas yang Dilarang</span>
              </a>
              <a href="#pembayaran" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-blue-600 hover:bg-gray-50">
                <CreditCard className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                <span className="truncate">Pembayaran & Biaya</span>
              </a>
              <a href="#tanggung-jawab" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-blue-600 hover:bg-gray-50">
                <HelpCircle className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                <span className="truncate">Batasan Tanggung Jawab</span>
              </a>
              <a href="#hukum" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-blue-600 hover:bg-gray-50">
                <Gavel className="flex-shrink-0 -ml-1 mr-3 h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                <span className="truncate">Hukum yang Berlaku</span>
              </a>
            </nav>
            <div className="mt-8 border-t border-gray-200 pt-6">
              <Link href="/privacy" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Lihat Kebijakan Privasi &rarr;
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <main className="lg:col-span-9">
            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
              <div className="px-4 py-6 sm:p-8 text-gray-700 space-y-8">
                <div className="border-b border-gray-200 pb-8">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Syarat dan Ketentuan
                  </h1>
                  <p className="mt-4 text-base text-gray-500">
                    Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>

                <div className="prose prose-blue max-w-none prose-headings:text-gray-900 prose-a:text-blue-600">
                  <section id="penerimaan" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Penerimaan Syarat</h2>
                    <p>
                      Dengan mengakses dan menggunakan platform HomeLink 2.0 ("Layanan"), Anda menyetujui untuk terikat 
                      oleh Syarat dan Ketentuan ini. Jika Anda tidak setuju dengan bagian mana pun dari ketentuan ini, 
                      Anda tidak diperkenankan untuk menggunakan Layanan.
                    </p>
                  </section>

                  <section id="akun" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">2. Akun Pengguna</h2>
                    <p>
                      Untuk menggunakan fitur tertentu dari Layanan, Anda harus mendaftar dan membuat akun. Anda setuju untuk:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>Memberikan informasi yang akurat, terkini, dan lengkap selama proses pendaftaran.</li>
                      <li>Menjaga keamanan dan kerahasiaan kata sandi Anda.</li>
                      <li>Segera memberitahu kami jika ada penggunaan tidak sah atas akun Anda.</li>
                      <li>Bertanggung jawab penuh atas semua aktivitas yang terjadi di bawah akun Anda.</li>
                    </ul>
                  </section>

                  <section id="properti" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">3. Listing Properti Terverifikasi</h2>
                    <p>
                      Sebagai bagian dari komitmen kami terhadap "Verified Property", HomeLink 2.0 menerapkan proses 
                      verifikasi yang ketat:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>Pengguna (Agen/Pemilik) harus mengunggah dokumen legal properti yang valid.</li>
                      <li>Kami berhak menolak, mengubah, atau menghapus listing yang dianggap palsu, menyesatkan, atau tidak memenuhi standar kualitas kami.</li>
                      <li>HomeLink 2.0 bertindak sebagai platform perantara, namun kami berupaya semaksimal mungkin memastikan keakuratan informasi.</li>
                    </ul>
                  </section>

                  <section id="larangan" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">4. Aktivitas yang Dilarang</h2>
                    <p>Anda setuju untuk tidak melakukan hal-hal berikut:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>Menggunakan platform untuk tujuan ilegal atau melanggar hukum setempat, nasional, atau internasional.</li>
                      <li>Memposting informasi properti palsu, manipulatif, atau yang bukan milik/hak Anda untuk dipasarkan.</li>
                      <li>Mendistribusikan virus, malware, atau kode berbahaya lainnya.</li>
                      <li>Mengganggu, memanipulasi, atau mengeksploitasi sistem keamanan HomeLink 2.0.</li>
                      <li>Melakukan scraping, data mining, atau pengumpulan data tanpa izin tertulis dari kami.</li>
                    </ul>
                  </section>

                  <section id="pembayaran" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">5. Pembayaran dan Biaya</h2>
                    <p>
                      Beberapa layanan di platform kami mungkin berbayar (seperti fitur agen premium atau listing unggulan). 
                      Semua pembayaran diproses secara aman melalui penyedia layanan pembayaran pihak ketiga yang berwenang. 
                      Anda setuju untuk membayar semua biaya yang dibebankan ke akun Anda berdasarkan ketentuan yang berlaku 
                      pada saat transaksi.
                    </p>
                  </section>

                  <section id="tanggung-jawab" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">6. Batasan Tanggung Jawab</h2>
                    <p>
                      Meskipun kami menjunjung tinggi pilar "Kepercayaan", HomeLink 2.0 disediakan "sebagaimana adanya". 
                      Kami tidak memberikan jaminan bahwa layanan akan selalu bebas dari kesalahan, gangguan, atau bug. 
                      HomeLink 2.0 tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, khusus, atau 
                      konsekuensial yang timbul dari penggunaan atau ketidakmampuan menggunakan layanan kami.
                    </p>
                  </section>

                  <section id="hukum" className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">7. Hukum yang Berlaku</h2>
                    <p>
                      Syarat dan Ketentuan ini diatur dan ditafsirkan sesuai dengan hukum Republik Indonesia. Setiap 
                      perselisihan yang timbul terkait ketentuan ini akan diselesaikan secara eksklusif di yurisdiksi 
                      pengadilan Republik Indonesia.
                    </p>
                  </section>

                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
