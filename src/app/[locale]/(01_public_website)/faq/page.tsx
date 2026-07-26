import { getActiveFAQs } from "@/actions/cms";
import { getTranslations } from "next-intl/server";
import FAQClient from "./FAQClient";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pusat Bantuan & FAQ",
  description: "Temukan jawaban atas pertanyaan umum seputar layanan dan platform properti HomeLink 2.0.",
  openGraph: {
    title: "Pusat Bantuan & FAQ | HomeLink 2.0",
    description: "Temukan jawaban untuk pertanyaan umum mengenai transaksi dan pencarian properti di HomeLink.",
    url: "https://homelink.id/faq",
    locale: "id_ID",
    type: "website",
  }
};

export default async function FAQPage() {
  const faqs = await getActiveFAQs();
  const t = await getTranslations("Public.FAQ");
  
  return (
    <main className="min-h-screen bg-white">
      <section className="pt-32 pb-24 px-4 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Pusat Bantuan & FAQ
          </h1>
          <p className="text-lg text-slate-600">
            {t("subtitle")}
          </p>
        </div>

        <FAQClient faqs={faqs} />
      </section>
    </main>
  );
}
