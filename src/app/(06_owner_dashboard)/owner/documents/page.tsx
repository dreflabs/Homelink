import React from "react";
import { getOwnerDocuments } from "@/actions/dashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload } from "lucide-react";

export default async function OwnerDocumentsPage() {
  let documents: any[] = [];
  try {
    documents = await getOwnerDocuments();
  } catch (err) {
    console.error("Failed to load documents:", err);
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dokumen Legal</h1>
          <p className="text-gray-500 mt-2">Kelola dokumen legal dan pajak untuk verifikasi properti Anda.</p>
        </div>
        <Button className="gap-2"><Upload className="w-4 h-4"/> Unggah Dokumen</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.length > 0 ? (
          documents.map((doc) => (
            <Card key={doc.id}>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="bg-slate-100 p-3 rounded-lg text-slate-600">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm truncate" title={doc.name}>{doc.name}</h3>
                  <p className="text-xs text-gray-500">{doc.type}</p>
                </div>
                {doc.status === "Terverifikasi" ? (
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Terverifikasi</span>
                ) : (
                  <Button size="sm" variant="outline" className="text-xs">Unggah</Button>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-2 text-center py-16 bg-slate-50 rounded-2xl border border-dashed">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-gray-900">Belum ada dokumen legal</h3>
            <p className="text-sm text-gray-500 mt-1">Unggah dokumen kepemilikan seperti SHM/PBB untuk mempercepat verifikasi.</p>
          </div>
        )}
      </div>
    </div>
  );
}
