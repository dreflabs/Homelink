import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCheck, ExternalLink } from "lucide-react";
import { getBuyerDocuments } from "@/actions/documents";
import { DocumentUploadDialog } from "@/components/dashboard/document-upload";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function DocumentsPage() {
  const documents = await getBuyerDocuments();
  const t = await getTranslations("BuyerDashboard.documents");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{t("title")}</h1>
          <p className="text-gray-500 mt-2">{t("subtitle")}</p>
        </div>
        <DocumentUploadDialog />
      </div>

      {documents.length === 0 ? (
        <div className="text-center p-12 border-2 border-dashed border-gray-200 rounded-xl">
          <p className="text-gray-500">{t("empty")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc) => (
            <Card key={doc.id}>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="bg-slate-50 p-3 rounded-lg text-primary">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{doc.title}</h3>
                  <p className="text-sm text-gray-500">{doc.documentType}</p>
                </div>
                <Button size="sm" variant="outline" className="gap-2" asChild>
                  <Link href={doc.fileUrl} target="_blank">
                    <ExternalLink className="w-4 h-4" /> {t("view")}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
