import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCheck, FileImage, Download, Eye, File } from "lucide-react";

import { getTranslations } from "next-intl/server";
import { getAgentDocuments } from "@/actions/agent";

function iconFor(fileUrl: string) {
  const ext = fileUrl.split(".").pop()?.toLowerCase();
  if (ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "webp") return FileImage;
  if (ext === "pdf") return FileCheck;
  return File;
}

export default async function AgentDocumentsPage() {
  const t = await getTranslations('PartnerAgent');
  const documents = await getAgentDocuments();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{t('Documents.title')}</h1>
          <p className="text-slate-500 mt-1 text-sm">{t('Documents.description')}</p>
        </div>
        <Button className="bg-primary hover:bg-primary text-white rounded-xl text-sm gap-2">
          {t('Documents.uploadBtn')}
        </Button>
      </div>

      {documents.length === 0 ? (
        <div className="bg-white/50 border border-slate-200/60 rounded-2xl p-8 min-h-96 flex items-center justify-center">
          <p className="text-slate-500">Belum ada dokumen yang diunggah.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => {
            const DocIcon = iconFor(doc.fileUrl);

            return (
              <Card key={doc.id} className="rounded-2xl shadow-sm border-slate-100 p-5 hover:shadow-md transition-shadow flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-3 rounded-xl bg-slate-100 text-slate-600 shrink-0">
                    <DocIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 leading-snug truncate">{doc.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {doc.documentType} · {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(doc.createdAt))}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-1 pt-2 border-t border-slate-100">
                  <Button asChild variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg">
                    <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                      <Eye className="w-3.5 h-3.5" />
                    </a>
                  </Button>
                  <Button asChild variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg">
                    <a href={doc.fileUrl} download>
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
