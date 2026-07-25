import { getAgentLeads } from "@/actions/agent";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, TrendingUp, Clock, CheckCircle2, Inbox } from "lucide-react";
import { FadeIn } from "@/components/shared/FadeIn";
import { EmptyState } from "@/components/shared/EmptyState";

function getStatusStyle(status: string) {
  switch (status) {
    case "CONTACTED":
      return "bg-blue-50 text-blue-700 border-blue-200";
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
      return "Menunggu";
  }
}

export default async function AgentLeadsPage() {
  let leads: Awaited<ReturnType<typeof getAgentLeads>> = [];
  let error: string | null = null;

  try {
    leads = await getAgentLeads();
  } catch (e) {
    error = e instanceof Error ? e.message : "Gagal memuat data leads.";
  }

  const total = leads.length;
  const pending = leads.filter((l) => l.followUpStatus === "PENDING").length;
  const contacted = leads.filter((l) => l.followUpStatus === "CONTACTED").length;
  const closed = leads.filter((l) => l.followUpStatus === "CLOSED").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <FadeIn delay={0.1}>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Manajemen Leads
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Semua leads yang di-assign ke Anda beserta status tindak lanjutnya.
          </p>
        </div>
      </FadeIn>

      {/* Stats */}
      <FadeIn delay={0.2} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Leads", value: total, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Menunggu", value: pending, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Dihubungi", value: contacted, icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Ditutup", value: closed, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((stat) => (
          <Card key={stat.label} className="p-5 rounded-2xl shadow-sm border-slate-100">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </FadeIn>

      {/* Table */}
      <FadeIn delay={0.3}>
        <Card className="rounded-2xl shadow-sm border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Daftar Leads</h2>
          <span className="text-xs text-slate-400 font-medium">{total} total</span>
        </div>

        {error ? (
          <div className="p-8 text-center text-sm text-red-500">{error}</div>
        ) : leads.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="Belum Ada Leads"
            description="Leads akan muncul di sini setelah di-assign oleh admin kepada Anda."
          />
        ) : (
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="font-semibold text-slate-600">Calon Pembeli</TableHead>
                <TableHead className="font-semibold text-slate-600">Properti</TableHead>
                <TableHead className="font-semibold text-slate-600">Harga</TableHead>
                <TableHead className="font-semibold text-slate-600">Status Properti</TableHead>
                <TableHead className="font-semibold text-slate-600">Follow Up</TableHead>
                <TableHead className="font-semibold text-slate-600">Tanggal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {lead.buyer?.name?.charAt(0) ?? "?"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {lead.buyer?.name ?? "—"}
                        </p>
                        <p className="text-xs text-slate-400">{lead.buyer?.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-slate-700 max-w-[200px] truncate">
                    {lead.property?.title ?? "—"}
                  </TableCell>
                  <TableCell className="text-sm text-slate-700">
                    {lead.property?.price
                      ? `Rp ${Number(lead.property.price).toLocaleString("id-ID")}`
                      : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="text-xs bg-slate-50 text-slate-600 border-slate-200"
                    >
                      {lead.property?.status ?? "—"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getStatusStyle(lead.followUpStatus)}`}
                    >
                      {getStatusLabel(lead.followUpStatus)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-slate-500">
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
      </FadeIn>
    </div>
  );
}
