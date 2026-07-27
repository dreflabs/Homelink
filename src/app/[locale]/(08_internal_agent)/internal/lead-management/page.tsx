import { getTranslations } from "next-intl/server";
import { getAgentLeads } from "@/actions/agent";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserRound, ChartCandlestick, Clock, ShieldCheck, Filter } from "lucide-react";

function getStatusStyle(status: string) {
  switch (status) {
    case "CONTACTED":
      return "bg-slate-50 text-primary border-slate-200";
    case "CLOSED":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    default:
      return "bg-amber-50 text-amber-700 border-amber-200";
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case "CONTACTED":
      return "Dihubungi";
    case "CLOSED":
      return "Ditutup";
    default:
      return "Baru";
  }
}

export default async function InternalLeadManagementPage() {
  const t = await getTranslations("InternalAgent");

  let leads: Awaited<ReturnType<typeof getAgentLeads>> = [];
  let error: string | null = null;

  try {
    leads = await getAgentLeads();
  } catch (e) {
    error = e instanceof Error ? e.message : t("gagal_memuat_leads");
  }

  const total = leads.length;
  const pending = leads.filter((l) => l.followUpStatus === "PENDING").length;
  const contacted = leads.filter((l) => l.followUpStatus === "CONTACTED").length;
  const closed = leads.filter((l) => l.followUpStatus === "CLOSED").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t("manajemen_leads")}</h1>
          <p className="text-gray-500 mt-1 text-sm">
            {t("semua_leads_yang_masuk")}
          </p>
        </div>
        <Button variant="outline" className="rounded-xl border-gray-200 text-gray-600 gap-2 text-sm">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t("total_leads"), value: total, icon: UserRound, color: "text-primary", bg: "bg-slate-50" },
          { label: t("menunggu"), value: pending, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: t("dihubungi"), value: contacted, icon: ChartCandlestick, color: "text-primary", bg: "bg-slate-50" },
          { label: t("ditutup"), value: closed, icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((stat) => (
          <Card key={stat.label} className="p-5 rounded-xl shadow-sm border-gray-200/60">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {["Semua", "PENDING", "CONTACTED", "CLOSED"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              tab === "Semua"
                ? "bg-slate-800 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab === "PENDING" ? t("menunggu") : tab === "CONTACTED" ? t("dihubungi") : tab === "CLOSED" ? t("ditutup") : tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <Card className="rounded-xl shadow-sm border-gray-200/60 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">{t("daftar_leads")}</h2>
          <span className="text-xs text-gray-400 font-medium">{total} {t("total")}</span>
        </div>

        {error ? (
          <div className="p-8 text-center text-sm text-red-500">{error}</div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center">
            <UserRound className="w-10 h-10  mx-auto mb-3" />
            <p className="text-gray-500 font-medium">{t("belum_ada_leads")}</p>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-gray-50/60">
              <TableRow>
                <TableHead className="font-semibold text-gray-600">{t("calon_pembeli")}</TableHead>
                <TableHead className="font-semibold text-gray-600">{t("properti")}</TableHead>
                <TableHead className="font-semibold text-gray-600">{t("harga")}</TableHead>
                <TableHead className="font-semibold text-gray-600">{t("status_properti")}</TableHead>
                <TableHead className="font-semibold text-gray-600">{t("follow_up")}</TableHead>
                <TableHead className="font-semibold text-gray-600">{t("tanggal")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {lead.buyer?.name?.charAt(0) ?? "?"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{lead.buyer?.name ?? "—"}</p>
                        <p className="text-xs text-gray-400">{lead.buyer?.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-700 max-w-[200px] truncate">
                    {lead.property?.title ?? "—"}
                  </TableCell>
                  <TableCell className="text-sm text-gray-700">
                    {lead.property?.price
                      ? `Rp ${Number(lead.property.price).toLocaleString("id-ID")}`
                      : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200">
                      {lead.property?.status ?? "—"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-xs ${getStatusStyle(lead.followUpStatus)}`}>
                      {getStatusLabel(lead.followUpStatus)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {new Date(lead.createdAt).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
