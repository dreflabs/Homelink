import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, UserRound, Building, Activity, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function AdminDashboardPage() {
  const t = await getTranslations("AdminDashboard.page");

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-white min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{t("title")}</h1>
        <p className="text-slate-500 mt-1">{t("description")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Antrean Verifikasi */}
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">{t("verification_queue")}</CardTitle>
            <ClipboardCheck className="h-5 w-5 text-primary"  />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">42</div>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="destructive" className="bg-red-50 text-red-600 hover:bg-red-100 shadow-none border-none">
                3 {t("passed_sla")}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Total Pengguna Aktif */}
        <Card className="rounded-2xl border-slate-200 shadow-sm group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">{t("total_active_users")}</CardTitle>
            <UserRound className="h-5 w-5 group-hover:text-primary transition-colors"  />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">12,482</div>
            <p className="text-xs text-slate-500 mt-2">+120 {t("users_this_week")}</p>
          </CardContent>
        </Card>

        {/* Total Properti Live */}
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">{t("total_live_properties")}</CardTitle>
            <Building className="h-5 w-5 "  />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">8,231</div>
            <p className="text-xs text-slate-500 mt-2">+45 {t("properties_this_month")}</p>
          </CardContent>
        </Card>

        {/* Total Agents */}
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">{t("total_agents")}</CardTitle>
            <Activity className="h-5 w-5 text-slate-400"  />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">342</div>
            <p className="text-xs text-slate-500 mt-2">{t("registered_partner_agents")}</p>
          </CardContent>
        </Card>
      </div>

      {/* Aktivitas Terbaru */}
      <div className="space-y-4 mt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-slate-500" aria-hidden="true"  />
            <h2 className="text-lg font-semibold text-slate-900">{t("recent_activity")}</h2>
          </div>
          <Button variant="ghost" className="text-primary font-medium hover:bg-slate-50 rounded-xl" asChild>
            <Link href="/admin/reports">{t("view_all")}</Link>
          </Button>
        </div>
        
        <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="border-b-slate-200">
                <TableHead className="font-medium text-slate-600">{t("table.activity")}</TableHead>
                <TableHead className="font-medium text-slate-600">{t("table.actor")}</TableHead>
                <TableHead className="font-medium text-slate-600">{t("table.target")}</TableHead>
                <TableHead className="text-right font-medium text-slate-600">{t("table.time")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b-slate-100">
                <TableCell className="font-medium text-slate-900">{t("dummy_data.approve_property")}</TableCell>
                <TableCell className="text-slate-600">{t("dummy_data.admin_user")}</TableCell>
                <TableCell className="text-primary font-medium cursor-pointer hover:underline">PRP-10023</TableCell>
                <TableCell className="text-right text-slate-500">2 {t("dummy_data.mins_ago")}</TableCell>
              </TableRow>
              <TableRow className="border-b-slate-100">
                <TableCell className="font-medium text-slate-900">{t("dummy_data.reject_property")}</TableCell>
                <TableCell className="text-slate-600">{t("dummy_data.admin_system")}</TableCell>
                <TableCell className="text-primary font-medium cursor-pointer hover:underline">PRP-10022</TableCell>
                <TableCell className="text-right text-slate-500">15 {t("dummy_data.mins_ago")}</TableCell>
              </TableRow>
              <TableRow className="border-b-slate-100">
                <TableCell className="font-medium text-slate-900">{t("dummy_data.suspend_user")}</TableCell>
                <TableCell className="text-slate-600">{t("dummy_data.admin_user")}</TableCell>
                <TableCell className="text-primary font-medium cursor-pointer hover:underline">USR-8893</TableCell>
                <TableCell className="text-right text-slate-500">1 {t("dummy_data.hours_ago")}</TableCell>
              </TableRow>
              <TableRow className="border-b-slate-100">
                <TableCell className="font-medium text-slate-900">{t("dummy_data.verify_agent")}</TableCell>
                <TableCell className="text-slate-600">{t("dummy_data.admin_staff")}</TableCell>
                <TableCell className="text-primary font-medium cursor-pointer hover:underline">AGT-2341</TableCell>
                <TableCell className="text-right text-slate-500">3 {t("dummy_data.hours_ago")}</TableCell>
              </TableRow>
              <TableRow className="border-b-slate-100">
                <TableCell className="font-medium text-slate-900">{t("dummy_data.approve_property")}</TableCell>
                <TableCell className="text-slate-600">{t("dummy_data.admin_user")}</TableCell>
                <TableCell className="text-primary font-medium cursor-pointer hover:underline">PRP-10021</TableCell>
                <TableCell className="text-right text-slate-500">5 {t("dummy_data.hours_ago")}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
