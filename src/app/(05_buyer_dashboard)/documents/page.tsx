import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Upload } from "lucide-react";

export default function DocumentsPage() {
  const documents = [
    { id: 1, name: "KTP", status: "Terverifikasi", type: "Identitas" },
    { id: 2, name: "Slip Gaji (Bulan Terakhir)", status: "Perlu Diunggah", type: "Keuangan" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dokumen</h1>
          <p className="text-gray-500 mt-2">Kelola dokumen persyaratan untuk pengajuan KPR / sewa.</p>
        </div>
        <Button className="gap-2"><Upload className="w-4 h-4"/> Unggah Dokumen Baru</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <Card key={doc.id}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{doc.name}</h3>
                <p className="text-sm text-gray-500">{doc.type}</p>
              </div>
              {doc.status === "Terverifikasi" ? (
                <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Terverifikasi</span>
              ) : (
                <Button size="sm" variant="outline" className="gap-2">Unggah</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
