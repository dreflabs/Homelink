import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  FileImage,
  FileCheck,
  Download,
  Eye,
  Shield,
  Home,
  CreditCard,
} from "lucide-react";

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  status: "VERIFIED" | "PENDING" | "EXPIRED";
  icon: React.ComponentType<{ className?: string }>;
  category: string;
}

const documents: Document[] = [
  {
    id: 1,
    name: "Perjanjian Kerjasama Agen.pdf",
    type: "PDF",
    size: "1.2 MB",
    uploadedAt: "10 Jan 2026",
    status: "VERIFIED",
    icon: FileText,
    category: "Kontrak",
  },
  {
    id: 2,
    name: "Sertifikat Partner Pro 2026.pdf",
    type: "PDF",
    size: "892 KB",
    uploadedAt: "01 Feb 2026",
    status: "VERIFIED",
    icon: FileCheck,
    category: "Sertifikat",
  },
  {
    id: 3,
    name: "KTP Agen – Alex Property.jpg",
    type: "JPG",
    size: "540 KB",
    uploadedAt: "10 Jan 2026",
    status: "VERIFIED",
    icon: FileImage,
    category: "Identitas",
  },
  {
    id: 4,
    name: "NPWP Agen.pdf",
    type: "PDF",
    size: "330 KB",
    uploadedAt: "10 Jan 2026",
    status: "VERIFIED",
    icon: CreditCard,
    category: "Pajak",
  },
  {
    id: 5,
    name: "SHM – Grand Kemang Residence.pdf",
    type: "PDF",
    size: "3.4 MB",
    uploadedAt: "22 Mar 2026",
    status: "PENDING",
    icon: Home,
    category: "Properti",
  },
  {
    id: 6,
    name: "Bukti Komisi Q1 2025.pdf",
    type: "PDF",
    size: "218 KB",
    uploadedAt: "05 Apr 2025",
    status: "EXPIRED",
    icon: Shield,
    category: "Keuangan",
  },
];

function statusConfig(status: Document["status"]) {
  switch (status) {
    case "VERIFIED":
      return { label: "Terverifikasi", className: "bg-emerald-50 text-emerald-700 border-emerald-200" };
    case "PENDING":
      return { label: "Menunggu Review", className: "bg-amber-50 text-amber-700 border-amber-200" };
    case "EXPIRED":
      return { label: "Kadaluarsa", className: "bg-red-50 text-red-600 border-red-200" };
  }
}

const iconBgMap: Record<string, string> = {
  Kontrak: "bg-blue-50 text-blue-600",
  Sertifikat: "bg-emerald-50 text-emerald-600",
  Identitas: "bg-violet-50 text-violet-600",
  Pajak: "bg-amber-50 text-amber-600",
  Properti: "bg-orange-50 text-orange-600",
  Keuangan: "bg-slate-100 text-slate-600",
};

export default function AgentDocumentsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dokumen Saya</h1>
          <p className="text-slate-500 mt-1 text-sm">
            Kelola semua dokumen legal, kontrak, dan referensi Anda.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm gap-2">
          + Unggah Dokumen
        </Button>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: "Terverifikasi", count: documents.filter((d) => d.status === "VERIFIED").length, color: "bg-emerald-100 text-emerald-700" },
          { label: "Menunggu", count: documents.filter((d) => d.status === "PENDING").length, color: "bg-amber-100 text-amber-700" },
          { label: "Kadaluarsa", count: documents.filter((d) => d.status === "EXPIRED").length, color: "bg-red-100 text-red-700" },
        ].map((item) => (
          <span key={item.label} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${item.color}`}>
            {item.count} {item.label}
          </span>
        ))}
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => {
          const sc = statusConfig(doc.status);
          const DocIcon = doc.icon;
          const iconStyle = iconBgMap[doc.category] ?? "bg-slate-100 text-slate-500";

          return (
            <Card
              key={doc.id}
              className="rounded-2xl shadow-sm border-slate-100 p-5 hover:shadow-md transition-shadow flex flex-col gap-4"
            >
              <div className="flex items-start gap-3">
                <div className={`p-3 rounded-xl ${iconStyle} shrink-0`}>
                  <DocIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 leading-snug truncate">
                    {doc.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {doc.type} · {doc.size} · {doc.uploadedAt}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <Badge variant="outline" className={`text-xs ${sc.className}`}>
                  {sc.label}
                </Badge>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
