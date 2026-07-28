import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wallet, Search } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function OffersPage() {
  // TODO: Fetch from actual DB later (e.g. getBuyerOffers())
  const offers: any[] = []; 
  const t = await getTranslations("BuyerDashboard.offersPage");

  if (offers.length === 0) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{t("title")}</h1>
          <p className="text-gray-500 mt-2">{t("subtitle")}</p>
        </div>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 animate-in fade-in zoom-in duration-500">
          <div className="bg-primary/5 p-6 rounded-full mb-6">
            <Wallet className="w-12 h-12 text-primary/40" />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight mb-2">
            {t("empty.title")}
          </h2>
          <p className="text-muted-foreground max-w-md mb-8">
            {t("empty.subtitle")}
          </p>
          <Link href="/search-result">
            <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-all">
              <Search className="w-5 h-5 mr-2" />
              {t("empty.searchProperties")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{t("title")}</h1>
        <p className="text-gray-500 mt-2">{t("subtitle")}</p>
      </div>

      <div className="space-y-4">
        {offers.map((offer) => (
          <Card key={offer.id} className="hover:shadow-md transition-shadow border-0 shadow-sm bg-white/50 backdrop-blur-xl">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{offer.property}</h3>
                <p className="text-2xl font-bold text-indigo-600 mt-1">{offer.amount}</p>
                <p className="text-sm text-gray-500 mt-2">{t("submittedOn")} {offer.date}</p>
              </div>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                {offer.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
