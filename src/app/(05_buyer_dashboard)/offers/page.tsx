import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function OffersPage() {
  const offers = [
    { id: 1, property: "Apartemen Senayan", amount: "Rp 1.2 Milyar", status: "Sedang Dinegosiasi", date: "24 Jul 2026" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Penawaran Saya</h1>
        <p className="text-gray-500 mt-2">Pantau status penawaran yang telah Anda ajukan.</p>
      </div>

      <div className="space-y-4">
        {offers.map((offer) => (
          <Card key={offer.id}>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{offer.property}</h3>
                <p className="text-2xl font-bold text-indigo-600 mt-1">{offer.amount}</p>
                <p className="text-sm text-gray-500 mt-2">Diajukan pada {offer.date}</p>
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
