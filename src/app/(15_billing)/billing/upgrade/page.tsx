import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { UpgradeButton } from "./upgrade-button";

const plans = [
  {
    id: "plan_basic",
    name: "Basic",
    price: "Rp 150.000",
    period: "/month",
    description: "Perfect for individuals starting out.",
    features: [
      "Up to 5 properties",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    id: "plan_pro",
    name: "Pro",
    price: "Rp 450.000",
    period: "/month",
    description: "Ideal for growing agencies and teams.",
    features: [
      "Unlimited properties",
      "Advanced analytics",
      "Priority 24/7 support",
      "Custom branding",
    ],
    isPopular: true,
  },
  {
    id: "plan_enterprise",
    name: "Enterprise",
    price: "Rp 1.500.000",
    period: "/month",
    description: "For large scale businesses needing more.",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "API access",
      "Custom integrations",
    ],
  }
];

export default function UpgradePage() {
  return (
    <div className="container mx-auto py-16 px-4 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Choose Your Plan</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Select the perfect plan to scale your property business. Upgrade anytime as you grow.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`flex flex-col ${plan.isPopular ? 'border-primary shadow-lg scale-105 relative' : ''}`}
          >
            {plan.isPopular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <UpgradeButton planId={plan.id} planName={plan.name} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
