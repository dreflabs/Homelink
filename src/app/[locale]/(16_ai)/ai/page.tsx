import Link from "next/link";
import { Bot, Building, ChartCandlestick, ArrowRight, Sparkles } from "lucide-react";

const features = [
  {
    href: "/ai/assistant",
    icon: Bot,
    title: "AI Assistant",
    description: "Tanya jawab interaktif seputar properti, investasi, dan analisis pasar.",
  },
  {
    href: "/ai/valuation",
    icon: Building,
    title: "AI Valuation",
    description: "Estimasi harga pasar properti secara instan berdasarkan detail properti.",
  },
  {
    href: "/ai/analytics",
    icon: ChartCandlestick,
    title: "AI Analytics",
    description: "Pantau metrik penggunaan, biaya token, dan performa model AI.",
  },
];

export default function AIHomePage() {
  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto p-6 md:p-10">
      <div className="flex items-center gap-2 mb-3">
        <div className="bg-primary p-1.5 rounded-lg">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-semibold text-primary uppercase tracking-wide">AI-Powered</span>
      </div>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">HomeLink AI Suite</h1>
      <p className="text-slate-500 max-w-xl leading-relaxed mb-8">
        Pilih salah satu fitur AI di bawah ini untuk mulai menjelajahi kemampuan analisis, valuasi, dan asisten cerdas HomeLink.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.href}
              href={feature.href}
              className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-200 transition-all flex flex-col"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-semibold text-slate-900 mb-1.5">{feature.title}</h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">{feature.description}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
                Buka
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
