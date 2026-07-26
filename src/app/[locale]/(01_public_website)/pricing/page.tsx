import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";

export const metadata = {
  title: "Pricing | HomeLink 2.0",
  description: "Simple, transparent pricing for everyone.",
};



export default async function PricingPage() {
  const t = await getTranslations("Public.Pricing");
  const tiers = [
    {
      name: t("tiers.basic.name"),
      price: t("tiers.basic.price"),
      description: t("tiers.basic.description"),
      features: [t("tiers.basic.features.0"), t("tiers.basic.features.1"), t("tiers.basic.features.2"), t("tiers.basic.features.3")],
      buttonText: t("tiers.basic.button"),
      popular: false,
    },
    {
      name: t("tiers.pro.name"),
      price: t("tiers.pro.price"),
      period: t("tiers.pro.period"),
      description: t("tiers.pro.description"),
      features: [t("tiers.pro.features.0"), t("tiers.pro.features.1"), t("tiers.pro.features.2"), t("tiers.pro.features.3"), t("tiers.pro.features.4"), t("tiers.pro.features.5")],
      buttonText: t("tiers.pro.button"),
      popular: true,
    },
    {
      name: t("tiers.agency.name"),
      price: t("tiers.agency.price"),
      description: t("tiers.agency.description"),
      features: [t("tiers.agency.features.0"), t("tiers.agency.features.1"), t("tiers.agency.features.2"), t("tiers.agency.features.3"), t("tiers.agency.features.4")],
      buttonText: t("tiers.agency.button"),
      popular: false,
    }
  ];
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            {t("title")}
          </h1>
          <p className="text-lg text-slate-600">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <div 
              key={idx} 
              className={`bg-white rounded-3xl p-8 border ${tier.popular ? 'border-blue-600 shadow-xl relative' : 'border-slate-200 shadow-sm'}`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {t("most_popular")}
                </div>
              )}
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{tier.name}</h3>
              <p className="text-slate-500 text-sm mb-6 h-10">{tier.description}</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-slate-900">{tier.price}</span>
                {tier.period && <span className="text-slate-500 font-medium">{tier.period}</span>}
              </div>
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 shrink-0" />
                    <span className="text-slate-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full h-12 text-base font-semibold ${tier.popular ? 'bg-blue-700 hover:bg-blue-800 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'}`}
              >
                {tier.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
