import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getAgentProperties } from "@/actions/agent";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building } from "lucide-react";

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default async function Page() {
  const t = await getTranslations('PartnerAgent');
  const session = await auth();
  if (!session?.user) redirect("/login");

  const properties = await getAgentProperties();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('Properties.title')}</h1>
        <p className="text-muted-foreground">{t('Properties.description')}</p>
      </div>

      {properties.length === 0 ? (
        <div className="bg-white/50 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-8 min-h-[400px] flex flex-col items-center justify-center gap-3">
          <Building className="w-10 h-10 text-slate-300" />
          <p className="text-slate-500">Belum ada properti dalam pipeline Anda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <Card key={property.id} className="rounded-2xl shadow-sm border-slate-100 p-5 space-y-2">
              <h3 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2">
                {property.title}
              </h3>
              <p className="text-xs text-slate-500">{property.address}</p>
              <p className="text-lg font-bold text-primary">{formatPrice(Number(property.price))}</p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Badge variant="outline">{property.propertyType}</Badge>
                <Badge variant="outline">{property.status}</Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
