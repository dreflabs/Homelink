import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { getTranslations } from "next-intl/server";
import { getAgentClients } from "@/actions/agent";

export default async function AgentClientsPage() {
  const t = await getTranslations('PartnerAgent');
  const leads = await getAgentClients();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{t('Clients.title')}</h1>
        <p className="text-slate-500 mt-1">{t('Clients.subtitle')}</p>
      </div>

      <Card className="rounded-2xl shadow-sm border-slate-100 overflow-hidden">
        {leads.length === 0 ? (
          <div className="p-12 text-center text-slate-500">Belum ada prospek/lead untuk ditampilkan.</div>
        ) : (
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="font-semibold">{t('Clients.targetProperty')}</TableHead>
                <TableHead className="font-semibold">{t('Clients.leadStatus')}</TableHead>
                <TableHead className="font-semibold">{t('Clients.lastContact')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="font-medium text-slate-900">{lead.property}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      lead.status === "CLOSED"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : lead.status === "CONTACTED"
                        ? "bg-slate-50 text-primary border-slate-200"
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    }>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(lead.lastContact))}
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
