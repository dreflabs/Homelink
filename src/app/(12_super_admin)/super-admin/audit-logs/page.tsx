import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getAuditLogs } from "@/actions/super-admin";

function getActionBadgeVariant(action: string) {
  switch (action) {
    case "CREATE":
      return "verified";
    case "UPDATE":
      return "pending";
    case "DELETE":
      return "destructive";
    case "LOGIN":
      return "secondary";
    default:
      return "default";
  }
}

export default async function AuditLogsPage() {
  const auditLogs = await getAuditLogs();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Audit Logs</h2>
          <p className="text-sm text-muted-foreground">
            Lacak seluruh aktivitas dan perubahan di sistem.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-50/50">
            <TableRow>
              <TableHead className="w-[180px]">Waktu</TableHead>
              <TableHead>Aktor</TableHead>
              <TableHead>Aksi</TableHead>
              <TableHead>Modul/Entitas</TableHead>
              <TableHead>Deskripsi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditLogs.map((log) => {
              const date = new Date(log.createdAt);
              const formattedDate = new Intl.DateTimeFormat("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }).format(date);

              return (
                <TableRow key={log.id}>
                  <TableCell className="font-medium text-muted-foreground whitespace-nowrap">
                    {formattedDate}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{log.actor?.name || 'System'}</span>
                      <span className="text-xs text-muted-foreground">
                        {log.actor?.email || '-'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={getActionBadgeVariant(log.action) as any}
                      className="text-[10px]"
                    >
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/10">
                      {log.entityId || "System"}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm truncate max-w-xs">
                    {log.newValues || log.oldValues || log.action}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
