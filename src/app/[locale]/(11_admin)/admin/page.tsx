import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, UserRound, Building, Activity, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-white min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
        <p className="text-slate-500 mt-1">Ringkasan operasional harian platform HomeLink.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Antrean Verifikasi */}
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Antrean Verifikasi</CardTitle>
            <ClipboardCheck className="h-5 w-5 text-blue-700"  />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">42</div>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="destructive" className="bg-red-50 text-red-600 hover:bg-red-100 shadow-none border-none">
                3 melewati SLA
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Total Pengguna Aktif */}
        <Card className="rounded-2xl border-slate-200 shadow-sm group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Pengguna Aktif</CardTitle>
            <UserRound className="h-5 w-5  group-hover: transition-colors"  />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">12,482</div>
            <p className="text-xs text-slate-500 mt-2">+120 pengguna minggu ini</p>
          </CardContent>
        </Card>

        {/* Total Properti Live */}
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Properti Live</CardTitle>
            <Building className="h-5 w-5 "  />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">8,231</div>
            <p className="text-xs text-slate-500 mt-2">+45 properti bulan ini</p>
          </CardContent>
        </Card>

        {/* Total Agents */}
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Agents</CardTitle>
            <Activity className="h-5 w-5 text-slate-400"  />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">342</div>
            <p className="text-xs text-slate-500 mt-2">Partner agent terdaftar</p>
          </CardContent>
        </Card>
      </div>

      {/* Aktivitas Terbaru */}
      <div className="space-y-4 mt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-slate-500" aria-hidden="true"  />
            <h2 className="text-lg font-semibold text-slate-900">Aktivitas Terbaru</h2>
          </div>
          <Button variant="ghost" className="text-blue-700 font-medium hover:bg-blue-50 rounded-xl" asChild>
            <Link href="/admin/reports">Lihat Semua</Link>
          </Button>
        </div>
        
        <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="border-b-slate-200">
                <TableHead className="font-medium text-slate-600">Aktivitas</TableHead>
                <TableHead className="font-medium text-slate-600">Aktor</TableHead>
                <TableHead className="font-medium text-slate-600">Target</TableHead>
                <TableHead className="text-right font-medium text-slate-600">Waktu</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b-slate-100">
                <TableCell className="font-medium text-slate-900">Approve Property</TableCell>
                <TableCell className="text-slate-600">Admin User</TableCell>
                <TableCell className="text-blue-700 font-medium cursor-pointer hover:underline">PRP-10023</TableCell>
                <TableCell className="text-right text-slate-500">2 menit lalu</TableCell>
              </TableRow>
              <TableRow className="border-b-slate-100">
                <TableCell className="font-medium text-slate-900">Reject Property</TableCell>
                <TableCell className="text-slate-600">Admin System</TableCell>
                <TableCell className="text-blue-700 font-medium cursor-pointer hover:underline">PRP-10022</TableCell>
                <TableCell className="text-right text-slate-500">15 menit lalu</TableCell>
              </TableRow>
              <TableRow className="border-b-slate-100">
                <TableCell className="font-medium text-slate-900">Suspend User</TableCell>
                <TableCell className="text-slate-600">Admin User</TableCell>
                <TableCell className="text-blue-700 font-medium cursor-pointer hover:underline">USR-8893</TableCell>
                <TableCell className="text-right text-slate-500">1 jam lalu</TableCell>
              </TableRow>
              <TableRow className="border-b-slate-100">
                <TableCell className="font-medium text-slate-900">Verify Agent</TableCell>
                <TableCell className="text-slate-600">Admin Staff</TableCell>
                <TableCell className="text-blue-700 font-medium cursor-pointer hover:underline">AGT-2341</TableCell>
                <TableCell className="text-right text-slate-500">3 jam lalu</TableCell>
              </TableRow>
              <TableRow className="border-b-slate-100">
                <TableCell className="font-medium text-slate-900">Approve Property</TableCell>
                <TableCell className="text-slate-600">Admin User</TableCell>
                <TableCell className="text-blue-700 font-medium cursor-pointer hover:underline">PRP-10021</TableCell>
                <TableCell className="text-right text-slate-500">5 jam lalu</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
