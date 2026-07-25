import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type AuditAction = "CREATE" | "UPDATE" | "DELETE" | "LOGIN";

interface AuditLog {
  id: string;
  timestamp: string;
  actor: {
    name: string;
    email: string;
    role: string;
  };
  action: AuditAction;
  module: string;
  description: string;
}

const mockAuditLogs: AuditLog[] = [
  {
    id: "log-1",
    timestamp: "2026-07-24T10:23:45Z",
    actor: {
      name: "Budi Santoso",
      email: "budi.s@homelink.id",
      role: "Super Admin",
    },
    action: "CREATE",
    module: "Properties",
    description: "Created new property listing: 'Villa Indah Bali'",
  },
  {
    id: "log-2",
    timestamp: "2026-07-24T09:12:30Z",
    actor: {
      name: "Siti Rahmawati",
      email: "siti.r@homelink.id",
      role: "Admin",
    },
    action: "UPDATE",
    module: "User Management",
    description: "Updated user roles for ID: USR-4509",
  },
  {
    id: "log-3",
    timestamp: "2026-07-23T16:45:11Z",
    actor: {
      name: "System",
      email: "system@homelink.id",
      role: "System",
    },
    action: "DELETE",
    module: "Verification",
    description: "Deleted expired verification document DOC-1029",
  },
  {
    id: "log-4",
    timestamp: "2026-07-23T14:30:00Z",
    actor: {
      name: "Budi Santoso",
      email: "budi.s@homelink.id",
      role: "Super Admin",
    },
    action: "LOGIN",
    module: "Auth",
    description: "Successful login from IP 114.120.34.5",
  },
  {
    id: "log-5",
    timestamp: "2026-07-22T11:05:22Z",
    actor: {
      name: "Andi Wijaya",
      email: "andi.w@homelink.id",
      role: "Admin",
    },
    action: "UPDATE",
    module: "Settings",
    description: "Changed global platform fee to 2.5%",
  },
];

function getActionBadgeVariant(action: AuditAction) {
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

export default function AuditLogsPage() {
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
            {mockAuditLogs.map((log) => {
              const date = new Date(log.timestamp);
              // Fallback to basic string manipulation if date-fns format fails in this environment
              // Using native Intl.DateTimeFormat for safety if date-fns is not fully imported, but format is standard
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
                      <span className="font-medium">{log.actor.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {log.actor.email}
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
                      {log.module}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm truncate max-w-xs">
                    {log.description}
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
