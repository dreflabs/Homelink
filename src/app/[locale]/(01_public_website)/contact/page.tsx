import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail } from "lucide-react";
import { ContactForm } from "./ContactForm";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description: "Punya pertanyaan seputar properti? Tim HomeLink 2.0 siap membantu Anda kapan saja.",
  openGraph: {
    title: "Hubungi Tim HomeLink 2.0",
    description: "Pusat bantuan dan layanan pelanggan platform properti terverifikasi #1.",
    url: "https://homelink.id/contact",
    locale: "id_ID",
    type: "website",
  }
};

export default function ContactPage() {
  const t = useTranslations('Public.Contact');
  return (
    <main className="min-h-screen bg-white">
      <section className="py-24 lg:py-32 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 leading-[1.05] mb-6">
              {t('h1')}
            </h1>
            <p className="text-lg text-slate-600 mb-12">
              {t('description')}
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-slate-50 p-3 rounded-lg text-primary">
                  <MapPin className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{t('hq')}</h3>
                  <p className="text-slate-600 mt-1">Sudirman Central Business District (SCBD)<br />Jakarta Selatan, 12190</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-slate-50 p-3 rounded-lg text-primary">
                  <Phone className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{t('phone')}</h3>
                  <p className="text-slate-600 mt-1">+62 21 1234 5678</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-slate-50 p-3 rounded-lg text-primary">
                  <Mail className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{t('email')}</h3>
                  <p className="text-slate-600 mt-1">hello@homelink.id</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-card">
            <h2 className="text-2xl font-semibold mb-6 text-slate-900 tracking-tighter leading-[1.05]">{t('sendMessage')}</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
