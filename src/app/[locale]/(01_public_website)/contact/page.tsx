import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";

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
      <section className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              {t('h1')}
            </h1>
            <p className="text-lg text-slate-600 mb-12">
              {t('description')}
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-lg text-blue-700">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{t('hq')}</h3>
                  <p className="text-slate-600 mt-1">Sudirman Central Business District (SCBD)<br />Jakarta Selatan, 12190</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-lg text-blue-700">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{t('phone')}</h3>
                  <p className="text-slate-600 mt-1">+62 21 1234 5678</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-lg text-blue-700">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{t('email')}</h3>
                  <p className="text-slate-600 mt-1">hello@homelink.id</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
            <h2 className="text-2xl font-semibold mb-6 text-slate-900">{t('sendMessage')}</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">{t('firstName')}</label>
                  <Input placeholder={t('firstNamePlaceholder')} className="bg-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">{t('lastName')}</label>
                  <Input placeholder={t('lastNamePlaceholder')} className="bg-white" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">{t('emailAddress')}</label>
                <Input type="email" placeholder={t('emailPlaceholder')} className="bg-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">{t('yourMessage')}</label>
                <Textarea placeholder={t('messagePlaceholder')} className="bg-white min-h-[150px]" />
              </div>
              <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white h-12 text-base font-semibold">
                {t('submit')}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
