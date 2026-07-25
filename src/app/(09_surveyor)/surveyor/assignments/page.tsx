import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Calendar, Upload, Clock, CheckCircle2, AlertCircle } from "lucide-react"

export const metadata = {
  title: "Daftar Penugasan Surveyor | HomeLink 2.0",
  description: "Kelola daftar penugasan properti surveyor",
}

const mockAssignments = [
  {
    id: "SRV-2026-001",
    address: "Jl. Sudirman No. 45, Jakarta Pusat",
    deadline: "2026-07-26",
    status: "Pending",
    propertyType: "Apartemen",
  },
  {
    id: "SRV-2026-002",
    address: "Kebayoran Baru, Blok M, Jakarta Selatan",
    deadline: "2026-07-25",
    status: "In Progress",
    propertyType: "Rumah Tapak",
  },
  {
    id: "SRV-2026-003",
    address: "Pantai Indah Kapuk, Bukit Golf Mediterania",
    deadline: "2026-07-24",
    status: "Urgent",
    propertyType: "Ruko",
  },
  {
    id: "SRV-2026-004",
    address: "Kemang Raya No. 12, Jakarta Selatan",
    deadline: "2026-07-28",
    status: "Completed",
    propertyType: "Rumah Mewah",
  }
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Pending":
      return (
        <Badge variant="secondary" className="flex items-center gap-1 w-fit">
          <Clock className="w-3 h-3" /> Pending
        </Badge>
      )
    case "In Progress":
      return (
        <Badge variant="default" className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1 w-fit">
          <Clock className="w-3 h-3" /> In Progress
        </Badge>
      )
    case "Urgent":
      return (
        <Badge variant="destructive" className="flex items-center gap-1 w-fit">
          <AlertCircle className="w-3 h-3" /> Urgent
        </Badge>
      )
    case "Completed":
      return (
        <Badge variant="default" className="bg-green-600 hover:bg-green-700 flex items-center gap-1 w-fit">
          <CheckCircle2 className="w-3 h-3" /> Selesai
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function SurveyorAssignmentsPage() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-7xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Penugasan Survey</h1>
          <p className="text-muted-foreground mt-1">Kelola dan laporkan hasil survey properti harian Anda.</p>
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b">
          <CardTitle>Daftar Tugas Aktif</CardTitle>
          <CardDescription>
            Menampilkan {mockAssignments.length} properti yang menunggu tindakan Anda.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-900">
                  <TableHead className="w-[120px]">ID Tugas</TableHead>
                  <TableHead className="min-w-[300px]">Detail Properti & Alamat</TableHead>
                  <TableHead>Tenggat Waktu</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAssignments.map((assignment) => (
                  <TableRow key={assignment.id} className="group hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                    <TableCell className="font-medium text-slate-600 dark:text-slate-400">
                      {assignment.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-slate-900 dark:text-slate-100">{assignment.propertyType}</span>
                        <span className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                          {assignment.address}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                        <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                        {new Date(assignment.deadline).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(assignment.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        size="sm" 
                        variant={assignment.status === "Completed" ? "secondary" : "default"}
                        className={`shadow-sm transition-all ${assignment.status !== 'Completed' ? 'hover:scale-105 active:scale-95' : ''}`}
                        disabled={assignment.status === "Completed"}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {assignment.status === "Completed" ? "Laporan Terkirim" : "Upload Laporan"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
