import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand & Description */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/LOGO_UTAMA_HOMELINK.png"
                alt="HomeLink Logo"
                width={140}
                height={40}
                className="h-8 w-auto object-contain"
              />
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
                <Link href="/search-result" className="text-sm text-slate-500 hover:text-blue-700 transition-colors">
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
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="text-sm text-slate-500 font-medium">100% Properti Terverifikasi</span>
            <div className="h-4 w-px bg-slate-300"></div>
            <span className="text-sm text-slate-500 font-medium">Bebas Ghost Listing</span>
            <div className="h-4 w-px bg-slate-300"></div>
            {/* Payment Badges */}
            <div className="flex items-center gap-2">
              {/* Visa */}
              <div className="bg-white border border-slate-200 rounded-md px-2.5 py-1.5 shadow-sm flex items-center justify-center" style={{height: '32px', minWidth: '52px'}}>
                <svg viewBox="0 0 750 471" xmlns="http://www.w3.org/2000/svg" height="18">
                  <rect width="750" height="471" rx="40" fill="white"/>
                  <path d="M278.2,334.4l33.4-195.7h53.4l-33.4,195.7H278.2z" fill="#00579F"/>
                  <path d="M524.3,142.8c-10.6-4-27.1-8.2-47.8-8.2c-52.7,0-89.8,26.5-90.1,64.5c-0.3,28.1,26.5,43.7,46.8,53c20.7,9.5,27.7,15.5,27.6,24c-0.1,13-16.6,18.9-31.9,18.9c-21.3,0-32.7-2.9-50.2-10l-6.9-3.1l-7.4,43.7c12.4,5.4,35.3,10.1,59.1,10.4c55.9,0,92.2-26.2,92.6-66.8c0.2-22.3-14-39.3-44.6-53.2c-18.6-9-30-15.1-29.9-24.2c0-8.1,9.7-16.8,30.6-16.8c17.4-0.3,30.1,3.5,39.9,7.5l4.8,2.2L524.3,142.8z" fill="#00579F"/>
                  <path d="M616.8,138.8h-41.2c-12.8,0-22.3,3.5-27.9,16.3L468,334.5h55.9c0,0,9.1-24,11.2-29.3c6.1,0,60.3,0.1,68.1,0.1c1.6,6.9,6.5,29.2,6.5,29.2h49.4L616.8,138.8z M550.7,264.1c4.4-11.3,21.2-54.8,21.2-54.8c-0.3,0.5,4.4-11.4,7.1-18.8l3.6,17c0,0,10.2,47,12.4,57.6L550.7,264.1L550.7,264.1z" fill="#00579F"/>
                  <path d="M232.7,138.8l-52.2,133.5l-5.6-27.2c-9.7-31.3-40-65.1-73.8-82l47.8,171.2l56.5-0.1L282,138.8L232.7,138.8z" fill="#00579F"/>
                  <path d="M131.8,138.8H46.6l-0.7,3.9c66.5,16.1,110.5,55,128.7,101.7l-18.6-89.8C152.7,142.2,143.4,139.2,131.8,138.8z" fill="#FAA61A"/>
                </svg>
              </div>
              {/* Mastercard */}
              <div className="bg-white border border-slate-200 rounded-md px-2.5 py-1.5 shadow-sm flex items-center justify-center" style={{height: '32px', minWidth: '52px'}}>
                <svg viewBox="0 0 152.407 108" xmlns="http://www.w3.org/2000/svg" height="18">
                  <rect width="152.407" height="108" rx="8" fill="white"/>
                  <circle cx="56.2" cy="54" r="34.2" fill="#EB001B"/>
                  <circle cx="96.2" cy="54" r="34.2" fill="#F79E1B"/>
                  <path d="M76.2,25.3c7.7,6.7,12.6,16.6,12.6,27.7s-4.9,21-12.6,27.7C68.5,74,63.6,64.1,63.6,53s4.9-21,12.6-27.7z" fill="#FF5F00"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
