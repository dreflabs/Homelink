import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, CreditCard } from "lucide-react";

export default function SubscriptionPage() {
  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Subscription</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Manage your subscription plan and billing cycle.
        </p>
      </div>

      <Card className="border-2 shadow-sm rounded-xl">
        <CardHeader className="pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-3">
                Pro Tier
                <Badge variant="verified" className="uppercase text-[10px] tracking-wider px-2 py-0.5">
                  Active
                </Badge>
              </CardTitle>
              <CardDescription className="text-base">
                You are currently on the Pro Tier plan.
              </CardDescription>
            </div>
            <div className="hidden sm:flex bg-primary/10 p-4 rounded-full">
              <CreditCard className="w-8 h-8 text-primary" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                Plan Features
              </h3>
              <ul className="space-y-3">
                {[
                  "Unlimited property listings",
                  "Priority support 24/7",
                  "Advanced analytics dashboard",
                  "Custom branding options",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 flex flex-col justify-center border border-slate-100 dark:border-slate-800">
              <h3 className="font-medium text-sm text-muted-foreground mb-3 uppercase tracking-wider">Billing Cycle</h3>
              <div className="text-4xl font-bold mb-2 text-slate-900 dark:text-white">
                $49.00 <span className="text-lg font-normal text-muted-foreground">/ month</span>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Berikutnya: <span className="text-primary font-semibold">15 Agustus 2026</span>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 pt-6 border-t bg-slate-50/50 dark:bg-slate-900/20 rounded-b-xl">
          <Button className="w-full sm:w-auto font-semibold">Upgrade Plan</Button>
          <Button variant="outline" className="w-full sm:w-auto font-semibold text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20 hover:border-destructive/30">
            Cancel Subscription
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
