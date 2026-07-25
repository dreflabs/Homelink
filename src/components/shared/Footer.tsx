import Link from "next/link";
import { Building2 } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand & Description */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-blue-700 p-1.5 rounded-lg">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                HomeLink<span className="text-blue-700">.</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              The Apple of the Indonesian Property Industry. Platform properti terpercaya dengan jaminan 100% properti terverifikasi, tanpa iklan, dan tanpa ghost listing.
            </p>
          </div>

          {/* Perusahaan */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Perusahaan</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about-us" className="text-sm text-slate-500 hover:text-blue-700 transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-slate-500 hover:text-blue-700 transition-colors">
                  Karir
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-500 hover:text-blue-700 transition-colors">
                  Hubungi Kami
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-slate-500 hover:text-blue-700 transition-colors">
                  Harga
                </Link>
              </li>
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Layanan</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/search" className="text-sm text-slate-500 hover:text-blue-700 transition-colors">
                  Cari Properti
                </Link>
              </li>
              <li>
                <Link href="/owner/properties/new" className="text-sm text-slate-500 hover:text-blue-700 transition-colors">
                  Pasang Iklan
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-slate-500 hover:text-blue-700 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/help-center" className="text-sm text-slate-500 hover:text-blue-700 transition-colors">
                  Pusat Bantuan
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/legal/terms" className="text-sm text-slate-500 hover:text-blue-700 transition-colors">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy-policy" className="text-sm text-slate-500 hover:text-blue-700 transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/legal/cookie-policy" className="text-sm text-slate-500 hover:text-blue-700 transition-colors">
                  Kebijakan Cookie
                </Link>
              </li>
              <li>
                <Link href="/legal/refund-policy" className="text-sm text-slate-500 hover:text-blue-700 transition-colors">
                  Kebijakan Pengembalian Dana
                </Link>
              </li>
              <li>
                <Link href="/legal/disclaimer" className="text-sm text-slate-500 hover:text-blue-700 transition-colors">
                  Penolakan Tanggung Jawab
                </Link>
              </li>
              <li>
                <Link href="/legal/licensing" className="text-sm text-slate-500 hover:text-blue-700 transition-colors">
                  Lisensi
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} HomeLink 2.0. Hak cipta dilindungi undang-undang.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-sm text-slate-500 font-medium">100% Properti Terverifikasi</span>
            <div className="h-4 w-px bg-slate-300"></div>
            <span className="text-sm text-slate-500 font-medium">Bebas Ghost Listing</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
