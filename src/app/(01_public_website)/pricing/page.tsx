import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const metadata = {
  title: "Pricing | HomeLink 2.0",
  description: "Simple, transparent pricing for everyone.",
};

const tiers = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for exploring and finding your dream home.",
    features: [
      "Access to all verified listings",
      "Save up to 10 properties",
      "Basic email support",
      "Standard search filters"
    ],
    buttonText: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "Rp 149.000",
    period: "/month",
    description: "For serious buyers and independent owners.",
    features: [
      "Everything in Basic",
      "Save unlimited properties",
      "Priority 24/7 support",
      "Advanced AI search features",
      "Early access to new listings",
      "List up to 3 properties"
    ],
    buttonText: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Agency",
    price: "Custom",
    description: "Tailored solutions for real estate agencies.",
    features: [
      "Unlimited property listings",
      "Dedicated account manager",
      "API access",
      "Custom branding",
      "Advanced analytics dashboard"
    ],
    buttonText: "Contact Sales",
    popular: false,
  }
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Transparent pricing for everyone.
          </h1>
          <p className="text-lg text-slate-600">
            Whether you're just looking around, ready to buy, or managing an entire agency, we have a plan for you.
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
                  Most Popular
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
