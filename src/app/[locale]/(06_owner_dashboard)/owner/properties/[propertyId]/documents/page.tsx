import React from "react";
import { getOwnerDocuments } from "@/actions/dashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCheck, Upload } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function OwnerDocumentsPage() {
  let documents: any[] = [];
  try {
    documents = await getOwnerDocuments();
  } catch (err) {
    console.error("Failed to load documents:", err);
  }

  const t = await getTranslations("OwnerDashboard.documents");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{t("title")}</h1>
          <p className="text-gray-500 mt-2">{t("desc")}</p>
        </div>
        <Button className="gap-2"><Upload className="w-4 h-4"/> {t("upload_doc")}</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.length > 0 ? (
          documents.map((doc) => (
            <Card key={doc.id}>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="bg-slate-100 p-3 rounded-lg text-slate-600">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm truncate" title={doc.name}>{doc.name}</h3>
                  <p className="text-xs text-gray-500">{doc.type}</p>
                </div>
                {doc.status === "Terverifikasi" ? (
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">{t("verified")}</span>
                ) : (
                  <Button size="sm" variant="outline" className="text-xs">{t("upload")}</Button>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-2 text-center py-16 bg-slate-50 rounded-2xl border border-dashed">
            <FileCheck className="w-12 h-12  mx-auto mb-3" />
            <h3 className="text-base font-semibold text-gray-900">{t("no_docs")}</h3>
            <p className="text-sm text-gray-500 mt-1">{t("no_docs_desc")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
