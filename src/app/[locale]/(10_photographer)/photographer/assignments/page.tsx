import { getTranslations } from 'next-intl/server';
import React from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Calendar, Upload, Camera } from "lucide-react";
import { getPhotographerTasks } from "@/actions/photographer";

export default async function PhotographerAssignmentsPage() {
  const tTable = await getTranslations('Common.table');

  const assignments = await getPhotographerTasks();

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Penugasan Fotografi</h1>
          <p className="text-slate-500 mt-1">Daftar lokasi properti yang perlu didokumentasikan.</p>
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Camera className="w-5 h-5 mr-2 text-primary" />
            Jadwal Pemotretan
          </CardTitle>
          <CardDescription>
            Terdapat {assignments.length} penugasan yang menunggu untuk diselesaikan.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead className="font-semibold text-slate-700">Alamat Properti</TableHead>
                  <TableHead className="font-semibold text-slate-700">Jadwal</TableHead>
                  <TableHead className="font-semibold text-slate-700">{tTable('status')}</TableHead>
                  <TableHead className="text-right font-semibold text-slate-700">{tTable('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                      Tidak ada penugasan saat ini.
                    </TableCell>
                  </TableRow>
                ) : (
                  assignments.map((assignment) => (
                    <TableRow key={assignment.id} className="group hover:bg-slate-50/80 transition-colors">
                      <TableCell>
                        <div className="flex items-center text-slate-900 font-medium">
                          <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
                          {assignment.property.address}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-slate-600">
                          <Calendar className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0" />
                          {assignment.scheduledAt
                            ? new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(assignment.scheduledAt))
                            : "-"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-slate-700 font-medium">{assignment.status}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          asChild
                          className="bg-primary hover:bg-primary text-white shadow-sm transition-all duration-200 group-hover:shadow-md"
                          size="sm"
                        >
                          <Link href="/photographer/upload-media">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Media
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
