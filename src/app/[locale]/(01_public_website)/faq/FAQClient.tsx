"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export default function FAQClient({ faqs }: { faqs: FAQ[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const t = useTranslations("Public.FAQ");

  if (faqs.length === 0) {
    return (
      <div className="text-center text-slate-500 py-12">
        {t("empty")}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => (
        <div 
          key={faq.id} 
          className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-200"
        >
          <button
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
          >
            <span className="font-semibold text-slate-900">{faq.question}</span>
            <ChevronDown 
              className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${openIdx === idx ? 'rotate-180' : ''}`} 
            />
          </button>
          <div 
            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIdx === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="p-6 bg-white text-slate-600 leading-relaxed border-t border-slate-200">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
